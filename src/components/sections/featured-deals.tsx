"use client";

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

// Import sponsor data using relative path
import sponsors from '../../data/sponsors';

interface FeaturedDealsProps {
  maxItems?: number;
}

const FeaturedDeals = ({ maxItems = 4 }: FeaturedDealsProps) => {
  // Get subset of featured sponsors
  const featuredSponsors = React.useMemo(() => {
    return sponsors
      .filter(sponsor => sponsor.featured)
      .slice(0, maxItems);
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
        {featuredSponsors.map((sponsor) => (
          <motion.div
            key={sponsor.id}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link 
              href={sponsor.affiliateLink}
              target="_blank"
              rel="nofollow noopener"
              className="block h-full"
            >
              <div className="h-full border border-border hover:border-primary rounded-lg overflow-hidden flex flex-col bg-card transition-all hover-neon-effect">
                <div className="relative bg-muted/50 h-40 w-full overflow-hidden">
                  <img
                    src={sponsor.bannerImages.desktop}
                    alt={`${sponsor.name} promotion`}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-bold mb-2 line-clamp-1">{sponsor.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
                    {sponsor.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-md">{sponsor.type}</span>
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
