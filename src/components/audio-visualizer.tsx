import { Button } from "@/components/ui/button";
import { Mic, SendHorizonal } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface AudioVisualizerProps {
  isLoading: boolean;
  isListening: boolean;
  onSend: () => void;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
  isLoading,
  isListening,
  onSend,
}) => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const initAudio = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioCtx = new AudioContext();
      const analyserNode = audioCtx.createAnalyser();
      analyserNode.fftSize = 256;
      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyserNode);

      setAudioContext(audioCtx);
      setAnalyser(analyserNode);
    };

    initAudio();

    return () => {
      if (audioContext) {
        audioContext.close();
      }
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const canvasCtx = canvas.getContext("2d");
    let animationId: number;

    const draw = () => {
      if (!canvasCtx) return;

      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
      const radius = 20; // Radius of circles
      const spacing = 10; // Spacing between circles
      const centerY = canvas.height / 2;
      const totalWidth = 4 * (2 * radius + spacing) - spacing; // Total width of all circles and spacing
      const startX = (canvas.width - totalWidth) / 2 + radius; // Starting x position for the first circle
      let x = startX;

      if (isLoading || isListening) {
        const time = Date.now() / 200; // Adjust speed of the wave animation
        for (let i = 0; i < 4; i++) {
          const barHeight =
            radius + Math.sin(time + (isListening ? -i : i)) * radius; // Simulate wave effect
          const minHeight = radius;
          const maxHeight = radius * 2;
          const circleHeight = Math.max(
            minHeight,
            Math.min(maxHeight, barHeight),
          ); // Ensure height is within bounds

          // Draw vertical bar with rounded ends
          canvasCtx.beginPath();
          canvasCtx.fillStyle = "#FFD013";
          canvasCtx.roundRect(
            x - radius,
            centerY - circleHeight / 2,
            2 * radius,
            circleHeight,
            radius,
          );
          canvasCtx.fill();

          x += 2 * radius + spacing;
        }
      } else if (analyser) {
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyser.getByteFrequencyData(dataArray);

        for (let i = 0; i < 4; i++) {
          const barHeight = dataArray[i * 4] * 0.5;
          const circleHeight = radius + barHeight / 2; // Adjust the height based on the audio amplitude

          // Draw vertical bar with rounded ends
          canvasCtx.beginPath();
          canvasCtx.fillStyle = "#FFD013";
          canvasCtx.roundRect(
            x - radius,
            centerY - circleHeight / 2,
            2 * radius,
            circleHeight,
            radius,
          );
          canvasCtx.fill();

          x += 2 * radius + spacing;
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isLoading, isListening, analyser]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center justify-center">
        <Mic className="w-5 h-5 sm:w-7 sm:h-7 text-neutral-500" />
        <canvas
          ref={canvasRef}
          width="250"
          height="100"
          className="w-[150px] h-[60px] sm:w-[250px] sm:h-[100px]"
        />
        <Button
          disabled={isLoading}
          className="shadow-none hidden sm:flex"
          onClick={onSend}
        >
          Send <SendHorizonal className="w-4 h-4 ml-2" />
        </Button>
        <Button
          disabled={isLoading}
          className="shadow-none sm:hidden"
          size="icon"
          onClick={onSend}
        >
          <SendHorizonal className="w-4 h-4" />
        </Button>
      </div>
      <p className="text-lg sm:text-xl text-neutral-500">
        {isLoading ? "Speaking" : isListening ? "Listening..." : "Speaking"}
      </p>
    </div>
  );
};

export default AudioVisualizer;
