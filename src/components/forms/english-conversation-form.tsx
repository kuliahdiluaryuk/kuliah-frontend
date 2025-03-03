"use client";

import Cookies from "js-cookie";
import { Mic, Square } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  LiveKitRoom,
  useVoiceAssistant,
  BarVisualizer,
  RoomAudioRenderer,
  AgentState,
  DisconnectButton,
} from "@livekit/components-react";
import { useKrispNoiseFilter } from "@livekit/components-react/krisp";
import { Button } from "@/components/ui/button";
import { DEFAULT_CONVO_DURATION, DEFAULT_DAILY_CONVO_LIMIT } from "@/constants";
import { useLimitModal } from "@/hooks/use-limit-modal";
import useSession from "@/hooks/use-session";
import { ConnectionDetails } from "@/app/api/connection-details/route";
import { AnimatePresence, motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CircleTimer from "../circle-timer";
import Image from "next/image";
import { jakartaTime, storeConversation } from "@/lib/utils";
import useMessage from "@/hooks/use-message";
import useInstruction from "@/hooks/use-instruction";
import Spinner from "../ui/spinner";
import { NoAgentNotification } from "../NoAgentNotification";
import {
  ChatMessageType,
  TranscriptionTile,
} from "@/transcriptions/TranscriptionTile";

export function EnglishConversationForm() {
  const limitModal = useLimitModal();
  const { user } = useSession();
  const router = useRouter();
  const { instruction } = useInstruction();
  const { addInstrunction } = useInstruction();

  // LiveKit states
  const [connectionDetails, updateConnectionDetails] = useState<
    ConnectionDetails | undefined
  >(undefined);
  const [agentState, setAgentState] = useState<AgentState>("disconnected");
  const [level, setLevel] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const [voice, setVoice] = useState<string>("");
  const [showSelect, setShowSelect] = useState<boolean>(true);
  const [showVisualizer, setShowVisualizer] = useState<boolean>(false);
  const [sayHi, setSayHi] = useState<boolean>(false);
  const [startTimer, setStartTimer] = useState<boolean>(false);
  const [showTimer, setShowTimer] = useState<boolean>(false);
  const [topics, setTopics] = useState<string[]>([]);
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const { setMessages: setGlobalMessages } = useMessage();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const duration = useMemo(
    () => (user?.plan ? user.plan.convo_duration * 60 : DEFAULT_CONVO_DURATION),
    [user?.plan]
  );

  const handleTimerFinish = useCallback(() => {
    const disconnectButton = document.querySelector(".disconnect-button");
    if (disconnectButton instanceof HTMLElement) {
      disconnectButton.click();
    }
  }, []);

  const onConnectButtonClicked = useCallback(async () => {
    if (!level || !topic || !voice) {
      alert("Silahkan pilih dahulu level/topic/voice");
      return;
    }
    const dailyConversation = Cookies.get("dailyConversation");
    const dailyLimit = user?.plan
      ? user.plan.daily_convo
      : DEFAULT_DAILY_CONVO_LIMIT;

    if (dailyConversation && parseInt(dailyConversation) >= dailyLimit) {
      return limitModal.onOpen();
    }

    addInstrunction({
      assistant: voice,
      level: level,
      topic: topic,
      language: "english",
    });

    const url = new URL(
      process.env.NEXT_PUBLIC_CONN_DETAILS_ENDPOINT ??
        "/api/connection-details",
      window.location.origin
    );
    const response = await fetch(url.toString(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ level, topic, voice }),
    });
    const connectionDetailsData = await response.json();
    updateConnectionDetails(connectionDetailsData);
    setShowSelect(false);
    setShowVisualizer(true);
    setSayHi(true);
    setShowTimer(true);
    setStartTimer(true);
  }, [level, topic, voice]);

  useEffect(() => {
    const fetchTopics = async () => {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_API}/api/topic`;
      const response = await fetch(url);
      const result = await response.json();
      if (result.success) {
        setTopics(result.data.map((topic: { title: string }) => topic.title)); // Ambil judul topik dari data
      } else {
        console.error(result.message); // Tangani kesalahan jika diperlukan
      }
    };

    fetchTopics(); // Panggil fungsi untuk mengambil topik
  }, []);

  const finishConversation = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_AI_CONVERSATION_API}/finish_conversation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages,
            instruction: instruction,
          }), // Ganti dengan instruksi yang sesuai
        }
      );
      const data = await response.json();
      const updatedMessages: ChatMessageType[] = data.updated_messages;

      const dailyConversation = Cookies.get("dailyConversation");
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

      // Simpan percakapan
      if (user) {
        const conversation = await storeConversation({
          messages: updatedMessages,
          level: level,
          topic: topic,
          duration: user.plan
            ? user.plan.convo_duration * 60
            : DEFAULT_CONVO_DURATION,
          voice: voice,
        });

        const parsedMessages: ChatMessageType[] = JSON.parse(
          conversation.messages
        );
        const feedbackMessage = parsedMessages[parsedMessages.length - 1];
        const conversationMessages = parsedMessages.slice(0, -1);
       

        if (parsedMessages.length > 0) {
          try {
            await fetch(`${process.env.NEXT_PUBLIC_MAKE_AUTOMATION_WEBHOOK}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                conversation: conversationMessages,
                feedback: feedbackMessage.content,
                email: user.email,
                timestamp: jakartaTime
              }),
            });
          } catch (error) {
            console.error("Error sending feedback content:", error);
          }
        }
        router.push(`/english-conversation/c/${conversation.id}/result`);
      } else {
        setGlobalMessages(updatedMessages);
        const feedbackMessage = updatedMessages[updatedMessages.length - 1];
        const conversationMessages = updatedMessages.slice(0, -1);

        if (updatedMessages.length > 0) {
          try {
            await fetch(`${process.env.NEXT_PUBLIC_MAKE_AUTOMATION_WEBHOOK}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                conversation: conversationMessages,
                feedback: feedbackMessage.content,
                email: "User not logged",
                timestamp: jakartaTime
              }),
            });
          } catch (error) {
            console.error("Error sending feedback content:", error);
          }
        }

        router.push("/english-conversation/result");
      }
    } catch (error) {
      alert("Error finishing conversation");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {agentState === "disconnected" && (
        <>
          <div className="flex flex-col items-center justify-center space-y-[8px]">
            <Image src="/svg/logo.svg" width={52} height={52} alt="logo" />
            <h1 className="font-medium text-lg md:text-2xl text-[#262626]">
              Interactive Conversation with Kulmin
            </h1>
            <p className="text-[#737373]">
              Let’s start click button voice below
            </p>
          </div>
          <div className="flex flex-col md:grid md:grid-cols-3 items-center justify-center w-full md:w-[772px] gap-[18px] border rounded-[6px] p-2 mt-4">
            <Select onValueChange={setLevel}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Level English" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select onValueChange={setTopic}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Topic Conversation" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {topics.map(
                    (
                      topic // Gunakan topik dari state
                    ) => (
                      <SelectItem key={topic} value={topic}>
                        {topic}
                      </SelectItem>
                    )
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select onValueChange={setVoice}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Voice" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="shimmer">Female</SelectItem>
                  <SelectItem value="alloy">Male</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </>
      )}
      {showTimer && (
        <CircleTimer
          duration={duration}
          isStarted={startTimer}
          onFinish={handleTimerFinish}
        />
      )}
      <LiveKitRoom
        token={connectionDetails?.participantToken}
        serverUrl={connectionDetails?.serverUrl}
        connect={connectionDetails !== undefined}
        audio={true}
        video={false}
        onDisconnected={() => {
          updateConnectionDetails(undefined);
          // setShowSelect(true);
          setShowVisualizer(false);
          setSayHi(false);
          setAgentState("connecting");
          setStartTimer(false);
          setShowTimer(false);
          finishConversation();
        }}
        className="grid grid-rows-[1fr_1fr] items-center mt-6 md:mt-24"
      >
        {sayHi && (
          <p className="text-xl font-medium text-center">
            “Say <em>“Hi!”</em> to start!”
          </p>
        )}
        {showVisualizer && (
          <SimpleVoiceAssistant
            onStateChange={setAgentState}
            onMessagesChange={setMessages}
          />
        )}
        <ControlBar
          onConnectButtonClicked={onConnectButtonClicked}
          agentState={agentState}
          level={level}
          topic={topic}
          voice={voice}
        />
        <RoomAudioRenderer />
        <NoAgentNotification state={agentState} />
      </LiveKitRoom>
      {isLoading && (
        <div className="flex flex-col justify-center items-center space-y-2">
          <Spinner />
          <p className="text-lg font-semibold text-gray-700">
            Please wait, result has been processed...
          </p>
        </div>
      )}
    </div>
  );
}

function SimpleVoiceAssistant(props: {
  onStateChange: (state: AgentState) => void;
  onMessagesChange: (messages: ChatMessageType[]) => void;
}) {
  const { state, audioTrack } = useVoiceAssistant();

  useEffect(() => {
    props.onStateChange(state);
  }, [props, state]);

  return (
    <div className="max-w-[90vw] mx-auto ">
      <div
        className={`flex items-center justify-center w-full h-48 [--lk-va-bar-width:30px] [--lk-va-bar-gap:20px]`}
      >
        <BarVisualizer
          state={state}
          trackRef={audioTrack}
          barCount={5}
          options={{ minHeight: 20 }}
        />
      </div>
      {audioTrack && (
        <TranscriptionTile
          agentAudioTrack={audioTrack}
          onMessagesChange={props.onMessagesChange}
        />
      )}
    </div>
  );
}

function ControlBar(props: {
  onConnectButtonClicked: () => void;
  agentState: AgentState;
  level: string | null;
  topic: string | null;
  voice: string | null;
}) {
  const krisp = useKrispNoiseFilter();
  useEffect(() => {
    krisp.setNoiseFilterEnabled(true);
  }, []);

  const isButtonDisabled = !props.level || !props.topic || !props.voice;
  return (
    <div className="relative h-[100px]">
      <AnimatePresence>
        {props.agentState === "disconnected" && (
          <motion.div
            initial={{ opacity: 0, top: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, top: "-10px" }}
            transition={{ duration: 1, ease: [0.09, 1.04, 0.245, 1.055] }}
            className="flex justify-center"
          >
            <Button
              size="icon"
              className="rounded-full h-20 w-20 md:h-[90px] md:w-[90px]"
              onClick={props.onConnectButtonClicked}
              disabled={isButtonDisabled}
            >
              <Mic className="w-8 h-8" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {props.agentState !== "disconnected" &&
          props.agentState !== "connecting" && (
            <motion.div
              initial={{ opacity: 0, top: "10px" }}
              animate={{ opacity: 1, top: 0 }}
              exit={{ opacity: 0, top: "-10px" }}
              transition={{ duration: 0.4, ease: [0.09, 1.04, 0.245, 1.055] }}
              className="flex h-8 absolute left-1/2 -translate-x-1/2 justify-center"
            >
              <DisconnectButton>
                <Button
                  size="icon"
                  variant="destructive"
                  className="rounded-full flex w-[42px] h-[42px] mt-24 disconnect-button"
                >
                  <Square className="w-5 h-5" fill="#fff" />
                </Button>
              </DisconnectButton>
            </motion.div>
          )}
      </AnimatePresence>
    </div>
  );
}
