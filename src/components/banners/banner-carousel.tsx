"use client"

import * as React from 'react';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import AffiliateBanner from '../ui/affiliate-banner';
import { motion, AnimatePresence } from 'framer-motion';

interface BannerCarouselProps {
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
  autoRotate?: boolean;
  interval?: number;
  className?: string;
}

export default function BannerCarousel({
  banners,
  autoRotate = true,
  interval = 5000,
  className = '',
}: BannerCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Handle auto-rotation
  useEffect(() => {
    if (!autoRotate || isPaused || banners.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, interval);
    
    return () => clearInterval(timer);
  }, [autoRotate, interval, isPaused, banners.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % banners.length
    );
  };

  if (!banners || banners.length === 0) {
    return (
      <div className={`bg-muted h-[200px] md:h-[300px] rounded flex items-center justify-center ${className}`}>
        <p className="text-muted-foreground">No banners available</p>
      </div>
    );
  }

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <AffiliateBanner
            src={banners[currentIndex].image}
            mobileSrc={banners[currentIndex].mobileSrc}
            alt={banners[currentIndex].alt}
            href={banners[currentIndex].link}
            size="large"
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows */}
      {banners.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background rounded-full p-2 backdrop-blur-sm"
            aria-label="Previous banner"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background rounded-full p-2 backdrop-blur-sm"
            aria-label="Next banner"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          
          {/* Pagination dots */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  currentIndex === index ? 'w-4 bg-primary' : 'w-2 bg-muted'
                }`}
                aria-label={`Go to banner ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
