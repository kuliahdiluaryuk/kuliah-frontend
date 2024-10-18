"use client";

import { Dot, Flame, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { RiSpeakLine } from "react-icons/ri";
import { TbTextGrammar, TbVocabulary } from "react-icons/tb";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useMessage from "@/hooks/use-message";

export default function NotLoggedResultPage() {
  const { messages } = useMessage();

  const feedbackText =
    messages.length > 0 ? messages[messages.length - 1].content : "";

  function parseFeedback(text: string) {
    // Menambahkan tipe data string untuk parameter text
    const feedback = {
      grammar: [],
      vocabulary: [],
      engagement: [],
      adviceToImprove: [],
      grading: {} as { [key: string]: string },
      recommendation: "",
    };

    const lines = text.trim().split("\n");
    let currentSection = "";

    lines.forEach((line) => {
      if (line.startsWith("Grammar (tenses):")) {
        currentSection = "grammar";
      } else if (line.startsWith("Vocabulary:")) {
        currentSection = "vocabulary";
      } else if (line.startsWith("Engagement:")) {
        currentSection = "engagement";
      } else if (line.startsWith("Advice to Improve:")) {
        currentSection = "adviceToImprove";
      } else if (line.startsWith("Grading:")) {
        currentSection = "grading";
      } else if (line.startsWith("Recommendation:")) {
        currentSection = "recommendation";
      } else {
        if (
          currentSection === "grammar" ||
          currentSection === "vocabulary" ||
          currentSection === "engagement" ||
          currentSection === "adviceToImprove"
        ) {
          if (line.trim().length > 0) {
            (feedback[currentSection] as string[]).push(
              line.trim().replace(/^\d+\.\s*/, "")
            );
          }
        } else if (currentSection === "grading") {
          if (line.trim().length > 0) {
            const [key, value] = line.split(":").map((part) => part.trim());
            feedback.grading[key.toLowerCase().replace(/ /g, "")] = value;
          }
        } else if (currentSection === "recommendation") {
          feedback.recommendation += line.trim() + " ";
        }
      }
    });

    feedback.recommendation = feedback.recommendation.trim();

    return feedback;
  }

  const feedbackObject = parseFeedback(feedbackText);

  return (
    <main className="bg-[#F5F5F5] flex justify-center py-[24px] lg:py-[64px] px-4">
      <div className="relative bg-white w-full max-w-[1060px] border-2 border-[#F0F1F2 rounded-[6px]">
        <Button
          size="icon"
          variant="ghost"
          className="absolute w-[24px] h-[24px] right-[24px] top-[24px]"
          asChild
        >
          <Link href="/english-conversation">
            <X />
          </Link>
        </Button>
        <div className="flex flex-col items-center">
          <div className='bg-[url("/svg/confetti.svg")] bg-no-repeat bg-contain bg-center w-full sm:w-[533px] sm:h-[338.97px] flex flex-col items-center justify-center sm:mt-[34px]'>
            <h1 className="font-bold text-xl md:text-3xl text-neutral-800 mt-[80px]">
              Nice Talking to you!
            </h1>
            <Image
              src="/svg/convo-english-result.svg"
              alt="Congrats"
              width={300}
              height={300}
              className="mt-4"
            />
          </div>
          <p className="text-neutral-600 font-medium mt-2 text-center mx-4">
            Let’s talk more!!
          </p>
        </div>

        <div className="px-[24px] md:px-[88px] mt-[114px]">
          <div className="bg-[#FFEFB0] w-fit py-[6px] px-[14px] border-l-[3px] border-[#FFD013]">
            <h2 className="text-2xl font-semibold text-neutral-800">
              Here’s my thought and what you can improve:
            </h2>
          </div>
          <Separator className="mt-[23px]" />
          <div className="border border-neutral-300 rounded-[6px] p-[24px] mt-[14px]">
            <div className="flex items-center">
              <div className="bg-[#FDFA8B] rounded-full w-[38px] h-[38px] flex items-center justify-center mr-[16px]">
                <TbTextGrammar className="w-[24px] h-[24px]" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-800">
                Grammar
              </h3>
            </div>
            <ul className="mt-[20px] text-neutral-500 font-medium">
              {feedbackObject.grammar.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span>
                    <Dot />
                  </span>{" "}
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-neutral-300 rounded-[6px] p-[24px] mt-[14px]">
            <div className="flex items-center">
              <div className="bg-[#FDFA8B] rounded-full w-[38px] h-[38px] flex items-center justify-center mr-[16px]">
                <TbVocabulary className="w-[24px] h-[24px]" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-800">
                Vocabulary
              </h3>
            </div>
            <ul className="mt-[20px] text-neutral-500 font-medium">
              {feedbackObject.vocabulary.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span>
                    <Dot />
                  </span>{" "}
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-neutral-300 rounded-[6px] p-[24px] mt-[14px]">
            <div className="flex items-center">
              <div className="bg-[#FDFA8B] rounded-full w-[38px] h-[38px] flex items-center justify-center mr-[16px]">
                <RiSpeakLine className="w-[24px] h-[24px]" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-800">
                Advice to Improve
              </h3>
            </div>
            <ul className="mt-[20px] text-neutral-500 font-medium">
              {feedbackObject.adviceToImprove.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span>
                    <Dot />
                  </span>{" "}
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-[#FEFEE8] mx-3 md:mx-[106px] border border-[#FFD013] rounded-[6px] mt-[38px] p-[24px]">
          <div className="flex items-center">
            <div className="bg-[#FDFA8B] rounded-full w-[38px] h-[38px] flex items-center justify-center mr-[16px]">
              <Flame className="w-[24px] h-[24px]" />
            </div>
            <div className="relative flex">
              <h3 className="text-xl font-semibold text-neutral-800">
                In stages potential
              </h3>
              <Image
                alt="star"
                src="/svg/star.svg"
                width={30}
                height={30}
                className="absolute -top-4 -right-9"
              />
            </div>
          </div>
          <div className="mt-[14px] space-y-[32px] text-neutral-500 text-lg font-medium">
            <p>{feedbackObject.recommendation}</p>
          </div>
        </div>

        <div className="w-full flex justify-end px-[32px] pt-[64px] pb-[48px]">
          <Button
            asChild
            size="lg"
            className="font-semibold text-neutral-900 w-full lg:w-fit"
          >
            <Link href="/english-conversation/transcript">
              See the Transcript
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
