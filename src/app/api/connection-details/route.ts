import {
    AccessToken,
    AccessTokenOptions,
    VideoGrant,
  } from "livekit-server-sdk";
  import { NextResponse } from "next/server";

  const API_KEY = process.env.LIVEKIT_API_KEY;
  const API_SECRET = process.env.LIVEKIT_API_SECRET;
  const LIVEKIT_URL = process.env.LIVEKIT_URL;

  // Define the structure for connection details response
  export type ConnectionDetails = {
    serverUrl: string;
    roomName: string;
    participantName: string;
    participantToken: string;
    level: string;
    topic: string;
    voice: string;
  };

  export async function POST(request: Request) {
    try {
      const body = await request.json();
      
      // Log the incoming body
      const { level = 'beginner', topic = 'introductions', voice = 'shimmer' } = body || {};
  
      const participantIdentity = `voice_assistant_user_${Math.round(Math.random() * 10_000)}`;

      const roomName = `room_${Math.round(Math.random() * 10_000)}`;
  
      const participantToken = await createParticipantToken(
        { identity: participantIdentity },
        roomName,
        level,
        topic,
        voice
      );
  
      if (!LIVEKIT_URL) {
        throw new Error("LIVEKIT_URL is not defined");
      }
  
      const data: ConnectionDetails = {
        serverUrl: LIVEKIT_URL,
        roomName: roomName,
        participantToken,
        participantName: participantIdentity,
        level,
        topic,
        voice,
      };
  
      return NextResponse.json(data);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        return new NextResponse(error.message, { status: 500 });
      }
      
      return new NextResponse("An unknown error occurred", { status: 500 });
    }
  }
  
  // Function to create a participant token
  function createParticipantToken(
    userInfo: AccessTokenOptions,
    roomName: string,
    level: string,
    topic: string,
    voice: string
  ) {
    // Initialize the AccessToken object with metadata
    const at = new AccessToken(API_KEY, API_SECRET, {
      ...userInfo,
      metadata: JSON.stringify({ level, topic, voice }),  // Add metadata with level and topic
    });
    at.ttl = "5m";  // Token valid for 5 minutes
    const grant: VideoGrant = {
      room: roomName,
      roomJoin: true,
      canPublish: true,
      canPublishData: true,
      canSubscribe: true,
    };

    // Add the grant to the token and return it
    at.addGrant(grant);
    return at.toJwt();
  }
