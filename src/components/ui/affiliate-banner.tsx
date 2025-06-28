"use client"

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

interface AffiliateBannerProps {
  src: string
  mobileSrc?: string
  alt: string
  href: string
  className?: string
  size?: 'small' | 'medium' | 'large'
}

export default function AffiliateBanner({
  src,
  mobileSrc,
  alt,
  href,
  className,
  size = 'medium'
}: AffiliateBannerProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "affiliate-banner hover-lift",
        size === 'small' && "max-h-[120px]",
        size === 'medium' && "max-h-[200px]",
        size === 'large' && "max-h-[300px]",
        className
      )}
    >
      <Link href={href} target="_blank" rel="sponsored noopener" aria-label={alt}>
        {/* Desktop image */}
        <div className="hidden md:block relative w-full h-full">
          <Image
            src={src}
            alt={alt}
            width={1200}
            height={mobileSrc ? 200 : 300}
            className="w-full object-cover"
          />
        </div>
        
        {/* Mobile image */}
        {mobileSrc ? (
          <div className="md:hidden relative w-full h-full">
            <Image
              src={mobileSrc}
              alt={alt}
              width={400}
              height={150}
              className="w-full object-cover"
            />
          </div>
        ) : (
          <div className="md:hidden relative w-full h-full">
            <Image
              src={src}
              alt={alt}
              width={400}
              height={150}
              className="w-full object-cover"
            />
          </div>
        )}
      </Link>

      {/* Affiliate disclosure */}
      <div className="mt-1">
        <p className="affiliate-disclosure">Advertisement - This content contains affiliate links</p>
      </div>
    </motion.div>
  )
}
