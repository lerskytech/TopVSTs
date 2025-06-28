"use client";

import * as React from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Import banner data using relative path
import { getFeaturedBanners } from '../../data/banners';

/**
 * SponsorBar component
 * A scrolling bar displaying all sponsor/affiliate logos
 * Can be configured to auto-scroll or be static
 */
interface SponsorBarProps {
  autoScroll?: boolean;
  className?: string;
}

const SponsorBar = ({ autoScroll = true, className = '' }: SponsorBarProps) => {
  // Get featured banners for the sponsor bar
  const partners = getFeaturedBanners();
  const [isMounted, setIsMounted] = useState(false);

  // Only enable animations after component mount to avoid hydration issues
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className={`w-full bg-secondary/50 py-2 ${className}`}>
      <div className="container">
        <p className="text-xs mb-1 text-muted-foreground">Our Trusted Partners:</p>
        <div className={`sponsor-scroll relative ${!isMounted ? 'overflow-hidden' : ''}`}>
          <div className={`flex items-center gap-4 md:gap-8 ${autoScroll && isMounted ? 'sponsor-scroll-inner' : ''}`}>
            {partners.map((banner, index) => (
              <Link 
                href={banner.link}
                key={`${banner.brand}-${index}`}
                target="_blank"
                rel="nofollow noopener"
                className="hover-neon-effect flex-shrink-0"
                aria-label={`Visit ${banner.brand}'s website`}
                onClick={() => {
                  // Track affiliate click
                  if (typeof window !== 'undefined' && window.gtag) {
                    window.gtag('event', 'affiliate_link_click', {
                      banner_brand: banner.brand,
                      brand: banner.brand,
                      type: Array.isArray(banner.types) ? banner.types.join(',') : banner.type,
                      location: 'sponsor_bar'
                    });
                  }
                }}
              >
                <div className="relative h-8 w-24 bg-card rounded-sm overflow-hidden flex items-center justify-center">
                  <span className="text-xs font-medium text-center">{banner.brand}</span>
                </div>
              </Link>
            ))}
            
            {/* Duplicate partners for infinite scrolling effect */}
            {autoScroll && partners.map((banner, index) => (
              <Link 
                href={banner.link}
                key={`${banner.brand}-${index}-clone`}
                target="_blank"
                rel="nofollow noopener"
                className="hover-neon-effect flex-shrink-0"
                aria-label={`Visit ${banner.brand}'s website`}
                onClick={() => {
                  // Track affiliate click
                  if (typeof window !== 'undefined' && window.gtag) {
                    window.gtag('event', 'affiliate_link_click', {
                      banner_brand: banner.brand,
                      brand: banner.brand,
                      type: Array.isArray(banner.types) ? banner.types.join(',') : banner.type,
                      location: 'sponsor_bar'
                    });
                  }
                }}
              >
                <div className="relative h-8 w-24 bg-card rounded-sm overflow-hidden flex items-center justify-center">
                  <span className="text-xs font-medium text-center">{banner.brand}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SponsorBar;
