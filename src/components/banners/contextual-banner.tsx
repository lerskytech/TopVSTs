"use client"

import * as React from 'react';
import { motion } from 'framer-motion';
import AffiliateBanner from '../ui/affiliate-banner';

interface ContextualBannerProps {
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
  className?: string;
  title?: string;
}

/**
 * Contextual Banner displays targeted affiliate banners based on the content context
 * For example, showing a Native Instruments banner on a Kontakt review page
 */
export default function ContextualBanner({
  banners,
  className = '',
  title = 'Special Offers',
}: ContextualBannerProps) {
  if (!banners || banners.length === 0) {
    return null;
  }

  return (
    <div className={`py-4 ${className}`}>
      {title && (
        <h3 className="text-xl font-medium mb-4">{title}</h3>
      )}
      
      <div className="flex flex-col gap-4">
        {banners.map((banner, index) => (
          <motion.div
            key={`${banner.brand}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <AffiliateBanner
              src={banner.image}
              mobileSrc={banner.mobileSrc}
              alt={banner.alt}
              href={banner.link}
              size="medium"
              className="w-full"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
