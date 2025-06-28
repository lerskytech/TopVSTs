"use client"

import * as React from 'react';
import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import AffiliateBanner from '../ui/affiliate-banner';

interface StickySidebarProps {
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
  interval?: number;
  className?: string;
  offsetTop?: number;
}

export default function StickySidebar({
  banners,
  interval = 30000, // Rotate every 30 seconds
  className = '',
  offsetTop = 100,
}: StickySidebarProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, 
    [0, 100, 300], 
    [0, 0.7, 1]
  );
  
  // Handle rotation of banners
  useEffect(() => {
    if (!banners || banners.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, interval);
    
    return () => clearInterval(timer);
  }, [interval, banners]);

  // No banners available
  if (!banners || banners.length === 0) {
    return null;
  }

  return (
    <motion.div 
      className={`hidden lg:block sticky ${className}`}
      style={{ 
        top: `${offsetTop}px`,
        opacity,
      }}
    >
      <div className="w-full max-w-[300px]">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AffiliateBanner
            src={banners[currentIndex].image}
            alt={banners[currentIndex].alt}
            href={banners[currentIndex].link}
            size="medium"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
