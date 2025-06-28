"use client";

import * as React from 'react';
import Link from 'next/link';
import { getFeaturedBanners } from '../../data/banners';

export default function PartnerShowcase() {
  const featuredPartners = getFeaturedBanners();
  
  return (
    <div className="mb-8">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">Our Trusted Partners</h2>
      <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8">
        We partner with the best in music production to bring you exclusive deals and recommendations
      </p>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {featuredPartners.map((banner, index) => (
          <a 
            href={banner.link}
            key={`${banner.brand}-${index}`}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="group flex flex-col items-center p-4 bg-card hover:bg-accent rounded-lg transition-all duration-300 border border-border hover:border-primary hover-neon-effect"
            onClick={() => {
              // Track affiliate click
              if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('event', 'affiliate_link_click', {
                  banner_brand: banner.brand,
                  brand: banner.brand,
                  type: Array.isArray(banner.types) ? banner.types.join(',') : banner.type,
                  location: 'trusted_partners'
                });
              }
            }}
          >
            <div className="w-full h-12 flex items-center justify-center mb-3">
              <span className="font-medium text-lg group-hover:text-primary transition-colors">
                {banner.brand}
              </span>
            </div>
            <p className="text-xs text-muted-foreground text-center line-clamp-2">
              {banner.alt || `Exclusive offers from ${banner.brand}`}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
