import { EnglishConversationDesktopNav } from '@/components/layouts/english-conversation-desktop-nav'
import { EnglishConversationMobileNav } from '@/components/layouts/english-conversation-mobile-nav'

export const EnglishConversationNav = () => {
  return (
    <header className='sticky flex items-center h-[10vh] top-0 z-50 w-full border-b bg-white py-3 shadow-sm'>
      <nav className='px-4 lg:px-6 w-full'>
        <EnglishConversationDesktopNav />
        <EnglishConversationMobileNav />
      </nav>
    </header>
  )
}
