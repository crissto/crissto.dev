import clsx, { type ClassValue } from 'clsx'
import { type ReactNode } from 'react'

type Props = {
  children: ReactNode,
  className: string | ClassValue[]
}

export function Prose({ children, className }: Props) {
  return (
    <div className={clsx(className, 'prose dark:prose-invert')}>{children}</div>
  )
}
