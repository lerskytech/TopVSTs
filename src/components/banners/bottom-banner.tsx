"use client"

import * as React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import AffiliateBanner from '../ui/affiliate-banner';

interface BottomBannerProps {
  banners: Array<{
    brand: string;
    image: string;
    mobileSrc?: string;
    alt: string;
    link: string;
    type: string;
    priority: number;
    video?: string | null;
  }>;
  delay?: number; // Delay in ms before showing the banner
  showCloseButton?: boolean;
  sessionOnly?: boolean; // If true, once closed it stays closed only for the session
}

export default function BottomBanner({
  banners,
  delay = 3000,
  showCloseButton = true,
  sessionOnly = true,
}: BottomBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    // Check if banner should be hidden based on user preference
    const isBannerHidden = sessionOnly
      ? sessionStorage.getItem('hideBannerBottom') === 'true'
      : localStorage.getItem('hideBannerBottom') === 'true';
    
    if (isBannerHidden || !banners || banners.length === 0) {
      return;
    }
    
    // Show banner after delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [banners, delay, sessionOnly]);
  
  const closeBanner = () => {
    setIsVisible(false);
    
    // Store user preference
    if (sessionOnly) {
      sessionStorage.setItem('hideBannerBottom', 'true');
    } else {
      localStorage.setItem('hideBannerBottom', 'true');
    }
  };
  
  if (!isVisible || !banners || banners.length === 0) {
    return null;
  }
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: '0%' }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-background shadow-lg border-t"
        >
          <div className="container py-2">
            <AffiliateBanner
              src={banners[currentIndex].image}
              mobileSrc={banners[currentIndex].mobileSrc}
              alt={banners[currentIndex].alt}
              href={banners[currentIndex].link}
              size="small"
            />
            
            {showCloseButton && (
              <button
                onClick={closeBanner}
                className="absolute top-2 right-2 md:top-4 md:right-4 bg-background/80 hover:bg-background p-1 rounded-full"
                aria-label="Close banner"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
