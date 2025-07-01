"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * SponsorBannerCarousel Component
 * 
 * A carousel component specifically designed for sponsor banners
 * Features:
 * - Auto-rotation with configurable interval
 * - Pause on hover
 * - Navigation controls (arrows and dots)
 * - Responsive design
 * - Affiliate disclosure badge
 * 
 * @param {Object} props Component props
 * @param {Array} props.sponsor The sponsor data containing banners, alt text, and URL
 * @param {boolean} props.autoRotate Whether the carousel should auto-rotate
 * @param {number} props.interval Rotation interval in milliseconds
 * @param {string} props.className Additional CSS classes to apply
 */
const SponsorBannerCarousel = ({
  sponsor,
  autoRotate = true,
  interval = 5000,
  className = '',
}) => {
  // With the new data structure, we only use the one main banner for SoundRAW in the carousel
  // The other banners are stored in promosToUseLater for future use in other sections
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  // Get banners that are designated for carousel use only
  const carouselBanners = sponsor.banners ? sponsor.banners.filter(banner => 
    banner.use === 'carousel' || !banner.use
  ) : [];

  // Handle auto-rotation - not really needed as we only have one banner for now
  useEffect(() => {
    if (!autoRotate || isPaused || carouselBanners.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselBanners.length);
    }, interval);
    
    return () => clearInterval(timer);
  }, [autoRotate, interval, isPaused, carouselBanners.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? carouselBanners.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % carouselBanners.length
    );
  };

  if (!sponsor || !carouselBanners || carouselBanners.length === 0) {
    return (
      <div className={`bg-muted h-[200px] md:h-[300px] rounded flex items-center justify-center ${className}`}>
        <p className="text-muted-foreground">No banners available</p>
      </div>
    );
  }
  
  // Get the current banner
  const currentBanner = carouselBanners[currentIndex];

  return (
    <div 
      className={`relative overflow-hidden rounded-lg shadow-md ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Affiliate Disclosure Badge */}
      <div className="absolute top-2 left-2 z-10 bg-black/70 text-white px-2 py-1 rounded text-xs">
        Affiliate Ad
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <Link 
            href={currentBanner.url || sponsor.url} 
            target="_blank" 
            rel="noopener noreferrer sponsored" 
            className="relative block w-full h-full"
            data-brand={sponsor.name}
            onClick={() => {
              // Track affiliate click
              if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('event', 'affiliate_click', {
                  affiliate_brand: sponsor.name,
                  affiliate_url: currentBanner.url || sponsor.url,
                  banner_type: 'carousel'
                });
              }
            }}
          >
            <Image
              src={currentBanner.image}
              alt={currentBanner.alt}
              width={1200}
              height={300}
              className="w-full h-auto object-cover"
              priority={currentIndex === 0}
            />
          </Link>
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows - only show if more than one banner */}
      {carouselBanners.length > 1 && (
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
            {carouselBanners.map((_, index) => (
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
};

export default SponsorBannerCarousel;
