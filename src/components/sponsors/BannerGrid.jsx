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
                  className="banner-fallback flex items-center justify-center bg-muted p-6"
                  style={{
                    aspectRatio: banner.shape === 'horizontal' ? '2/1' : 
                               banner.shape === 'vertical' ? '1/2' : '1/1',
                    minHeight: banner.shape === 'horizontal' ? '150px' : 
                              banner.shape === 'vertical' ? '300px' : '200px'
                  }}
                >
                  <div className="text-center">
                    <p className="font-bold text-lg">{banner.product}</p>
                    <p className="text-muted-foreground text-sm mt-2">WA Production</p>
                    <p className="text-xs mt-3 text-primary">View Deal</p>
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
