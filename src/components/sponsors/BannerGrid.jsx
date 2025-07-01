"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

/**
 * BannerGrid Component
 * 
 * Displays a grid of banners, filtered by shape or category.
 * Features:
 * - Responsive layout based on banner shape
 * - Proper affiliate disclosure
 * - Fallback placeholder for missing images
 * - Click tracking for analytics
 * 
 * @param {Object} props Component props
 * @param {Array} props.banners Array of banner objects to display
 * @param {string} props.shape Filter banners by shape (1:1, horizontal, vertical)
 * @param {string} props.className Additional CSS classes
 * @param {string} props.title Optional title for the grid section
 */
const BannerGrid = ({ 
  banners = [], 
  shape = null,
  className = '',
  title = null
}) => {
  // Debug data
  console.log('BannerGrid data:', { shape, bannerCount: banners?.length || 0, banners });

  // Filter banners by shape if specified
  const filteredBanners = shape 
    ? banners.filter(banner => banner.shape === shape)
    : banners;
  
  console.log('Filtered banners:', { shape, count: filteredBanners?.length || 0 });

  // Show minimal UI even if no banners
  if (!filteredBanners || filteredBanners.length === 0) {
    return (
      <div className={className}>
        {title && <h3 className="text-xl font-bold mb-4">{title}</h3>}
        <div className="p-4 border border-dashed border-gray-300 rounded-lg text-center">
          <p>No banners available for {shape || 'this section'}</p>
        </div>
      </div>
    );
  }

  // Determine grid layout based on shapes
  const getGridClassName = () => {
    if (shape === '1:1') {
      return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
    } else if (shape === 'horizontal') {
      return 'grid-cols-1 lg:grid-cols-2';
    } else if (shape === 'vertical') {
      return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
    } else {
      // Mixed shapes
      return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    }
  };

  return (
    <div className={className}>
      {title && (
        <h3 className="text-xl font-bold mb-4">{title}</h3>
      )}
      
      <div className={`grid gap-4 ${getGridClassName()}`}>
        {filteredBanners.map((banner, index) => (
          <div key={`${banner.name}-${index}`} className="relative group">
            {/* Affiliate Disclosure Badge */}
            <div className="absolute top-2 left-2 z-10 bg-black/70 text-white px-2 py-1 rounded text-xs">
              Affiliate Ad
            </div>
            
            <Link
              href={banner.link}
              target="_blank"
              rel="noopener noreferrer sponsored"
              onClick={() => {
                // Track affiliate click
                if (typeof window !== 'undefined' && window.gtag) {
                  window.gtag('event', 'affiliate_click', {
                    affiliate_brand: 'WA Production',
                    product: banner.product,
                    banner_name: banner.name,
                    affiliate_url: banner.link
                  });
                }
              }}
              className="block rounded-lg overflow-hidden border border-border hover:border-primary transition-colors"
            >
              {/* Image with Fallback */}
              <div className="relative">
                {/* Show fallback by default since we know the images don't exist yet */}
                <div 
                  className="banner-fallback flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 p-6 shadow-inner"
                  style={{
                    aspectRatio: banner.shape === 'horizontal' ? '2/1' : 
                               banner.shape === 'vertical' ? '1/2' : '1/1',
                    minHeight: banner.shape === 'horizontal' ? '150px' : 
                              banner.shape === 'vertical' ? '300px' : '200px'
                  }}
                >
                  <div className="text-center">
                    <div className="mb-3 opacity-70">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path><circle cx="12" cy="13" r="3"></circle></svg>
                    </div>
                    <p className="font-bold text-lg">{banner.product}</p>
                    <p className="text-muted-foreground text-sm mt-2">WA Production</p>
                    <div className="mt-3 inline-flex items-center justify-center border border-primary bg-primary/10 hover:bg-primary/20 text-primary rounded-lg px-3 py-1 text-sm font-medium transition-all">
                      View Deal
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerGrid;
