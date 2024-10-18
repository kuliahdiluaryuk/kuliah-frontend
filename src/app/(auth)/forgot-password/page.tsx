import { ForgotPasswordForm } from '@/components/forms/forgot-password-form'
import { Footer } from '@/components/layouts/footer'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import Link from 'next/link'

function ForgotPasswordPage() {
  return (
    <main className='bg-[#FAFAFA] min-h-screen flex flex-col justify-center items-center'>
      <div className='-mt-[200px] sm:-mt-[250px] -ml-[200px]'>
        <Image
          priority
          src='/svg/sign-in-bg.svg'
          alt='logo'
          width={700}
          height={700}
        />
      </div>
      <div className='w-full sm:w-[400px] z-10 -mt-[200px] sm:-mt-[250px] mb-8'>
        <Card>
          <CardHeader className='space-y-1'>
            <CardTitle className='text-2xl text-[#262626]'>Forgot Password</CardTitle>
          </CardHeader>
          <CardContent className='grid grid-cols-1'>
            <Separator className='mb-6' />
            <ForgotPasswordForm />
          </CardContent>
          <CardFooter className='text-sm text-muted-foreground flex items-center justify-center'>
            <Link
              aria-label='Sign in'
              href='/sign-in'
              className='flex items-center gap-4'
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
              Back to Login
            </Link>
          </CardFooter>
        </Card>
      </div>
      <Footer />
    </main>
  )
}
export default ForgotPasswordPage
