import Image from 'next/image'
import { PlanSwitcher } from '@/components/plan-switcher'
import Link from 'next/link'

export const SignUpNav = () => {
  return (
    <header className='sticky top-0 z-50 w-full border-b bg-white py-3'>
      <nav className='container px-2 sm:px-4 lg:px-6 flex items-center justify-between'>
        <PlanSwitcher />
        <Link href='/' className='flex items-center gap-3'>
          <Image className='hidden sm:block' src='/svg/logo.svg' width={44} height={44} alt='logo' />
          <div>
            <h2 className='text-lg font-semibold'>Kuliah Di Luar Yuk</h2>
            <p className='text-xs text-muted-foreground'>Conversation AI</p>
          </div>
        </Link>
      </nav>
    </header>
  )
}
