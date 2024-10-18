import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

interface HeadingProps extends HTMLAttributes<HTMLDivElement> {
  title: string
}

export const Heading: React.FC<HeadingProps> = ({
  title,
  className,
  ...props
}) => {
  return (
    <div className={cn('space-y-1', className)} {...props}>
      <h2 className='text-3xl text-neutral-800 font-semibold'>{title}</h2>
    </div>
  )
}
