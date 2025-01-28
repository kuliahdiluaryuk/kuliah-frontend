import { ChatTile } from "@/components/chat/ChatTile";
import {
  TrackReferenceOrPlaceholder,
  useChat,
  useLocalParticipant,
  useTrackTranscription,
} from "@livekit/components-react";
import {
  LocalParticipant,
  Participant,
  Track,
  TranscriptionSegment,
} from "livekit-client";
import { useEffect, useState } from "react";

export type ChatMessageType = {
  role: string;
  content: string;
  isSelf: boolean;
  timestamp: number;
};

export function TranscriptionTile({
  agentAudioTrack,
  onMessagesChange,
}: {
  agentAudioTrack: TrackReferenceOrPlaceholder;
  onMessagesChange: (messages: ChatMessageType[]) => void;
}) {
  const agentMessages = useTrackTranscription(agentAudioTrack);
  const localParticipant = useLocalParticipant();
  const localMessages = useTrackTranscription({
    publication: localParticipant.microphoneTrack,
    source: Track.Source.Microphone,
    participant: localParticipant.localParticipant,
  });

  const [transcripts, setTranscripts] = useState<Map<string, ChatMessageType>>(
    new Map(),
  );
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const { chatMessages, send: sendChat } = useChat();

  // store transcripts
  useEffect(() => {
    agentMessages.segments.forEach((s) =>
      transcripts.set(
        s.id,
        segmentToChatMessage(
          s,
          transcripts.get(s.id),
          agentAudioTrack.participant,
        ),
      ),
    );
    localMessages.segments.forEach((s) =>
      transcripts.set(
        s.id,
        segmentToChatMessage(
          s,
          transcripts.get(s.id),
          localParticipant.localParticipant,
        ),
      ),
    );

    const allMessages = Array.from(transcripts.values());
    for (const msg of chatMessages) {
      const isAgent =
        msg.from?.identity === agentAudioTrack.participant?.identity;
      const isSelf =
        msg.from?.identity === localParticipant.localParticipant.identity;
      let name = msg.from?.name;
      if (!name) {
        if (isAgent) {
          name = "assistant";
        } else if (isSelf) {
          name = "user";
        } else {
          name = "unknown";
        }
      }
      allMessages.push({
        role: name,
        content: msg.message,
        timestamp: msg.timestamp,
        isSelf: isSelf,
      });
    }
    allMessages.sort((a, b) => a.timestamp - b.timestamp);
    setMessages(allMessages);
    onMessagesChange(allMessages); 
  }, [
    transcripts,
    chatMessages,
    localParticipant.localParticipant,
    agentAudioTrack.participant,
    agentMessages.segments,
    localMessages.segments,
    onMessagesChange,
  ]);

  return null;
  // return <ChatTile messages={messages} onSend={sendChat} />;
}

function segmentToChatMessage(
  s: TranscriptionSegment,
  existingMessage: ChatMessageType | undefined,
  participant: Participant,
): ChatMessageType {
  const msg: ChatMessageType = {
    content: s.final ? s.text : `${s.text} ...`,
    role: participant instanceof LocalParticipant ? "user" : "assistant",
    isSelf: participant instanceof LocalParticipant,
    timestamp: existingMessage?.timestamp ?? Date.now(),
  };
  return msg;
}
