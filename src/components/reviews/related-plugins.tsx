"use client"

import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Star, ChevronRight } from 'lucide-react'
import { formatPrice, parseRating } from '@/lib/utils'

interface RelatedPlugin {
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
}

interface RelatedPluginsProps {
  plugins: RelatedPlugin[]
}

export default function RelatedPlugins({ plugins }: RelatedPluginsProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  
  return (
    <div ref={ref} className="bg-card border border-border rounded-lg p-6">
      <h3 className="font-bold text-xl mb-4">Related Plugins</h3>
      
      <div className="space-y-4">
        {plugins.map((plugin, index) => {
          const stars = parseRating(plugin.rating)
          const isOnSale = plugin.salePrice && plugin.salePrice < plugin.price
          
          return (
            <motion.div
              key={plugin.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex gap-3 group"
            >
              {/* Plugin Image */}
              <Link 
                href={`/reviews/${plugin.slug}`}
                className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0"
              >
                <Image
                  src={plugin.image}
                  alt={plugin.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </Link>
              
              {/* Plugin Info */}
              <div className="flex-1 min-w-0">
                <Link 
                  href={`/reviews/${plugin.slug}`}
                  className="text-sm font-medium hover:text-primary line-clamp-2 transition-colors"
                >
                  {plugin.title}
                </Link>
                
                <div className="flex items-center mt-1">
                  <div className="stars-container mr-1">
                    {stars.map((star, i) => (
                      <Star 
                        key={i} 
                        className={`h-3 w-3 ${
                          star === 'full' ? 'text-neon-yellow fill-neon-yellow' : 
                          star === 'half' ? 'text-neon-yellow fill-neon-yellow/50' : 
                          'text-muted-foreground'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs">{plugin.rating.toFixed(1)}</span>
                </div>
                
                <div className="flex items-center justify-between mt-1">
                  {/* Price */}
                  <div className="flex items-baseline gap-1">
                    {isOnSale ? (
                      <>
                        <span className="font-bold text-sm">{formatPrice(plugin.salePrice)}</span>
                        <span className="text-xs text-muted-foreground line-through">{formatPrice(plugin.price)}</span>
                      </>
                    ) : (
                      <span className="font-bold text-sm">{formatPrice(plugin.price)}</span>
                    )}
                  </div>
                  
                  {/* Button */}
                  <a
                    href={plugin.affiliateUrl}
                    target="_blank"
                    rel="nofollow noopener"
                    className="text-xs text-primary hover:underline flex items-center"
                  >
                    View <ChevronRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
