import { EnglishConversationNav } from '@/components/layouts/english-conversation-nav'

export default function EnglishConversationLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <EnglishConversationNav />
      {children}
    </>
  )
}
