import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { jwtDecode } from "jwt-decode";

import { deleteToken, getToken, setToken } from "@/lib/cookies";
import { Conversation, Major, Message } from "@/types";
import { ChatMessageType } from "@/transcriptions/TranscriptionTile";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function splitByComma(inputString: string) {
  // Menggunakan metode split untuk memisahkan string berdasarkan koma
  const resultArray = inputString.split(",");

  // Menghapus spasi ekstra di sekitar kata atau kalimat
  return resultArray.map((item) => item.trim());
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(price);
}

export const loginGoogle = async ({
  email,
  name,
  avatar,
}: {
  email: string;
  name: string;
  avatar: string;
}) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/api/auth/callback/google`,
      {
        email,
        name,
        avatar,
      },
    );

    setToken(response.data.token);
  } catch (error) {
    console.log(error);
  }
};

export const getUserLogged = async () => {
  try {
    const token = getToken();

    if (!token) {
      return null;
    }

    const decoded = jwtDecode(token);
    const currentDate = new Date();

    // Check is token expired
    if (decoded.exp! * 1000 < currentDate.getTime()) {
      return null;
    }

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/api/auth/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
  try {
    const token = getToken();
    await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/api/auth/logout`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    deleteToken();
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};

interface StoreConversationProps {
  messages: ChatMessageType[];
  level: string;
  topic: string;
  duration: number;
  voice: string;
}

export const storeConversation = async (data: StoreConversationProps) => {
  try {
    const token = getToken();
    const user = await getUserLogged();
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/api/conversation`,
      {
        user_id: user.id,
        messages: JSON.stringify(data.messages),
        level: data.level,
        topic: data.topic,
        duration: data.duration,
        voice: data.voice,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllConversation = async (): Promise<Conversation[]> => {
  try {
    const token = getToken();
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/api/conversation`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getDetailConversation = async (
  id: string | string[],
): Promise<Conversation> => {
  try {
    const token = getToken();
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/api/conversation/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const parseMajorRecommendation = (text: string) => {
  const lines = text.split("\n\n"); // Split text by double new lines
  const greeting = lines[0].trim(); // First line is the greeting
  const introduction = lines[1].trim(); // Second line is the introduction

  const majors = [];

  // Iterate through the lines that contain major recommendations
  for (let i = 2; i < lines.length - 1; i++) {
    const majorParts = lines[i].split(": "); // Split major name from description
    const majorName = majorParts[0].replace(/^\d+\.\s*/, "").trim(); // Remove number and trim whitespace
    const majorDescription = majorParts[1].trim(); // Description is the second part after the colon
    majors.push({
      name: majorName,
      description: majorDescription,
    });
  }

  const conclusion = lines[lines.length - 1].trim(); // Last line is the conclusion

  return {
    greeting,
    introduction,
    majors,
    conclusion,
  };
};

export const storeMajor = async (major: Major, refCode: string | null) => {
  try {
    const token = getToken();
    await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/api/discover-major`,
      {
        major_grouping: major.major_grouping,
        major_recommendation: major.major_recommendation,
        career_impact: major.user_data.career_impact,
        email: major.user_data.email,
        emerging_trends: major.user_data.emerging_trends,
        favorite_activities: major.user_data.favorite_activities,
        favorite_subject: major.user_data.favorite_subject,
        inspiration: major.user_data.inspiration,
        name: major.user_data.name,
        passionate_challenges: major.user_data.passionate_challenges,
        specific_environment: major.user_data.specific_environment,
        strongest_skills: major.user_data.strongest_skills,
        phone: major.user_data.phone,
        edu_background: major.user_data.edu_background,
        ref: refCode,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  } catch (error) {
    console.log(error);
  }
};

export const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result);
    };
    reader.onerror = (error) => reject(error);
  });
};