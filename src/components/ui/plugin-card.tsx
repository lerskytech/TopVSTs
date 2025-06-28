"use client"

import Image from 'next/image'
import Link from 'next/link'
import { Star, ChevronRight, Tag } from 'lucide-react'
import { cn, formatPrice, parseRating } from '@/lib/utils'

interface PluginCardProps {
  id: string
  title: string
  image: string
  price: number
  salePrice?: number
  rating: number
  category: string
  brand: string
  affiliateUrl: string
  slug: string
  featuredTag?: string
  className?: string
  size?: 'small' | 'medium' | 'large'
}

export default function PluginCard({
  id,
  title,
  image,
  price,
  salePrice,
  rating,
  category,
  brand,
  affiliateUrl,
  slug,
  featuredTag,
  className,
  size = 'medium'
}: PluginCardProps) {
  const stars = parseRating(rating)
  const isOnSale = salePrice && salePrice < price
  
  return (
    <div 
      className={cn(
        "plugin-card group",
        size === 'small' && "max-w-[280px]",
        size === 'medium' && "max-w-[350px]",
        size === 'large' && "max-w-full",
        className
      )}
    >
      {/* Image container with sale badge */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Category tag */}
        <div className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm text-xs px-2 py-1 rounded-md font-medium">
          {category}
        </div>
        
        {/* Sale badge */}
        {isOnSale && (
          <div className="absolute top-3 right-3 bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded-md font-bold">
            SALE
          </div>
        )}
        
        {/* Featured tag */}
        {featuredTag && (
          <div className="absolute bottom-3 left-3 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-md flex items-center gap-1 font-medium">
            <Tag size={12} />
            {featuredTag}
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm text-muted-foreground">{brand}</span>
          
          {/* Rating */}
          <div className="flex items-center">
            <div className="stars-container mr-1">
              {stars.map((star, i) => (
                <Star 
                  key={i} 
                  className={cn(
                    "h-3 w-3",
                    star === 'full' && "text-neon-yellow fill-neon-yellow",
                    star === 'half' && "text-neon-yellow fill-neon-yellow/50",
                    star === 'empty' && "text-muted-foreground"
                  )}
                />
              ))}
            </div>
            <span className="text-xs font-medium">{rating.toFixed(1)}</span>
          </div>
        </div>
        
        {/* Title */}
        <Link href={`/reviews/${slug}`}>
          <h3 className="font-semibold line-clamp-2 hover:text-primary transition-colors mb-2">
            {title}
          </h3>
        </Link>
        
        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            {isOnSale ? (
              <>
                <span className="text-lg font-bold">{formatPrice(salePrice)}</span>
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(price)}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold">{formatPrice(price)}</span>
            )}
          </div>
          
          <Link 
            href={affiliateUrl}
            target="_blank"
            rel="nofollow noopener"
            className="cta-button cta-neon px-3 py-1.5 text-xs rounded-md flex items-center gap-1"
          >
            View Deal <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
        
        <div className="mt-3 text-xs text-muted-foreground affiliate-disclosure">
          Affiliate link - we may earn a commission
        </div>
      </div>
    </div>
  )
}
