import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { createAuthClient } from 'better-auth/react'
import type { ClassValue } from 'clsx'

export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs))
}

export const authClient = createAuthClient({})
