"use client";

import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from './button';
import { X } from 'lucide-react';

interface CookieBannerProps {
  className?: string;
}

const CookieBanner = ({ className }: CookieBannerProps) => {
  const [isVisible, setIsVisible] = useState(false);

  // Check if cookies have been accepted before
  useEffect(() => {
    const cookiesAccepted = localStorage.getItem('cookies-accepted');
    if (!cookiesAccepted) {
      // Delay showing the banner slightly for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookies-accepted', 'true');
    setIsVisible(false);
  };

  const declineCookies = () => {
    // Still store preference but indicate declined
    localStorage.setItem('cookies-declined', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 px-4 py-3 bg-background/95 backdrop-blur-sm border-t border-border shadow-lg ${className}`}>
      <div className="container flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex-1 pr-8">
          <h3 className="text-sm font-semibold">Cookie Notice</h3>
          <p className="text-xs text-muted-foreground mt-1">
            We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept" you consent to our{' '}
            <Link href="/privacy-policy" className="underline hover:text-primary">
              privacy policy
            </Link>
            .
          </p>
          <p className="text-xs affiliate-disclosure mt-2">
            This site contains affiliate links. We may earn a commission when you use our links to purchase products.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={declineCookies}
            className="text-xs"
          >
            Decline
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={acceptCookies}
            className="text-xs"
          >
            Accept
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={declineCookies}
            className="absolute top-3 right-3 sm:hidden"
            aria-label="Close cookie banner"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
