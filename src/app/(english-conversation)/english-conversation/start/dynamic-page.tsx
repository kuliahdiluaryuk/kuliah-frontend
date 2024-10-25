"use client";

import Cookies from "js-cookie";
import { ArrowLeft, Square, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import RecordRTC, { RecordRTCPromisesHandler } from "recordrtc";
import AudioRecorderPolyfill from "audio-recorder-polyfill";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

if (typeof window !== "undefined" && !window.MediaRecorder) {
  window.MediaRecorder = AudioRecorderPolyfill;
}

import AudioVisualizer from "@/components/audio-visualizer";
import CircleTimer from "@/components/circle-timer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { DEFAULT_CONVO_DURATION, DEFAULT_DAILY_CONVO_LIMIT } from "@/constants";
import useInstruction from "@/hooks/use-instruction";
import { useLimitModal } from "@/hooks/use-limit-modal";
import useMessage from "@/hooks/use-message";
import useSession from "@/hooks/use-session";
import { storeConversation } from "@/lib/utils";
import { Message } from "@/types";

function DynamicStartConversationPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [conversationActive, setConversationActive] = useState<boolean>(false);
  const [sayHi, setSayHi] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [startTimer, setStartTimer] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [shouldPlayResponse, setShouldPlayResponse] = useState<boolean>(false);

  // const chunks = useRef<Blob[]>([]);
  const mediaRecorder = useRef<RecordRTCPromisesHandler | null>(null);
  const isFetching = useRef(false);
  const ffmpegRef = useRef(new FFmpeg());

  const { instruction } = useInstruction();
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useSession();
  const { setMessages: setGlobalMessages } = useMessage();
  const limitModal = useLimitModal();

  useEffect(() => {
    // load();
    // Check conversation limit
    const dailyConversation = Cookies.get("dailyConversation");
    if (dailyConversation) {
      if (user?.plan) {
        if (parseInt(dailyConversation) >= user.plan.daily_convo) {
          limitModal.onOpen();
          return router.push("/english-conversation");
        }
      } else {
        if (parseInt(dailyConversation) >= DEFAULT_DAILY_CONVO_LIMIT) {
          limitModal.onOpen();
          return router.push("/english-conversation");
        }
      }
    }
  }, []);

  useEffect(() => {
    if (!instruction) {
      router.push("/english-conversation");
    } else {
      startConversation();
    }
  }, [instruction, router]);

  useEffect(() => {
    if (shouldPlayResponse) {
      playResponseAudio();
      setShouldPlayResponse(false);
    }
  }, [messages, shouldPlayResponse]);

  useEffect(() => {
    if (conversationActive && isRecording) {
      const timerInterval = setInterval(() => {
        sendVoice();
      }, 20000);

      return () => clearInterval(timerInterval);
    }
  }, [conversationActive, isRecording]);

  // const load = async () => {
  //   const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
  //   const ffmpeg = ffmpegRef.current;
  //   try {
  //     const [coreURL, wasmURL] = await Promise.all([
  //       toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
  //       toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
  //     ]);

  //     await ffmpeg.load({ coreURL, wasmURL });
  //   } catch (error) {}
  // };

  async function startConversation() {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_AI_CONVERSATION_API}/start_conversation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ instruction: instruction }),
        }
      );
      const data = await response.json();
      const updatedMessages = data.updated_messages;
      setMessages(updatedMessages);
      setStartTimer(true);
      setIsLoading(false);
      listenForSpeech(); // Start recording after fetching initial conversation data
    } catch (error) {
      alert("Error initiating conversation");
    }

    setSayHi(true);
    setConversationActive(true);
  }

  async function listenForSpeech() {
    // Periksa apakah mediaDevices dan getUserMedia tersedia
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert(
        "Browser Anda tidak mendukung fitur mikrofon. Silakan coba dengan browser yang lebih baru."
      );
      return;
    }

    try {
      // Meminta akses ke mikrofon harus mengguankan https di perangkat ios
      const devices = await navigator.mediaDevices.enumerateDevices();

      // Pilih device yang sesuai, sebagai contoh menggunakan device yang pertama / default
      const currentDevice = devices[0].deviceId;
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          deviceId: currentDevice,
          noiseSuppression: true,
        },
      });
      mediaRecorder.current = new RecordRTCPromisesHandler(stream, {
        type: "audio",
        recorderType: RecordRTC.StereoAudioRecorder,
        numberOfAudioChannels: 2,
      });
      mediaRecorder.current.startRecording();

      // mediaRecorder.current.start(200); // Collect data in 200 milesecond chunks
      setIsRecording(true);
      setIsLoading(false);
      setIsListening(false);
    } catch (error: unknown) {}
  }

  async function sendVoice() {
    if (isFetching.current || !mediaRecorder.current || !isRecording) {
      return;
    }
    // mediaRecorder.current.stop();
    setIsRecording(false);
    setIsLoading(true);
    setSayHi(false);

    await mediaRecorder.current.stopRecording();
    let audioBlob = await mediaRecorder.current.getBlob();

    const reader = new FileReader();
    reader.readAsDataURL(audioBlob);
    reader.onloadend = async () => {
      const result = reader.result;

      if (typeof result === "string") {
        const base64AudioMessage = result.split(",")[1];

        if (!base64AudioMessage) {
          alert("Error: Base64 audio message is empty");
          return;
        }

        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_AI_CONVERSATION_API}/process_text`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                audio_file: base64AudioMessage,
                messages: messages,
                instruction: instruction,
              }),
            }
          );
          const data = await response.json();
          const updatedMessages = data.updated_messages;
          setMessages(updatedMessages);
          if (conversationActive) {
            setShouldPlayResponse(true);
          }
        } catch (error) {
          alert("Error sending voice");
        } finally {
          isFetching.current = false;
        }
      } else {
        alert("Error: Reader result is not a string");
      }
    };

    reader.onerror = (error) => {
      alert("Error reading audio file");
      isFetching.current = false;
    };
  }

  async function playResponseAudio() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_AI_CONVERSATION_API}/process_audio`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages,
            instruction: instruction,
          }),
        }
      );

      const data = await response.json();
      const audioBase64 = data.audio_file;
      const audioBlob = base64ToBlob(audioBase64, "audio/webm");
      let audioUrl = URL.createObjectURL(audioBlob);

      if (audioBase64) {
        const ffmpeg = ffmpegRef.current;
        await ffmpeg.load();
        await ffmpeg.writeFile("input.webm", await fetchFile(audioBlob));
        await ffmpeg.exec(["-i", "input.webm", "output.wav"]);
        const audioBuffer = (await ffmpeg.readFile("output.wav")) as any;
        audioUrl = URL.createObjectURL(
          new Blob([audioBuffer.buffer], { type: "audio/wav" })
        );
      }

      const responseAudio = document.getElementById(
        "responseAudio"
      ) as HTMLAudioElement;
      responseAudio.src = audioUrl;
      setIsLoading(false);
      responseAudio.play();
      setIsListening(true);
      responseAudio.addEventListener("ended", () => {
        setIsListening(false);
        if (conversationActive) {
          listenForSpeech();
        }
      });
    } catch (error) {
      // alert("Error processing audio response");
    }
  }

  function base64ToBlob(base64: string, mime: string): Blob {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mime });
  }

  async function finishConversation() {
    setConversationActive(false);
    setIsFinished(true);
    setStartTimer(false);
    toast({
      variant: "yellow",
      title: "Time is up!",
      description: "Please wait for the result.",
    });

    if (!conversationActive) {
      return;
    }

    if (mediaRecorder && isRecording) {
      await mediaRecorder.current?.stopRecording();
      // mediaRecorder.current?.stop();
      // mediaRecorder.current?.stream
      //   .getTracks()
      //   .forEach((track) => track.stop());
      setIsRecording(false);
      setIsLoading(true);
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_AI_CONVERSATION_API}/finish_conversation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ messages, instruction: instruction }),
        }
      );
      const data = await response.json();
      const updatedMessages: Message[] = data.updated_messages;

      // Get cookie
      const dailyConversation = Cookies.get("dailyConversation");

      // Get the current date and set the time to 23:59:59 of the same day
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);

      // Set cookie
      Cookies.set(
        "dailyConversation",
        dailyConversation
          ? JSON.stringify(parseInt(dailyConversation) + 1)
          : JSON.stringify(1),
        { expires: endOfDay }
      );

      if (user) {
        const conversation = await storeConversation({
          messages: updatedMessages,
          level: instruction!.level,
          topic: instruction!.topic,
          duration: user.plan
            ? user.plan.convo_duration * 60
            : DEFAULT_CONVO_DURATION,
          voice: instruction!.assistant,
        });
        router.push(`/english-conversation/c/${conversation.id}/result`);
      } else {
        setGlobalMessages(updatedMessages);
        router.push("/english-conversation/result");
      }
    } catch (error) {
      alert("Error finishing conversation");
    }
  }

  return (
    <main className="bg-[#F5F5F5] px-6 py-[28px] min-h-[90vh] flex flex-col items-center justify-around md:justify-between">
      <div className="flex items-center justify-center md:justify-between w-full">
        <Button
          onClick={() => router.back()}
          size="icon"
          variant="outline"
          className="rounded-full hidden lg:flex w-[42px] h-[42px]"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <CircleTimer
          isStarted={startTimer}
          duration={
            user?.plan ? user.plan.convo_duration * 60 : DEFAULT_CONVO_DURATION
          }
          onFinish={() => finishConversation()}
        />
        <Button
          disabled={isFinished}
          onClick={() => finishConversation()}
          size="icon"
          variant="destructive"
          className="rounded-full hidden lg:flex w-[42px] h-[42px]"
        >
          <Square className="w-5 h-5" fill="#fff" />
        </Button>
      </div>
      {sayHi ? (
        <p className="text-xl font-medium text-center">
          “Say <em>“Hi!”</em> and hit send to start!”
        </p>
      ) : isFinished ? (
        <p className="text-xl font-medium text-center">
          Time is up! please wait for the result...
        </p>
      ) : null}
      <div className="flex items-center justify-between lg:justify-center w-full">
        <Button
          onClick={() => router.back()}
          size="icon"
          variant="outline"
          className="rounded-full flex lg:hidden"
        >
          <X className="w-4 h-4" />
        </Button>
        <AudioVisualizer
          isLoading={isLoading}
          isListening={isListening}
          onSend={() => sendVoice()}
        />
        <Button
          disabled={isFinished}
          onClick={() => finishConversation()}
          size="icon"
          variant="destructive"
          className="rounded-full flex lg:hidden"
        >
          <Square className="w-4 h-4" fill="#fff" />
        </Button>
      </div>
      <audio id="responseAudio" className="hidden" controls />
    </main>
  );
}

export default DynamicStartConversationPage;
