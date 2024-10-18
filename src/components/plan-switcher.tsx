'use client'

import { ChevronDown, CircleCheck } from 'lucide-react'
import { FaCheckCircle } from 'react-icons/fa'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

const plans = [
  {
    value: 'gpt3',
    label: 'ChatGPT 3.5',
  },
  {
    value: 'gpt4',
    label: 'ChatGPT 4.2 (Trial)',
  },
]

export function PlanSwitcher() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('gpt4')

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='secondary'
          role='combobox'
          aria-expanded={open}
          className='w-[150px] justify-between'
        >
          <span className='truncate'>
            {value
              ? plans.find((plan) => plan.value === value)?.label
              : 'Select plan...'}
          </span>
          <ChevronDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[300px] p-0' align='start'>
        <Command>
          <CommandList>
            <CommandGroup className='px-2'>
              {plans.map((plan) => (
                <CommandItem
                  key={plan.value}
                  value={plan.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue)
                    setOpen(false)
                  }}
                  className={cn(
                    'px-2.5 py-3 my-2',
                    value === plan.value
                      ? 'font-semibold !bg-[#FFD013]'
                      : 'font-normal',
                  )}
                >
                  {plan.label}
                  <FaCheckCircle
                    className={cn(
                      'ml-auto h-4 w-4',
                      value === plan.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
