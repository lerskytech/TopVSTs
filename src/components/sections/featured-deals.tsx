"use client";

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

// Import banner data using relative path
import { getFeaturedBanners, getBannersByType } from '../../data/banners';

interface FeaturedDealsProps {
  maxItems?: number;
}

const FeaturedDeals = ({ maxItems = 4 }: FeaturedDealsProps) => {
  // Get subset of featured banners
  const featuredBanners = React.useMemo(() => {
    // First try to get specifically featured banners
    const featured = getFeaturedBanners();
    // If not enough, supplement with featured type banners
    if (featured.length < maxItems) {
      const additional = getBannersByType('featured')
        .filter(banner => !featured.some(f => f.id === banner.id));
      return [...featured, ...additional].slice(0, maxItems);
    }
    return featured.slice(0, maxItems);
  }, [maxItems]);

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold">Featured <span className="text-primary">Deals</span></h2>
        <Link 
          href="/deals" 
          className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors group"
        >
          View all deals
          <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredBanners.map((banner) => (
          <motion.div
            key={banner.id}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link 
              href={banner.link}
              target="_blank"
              rel="nofollow noopener"
              className="block h-full"
              onClick={() => {
                // Track click if analytics available
                if (window.gtag) {
                  window.gtag('event', 'affiliate_link_click', {
                    banner_id: banner.id,
                    brand: banner.brand,
                    type: banner.types.join(','), 
                    location: 'featured_deals'
                  });
                }
              }}
            >
              <div className="h-full border border-border hover:border-primary rounded-lg overflow-hidden flex flex-col bg-card transition-all hover-neon-effect">
                <div className="relative bg-muted/50 h-40 w-full overflow-hidden">
                  <picture>
                    <source media="(max-width: 768px)" srcSet={banner.mobileSrc} />
                    <img
                      src={banner.src}
                      alt={banner.alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </picture>
                </div>
                
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-bold mb-2 line-clamp-1">{banner.brand}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
                    {banner.description || `Exclusive deals from ${banner.brand}`}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-md">
                      {banner.priority > 8 ? 'Hot Deal' : 'Special Offer'}
                    </span>
                    <span className="text-xs font-medium hover:text-primary transition-colors">
                      Get Deal →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedDeals;
