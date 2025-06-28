"use client"

import * as React from 'react';
import { motion } from 'framer-motion';
import AffiliateBanner from '../ui/affiliate-banner';

interface FeaturedBannersProps {
  banners: Array<{
    brand: string;
    image: string;
    mobileSrc?: string;
    alt: string;
    link: string;
    type: string;
    priority: number;
    video?: string | null;
  }>;
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function FeaturedBanners({
  banners,
  title = "Featured Deals",
  subtitle = "Special offers from our trusted partners",
  className = '',
}: FeaturedBannersProps) {
  if (!banners || banners.length === 0) {
    return null;
  }

  // Animation variants for staggered grid animation
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className={`py-10 ${className}`}>
      <div className="container">
        {title && (
          <h2 className="text-3xl font-bold mb-2">{title}</h2>
        )}
        {subtitle && (
          <p className="text-muted-foreground mb-8">{subtitle}</p>
        )}
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {banners.map((banner, index) => (
            <motion.div key={`${banner.brand}-${index}`} variants={item}>
              <AffiliateBanner
                src={banner.image}
                mobileSrc={banner.mobileSrc}
                alt={banner.alt}
                href={banner.link}
                size="medium"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
