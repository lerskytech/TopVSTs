"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

/**
 * SponsorCard Component
 * 
 * Displays a sponsor's logo, description, and call-to-action button.
 * Designed to be used in the "Featured Partner" or "Our Sponsors" section.
 * 
 * @param {Object} props Component props
 * @param {Object} props.sponsor The sponsor data containing logo, description, and URL
 * @param {string} props.className Additional CSS classes to apply
 */
const SponsorCard = ({ sponsor, className = '' }) => {
  if (!sponsor) {
    return null;
  }

  return (
    <div className={`relative flex flex-col md:flex-row items-center gap-6 p-6 bg-card rounded-lg shadow-md border border-border hover:border-primary transition-all ${className}`}>
      {/* Affiliate Disclosure */}
      <div className="absolute top-2 right-2 text-xs text-muted-foreground">
        Affiliate Partner
      </div>

      {/* Sponsor Logo */}
      <div className="flex-shrink-0 w-40 h-20 flex items-center justify-center">
        <Image
          src={sponsor.logo}
          alt={`${sponsor.name} logo`}
          width={160}
          height={80}
          className="max-h-16 w-auto object-contain"
        />
      </div>

      {/* Content */}
      <div className="flex-grow flex flex-col items-center md:items-start text-center md:text-left">
        <h3 className="text-xl font-bold mb-2">{sponsor.name}</h3>
        <p className="text-muted-foreground mb-4">{sponsor.description}</p>
        
        {/* Call-to-Action Button */}
        <Link 
          href={sponsor.url} 
          target="_blank" 
          rel="noopener noreferrer sponsored"
          className="px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full transition-colors"
          onClick={() => {
            // Track affiliate click
            if (typeof window !== 'undefined' && window.gtag) {
              window.gtag('event', 'affiliate_click', {
                affiliate_brand: sponsor.name,
                affiliate_url: sponsor.url,
                click_type: 'cta_button'
              });
            }
          }}
        >
          Try {sponsor.name}
        </Link>
      </div>
    </div>
  );
};

export default SponsorCard;
