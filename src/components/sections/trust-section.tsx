"use client"

import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

// Mock testimonial data
const testimonials = [
  {
    id: '1',
    name: 'Alex Johnson',
    role: 'Professional Producer',
    avatar: '/img/testimonials/avatar-1.jpg',
    content: "TopVSTs has been my go-to resource for finding the best plugins. Their reviews are honest and thorough, and I've discovered some amazing tools that I use in my productions every day.",
    rating: 5
  },
  {
    id: '2',
    name: 'Sarah Williams',
    role: 'Mixing Engineer',
    avatar: '/img/testimonials/avatar-2.jpg',
    content: "The comparison articles have saved me so much time and money. Instead of blindly purchasing plugins, I can make informed decisions based on real-world testing and expert opinions.",
    rating: 5
  },
  {
    id: '3',
    name: 'Mike Chen',
    role: 'EDM Artist',
    avatar: '/img/testimonials/avatar-3.jpg',
    content: "I've found incredible deals through TopVSTs that I wouldn't have known about otherwise. Their deal alerts for sample packs and synths are always on point!",
    rating: 4
  },
]

// Mock producer logos
const producerLogos = [
  '/img/logos/producer-1.png',
  '/img/logos/producer-2.png',
  '/img/logos/producer-3.png',
  '/img/logos/producer-4.png',
  '/img/logos/producer-5.png',
]

export default function TrustSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2
  })

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    )
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    )
  }

  return (
    <section ref={ref} className="py-12 bg-muted/30 rounded-lg">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-bold mb-3">Trusted by the Music Community</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join over 2,000+ music producers, engineers, and artists who use our recommendations to create better music.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Testimonials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card rounded-lg p-6 md:p-8 relative"
          >
            <div className="absolute top-8 left-8 text-muted-foreground/20">
              <Quote className="h-16 w-16" />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star 
                    key={star} 
                    className={`h-4 w-4 ${star <= testimonials[currentTestimonial].rating 
                      ? 'text-neon-yellow fill-neon-yellow' 
                      : 'text-muted-foreground'}`} 
                  />
                ))}
              </div>
              
              <blockquote className="text-lg mb-6">
                "{testimonials[currentTestimonial].content}"
              </blockquote>
              
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonials[currentTestimonial].avatar}
                    alt={testimonials[currentTestimonial].name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium">{testimonials[currentTestimonial].name}</div>
                  <div className="text-sm text-muted-foreground">{testimonials[currentTestimonial].role}</div>
                </div>
              </div>
              
              <div className="flex justify-end gap-2 mt-6">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={prevTestimonial}
                  className="h-8 w-8"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={nextTestimonial}
                  className="h-8 w-8"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
          
          {/* Stats and logos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-card p-4 rounded-lg">
                <div className="text-3xl font-bold mb-1 neon-text-blue">2,000+</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <div className="text-3xl font-bold mb-1 neon-text-green">500+</div>
                <div className="text-sm text-muted-foreground">Plugin Reviews</div>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <div className="text-3xl font-bold mb-1 neon-text-pink">100%</div>
                <div className="text-sm text-muted-foreground">Satisfaction</div>
              </div>
            </div>
            
            {/* Producer Logos */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-4 text-center">
                USED BY PRODUCERS FEATURED ON
              </h3>
              <div className="flex flex-wrap justify-center gap-8">
                {producerLogos.map((logo, index) => (
                  <div key={index} className="relative h-8 w-24 opacity-70 hover:opacity-100 transition-opacity">
                    <Image
                      src={logo}
                      alt="Producer Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
