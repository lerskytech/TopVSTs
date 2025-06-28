"use client";

import * as React from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Import sponsors using relative path
import sponsors from '../../data/sponsors';

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
  // Clone the sponsors for the infinite scroll effect
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
            {sponsors.map((sponsor) => (
              <Link 
                href={sponsor.affiliateLink}
                key={sponsor.id}
                target="_blank"
                rel="nofollow noopener"
                className="hover-neon-effect flex-shrink-0"
                aria-label={`Visit ${sponsor.name}'s website`}
              >
                <div className="relative h-8 w-24 bg-card rounded-sm overflow-hidden flex items-center justify-center">
                  <img 
                    src={sponsor.logo}
                    alt={`${sponsor.name} logo`}
                    className="h-6 max-w-[90px] object-contain"
                  />
                </div>
              </Link>
            ))}
            
            {/* Duplicate logos for infinite scrolling effect */}
            {autoScroll && sponsors.map((sponsor) => (
              <Link 
                href={sponsor.affiliateLink}
                key={`${sponsor.id}-clone`}
                target="_blank"
                rel="nofollow noopener"
                className="hover-neon-effect flex-shrink-0"
                aria-label={`Visit ${sponsor.name}'s website`}
              >
                <div className="relative h-8 w-24 bg-card rounded-sm overflow-hidden flex items-center justify-center">
                  <img 
                    src={sponsor.logo}
                    alt={`${sponsor.name} logo`}
                    className="h-6 max-w-[90px] object-contain"
                  />
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
