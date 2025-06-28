"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookiesAccepted = localStorage.getItem('cookies-accepted')
    
    if (!cookiesAccepted) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 1500)
      
      return () => clearTimeout(timer)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('cookies-accepted', 'true')
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border p-4 shadow-lg animate-in fade-in slide-in-from-bottom-4">
      <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm">
          <p>
            We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.{' '}
            <Link href="/privacy-policy" className="text-primary underline hover:text-primary/80">
              Learn more
            </Link>
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="whitespace-nowrap"
            onClick={() => setIsVisible(false)}
          >
            Decline
          </Button>
          <Button 
            size="sm"
            className="whitespace-nowrap"
            onClick={acceptCookies}
          >
            Accept All
          </Button>
        </div>
      </div>
    </div>
  )
}
