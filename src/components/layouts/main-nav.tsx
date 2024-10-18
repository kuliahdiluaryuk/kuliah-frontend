import { MainDesktopNav } from '@/components/layouts/main-desktop-nav'
import { MainMobileNav } from '@/components/layouts/main-mobile-nav'

export const MainNav = () => {
  return (
    <header className='sticky flex items-center h-[10vh] top-0 z-50 w-full border-b bg-white py-3 shadow-sm'>
      <nav className='px-4 md:px-[32px] w-full'>
        <MainDesktopNav />
        <MainMobileNav />
      </nav>
    </header>
  )
}
