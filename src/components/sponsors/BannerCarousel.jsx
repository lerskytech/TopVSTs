"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * BannerCarousel Component
 * 
 * A versatile carousel component for displaying sponsor banners.
 * Features:
 * - Auto-rotation with configurable interval
 * - Pause on hover functionality
 * - Navigation controls (arrows and dots)
 * - Responsive design for all screen sizes
 * - Affiliate disclosure badge
 * - Click tracking for analytics
 * - Fallback for missing images
 * 
 * @param {Object} props Component props
 * @param {Array} props.banners Array of banner objects to display
 * @param {boolean} props.autoRotate Whether the carousel should auto-rotate
 * @param {number} props.interval Rotation interval in milliseconds
 * @param {string} props.className Additional CSS classes
 * @param {string} props.title Optional title for the carousel section
 */
const BannerCarousel = ({
  banners = [],
  autoRotate = true,
  interval = 5000,
  className = '',
  title = null
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Filter out banners without a valid image path
  const validBanners = banners.filter(banner => banner.banner || banner.image);

  // Handle auto-rotation
  useEffect(() => {
    if (!autoRotate || isPaused || validBanners.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % validBanners.length);
    }, interval);
    
    return () => clearInterval(timer);
  }, [autoRotate, interval, isPaused, validBanners.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? validBanners.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % validBanners.length
    );
  };

  if (!validBanners || validBanners.length === 0) {
    return null;
  }

  // Get the current banner
  const currentBanner = validBanners[currentIndex];
  
  // Handle different banner data structures (support both formats)
  const getBannerImage = (banner) => banner.banner || banner.image;
  const getBannerAlt = (banner) => banner.alt || `${banner.product || banner.name} - Promotion`;
  const getBannerLink = (banner) => banner.link || banner.url;
  const getBannerName = (banner) => banner.name || 'Banner';
  const getBannerProduct = (banner) => banner.product || banner.name;
  const getBannerAspectRatio = (banner) => {
    if (banner.shape === 'horizontal') return 'aspect-[2/1]';
    if (banner.shape === 'vertical') return 'aspect-[1/2]';
    return 'aspect-square'; // Default for 1:1 and unknown shapes
  };

  return (
    <div className={className}>
      {title && (
        <h3 className="text-xl font-bold mb-4">{title}</h3>
      )}
    
      <div 
        className="relative overflow-hidden rounded-lg shadow-md"
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
              href={getBannerLink(currentBanner)}
              target="_blank" 
              rel="noopener noreferrer sponsored" 
              className="relative block w-full h-full"
              onClick={() => {
                // Track affiliate click
                if (typeof window !== 'undefined' && window.gtag) {
                  window.gtag('event', 'affiliate_click', {
                    affiliate_brand: getBannerName(currentBanner).includes('WA') ? 'WA Production' : getBannerName(currentBanner),
                    product: getBannerProduct(currentBanner),
                    banner_name: getBannerName(currentBanner),
                    affiliate_url: getBannerLink(currentBanner),
                    banner_type: 'carousel'
                  });
                }
              }}
            >
              <div className="relative">
                {/* Directly show fallback since images don't exist */}
                <div className={`banner-fallback flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 p-6 shadow-inner ${getBannerAspectRatio(currentBanner)}`} style={{ minHeight: '200px' }}>
                  <div className="text-center">
                    <div className="mb-3 opacity-70">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path><circle cx="12" cy="13" r="3"></circle></svg>
                    </div>
                    <p className="font-bold text-lg">{getBannerProduct(currentBanner)}</p>
                    <p className="text-muted-foreground text-sm mt-2">{getBannerName(currentBanner).includes('WA') ? 'WA Production' : getBannerName(currentBanner)}</p>
                    <div className="mt-3 inline-flex items-center justify-center border border-primary bg-primary/10 hover:bg-primary/20 text-primary rounded-lg px-3 py-1 text-sm font-medium transition-all">
                      View Deal
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows - only show if more than one banner */}
        {validBanners.length > 1 && (
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
              {validBanners.map((_, index) => (
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
    </div>
  );
};

export default BannerCarousel;
