import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}

// Format date to readable format
export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

// Truncate text with ellipsis
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength)}...`
}

// Generate random ID for elements
export function generateId(length: number = 8): string {
  return Math.random().toString(36).substring(2, 2 + length)
}

// Calculate discount percentage
export function calculateDiscount(originalPrice: number, salePrice: number): number {
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100)
}

// Parse rating to stars array (filled, half-filled, empty)
export function parseRating(rating: number): ('full' | 'half' | 'empty')[] {
  const stars: ('full' | 'half' | 'empty')[] = []
  
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push('full')
    } else if (rating >= i - 0.5) {
      stars.push('half')
    } else {
      stars.push('empty')
    }
  }
  
  return stars
}

// Format number to K, M format (e.g. 1500 -> 1.5K)
export function formatCompactNumber(num: number): string {
  return Intl.NumberFormat('en-US', { 
    notation: "compact",
    maximumFractionDigits: 1 
  }).format(num)
}

// Get readable file size
export function getFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}
