import { Heading } from '@/components/heading'
import { MainNav } from '@/components/layouts/main-nav'
import ProfileTabs from '@/components/layouts/profile-tabs'
import { Separator } from '@/components/ui/separator'

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <MainNav />
      <main className='bg-[#F5F5F5] flex justify-center p-4 md:py-[64px] md:px-[73px] min-h-[90vh]'>
        <div className='w-full rounded-[6px] bg-white border-2 border-[#F0F1F2] py-[32px] px-[16px] sm:p-[32px]'>
          <Heading
            title='Profile & Settings'
          />
          <ProfileTabs />
          <Separator className='my-[32px]' />
          {children}
        </div>
      </main>
    </>
  )
}
