"use client"

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'

export default function Hero() {
  const parallaxRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current) return
      const scrollY = window.scrollY
      parallaxRef.current.style.transform = `translateY(${scrollY * 0.5}px)`
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative h-[85vh] min-h-[600px] max-h-[900px] w-full overflow-hidden">
      {/* Parallax Background */}
      <div ref={parallaxRef} className="absolute inset-0 z-0">
        <Image
          src="/img/hero-bg.jpg"
          alt="Music production studio"
          fill
          priority
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background"></div>
      </div>
      
      {/* Content */}
      <div className="container relative z-10 h-full flex flex-col justify-center items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <Image 
            src="/img/logo-large.png"
            alt="TopVSTs Logo"
            width={280}
            height={120}
            className="mx-auto"
            priority
          />
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 max-w-4xl"
        >
          Find the <span className="neon-text-blue">Perfect Tools</span> for Your Music Production
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl"
        >
          Expert reviews, comparisons, and deals on the best VST plugins, samples, and production tools
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button size="lg" className="px-8">
            Latest Deals
          </Button>
          <Button size="lg" variant="outline" className="gap-2">
            <Search className="h-4 w-4" />
            Find Plugins
          </Button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 flex items-center justify-center gap-6 flex-wrap"
        >
          {['Unison', 'ADSR', 'Loopmasters', 'Waves', 'Plugin Boutique', 'Splice'].map((brand) => (
            <div 
              key={brand} 
              className="text-sm text-muted-foreground font-medium px-4 py-1 rounded-full bg-background/50 backdrop-blur-sm"
            >
              {brand}
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
    </div>
  )
}
