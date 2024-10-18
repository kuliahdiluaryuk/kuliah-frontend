"use client";

import dynamic from "next/dynamic";

const DynamicStartConversationPage = dynamic(() => import("./dynamic-page"), {
  ssr: false,
});

function StartConversationPage() {
  return <DynamicStartConversationPage />;
}

export default StartConversationPage;
