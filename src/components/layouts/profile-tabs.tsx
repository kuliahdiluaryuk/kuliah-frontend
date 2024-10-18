'use client'

import { useSelectedLayoutSegment } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'

function ProfileTabs() {
  const segment = useSelectedLayoutSegment()

  return (
    <ul className='flex flex-wrap items-center gap-[16px] mt-[24px]'>
      <li>
        <Button
          variant={segment === 'profile' ? 'default' : 'ghost'}
          className={cn(
            'font-semibold shadow-none',
            segment === 'profile' ? 'text-neutral-900' : 'text-neutral-500',
          )}
          asChild
        >
          <Link href='/profile'>Overview</Link>
        </Button>
      </li>
      <li>
        <Button
          variant={segment === 'account' ? 'default' : 'ghost'}
          className={cn(
            'font-semibold shadow-none',
            segment === 'account' ? 'text-neutral-900' : 'text-neutral-500',
          )}
          asChild
        >
          <Link href='/account'>Account</Link>
        </Button>
      </li>
      <li>
        <Button
          variant={segment === 'subscriptions' ? 'default' : 'ghost'}
          className={cn(
            'font-semibold shadow-none',
            segment === 'subscriptions'
              ? 'text-neutral-900'
              : 'text-neutral-500',
          )}
          asChild
        >
          <Link href='/subscriptions'>Subscriptions</Link>
        </Button>
      </li>
      {/* <li>
        <Button
          variant={segment === 'referral' ? 'default' : 'ghost'}
          className={cn(
            'font-semibold shadow-none',
            segment === 'referral' ? 'text-neutral-900' : 'text-neutral-500',
          )}
          asChild
        >
          <Link href='/referral'>Referral Program</Link>
        </Button>
      </li> */}
    </ul>
  )
}

export default ProfileTabs
