import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { createAuthClient } from 'better-auth/react'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const authClient = createAuthClient({})
