"use client"

import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Mail, Check } from 'lucide-react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2
  })
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real implementation, you would handle the form submission to your newsletter service
    if (email) {
      setSubmitted(true)
      setEmail('')
      // Reset submitted state after 5 seconds
      setTimeout(() => setSubmitted(false), 5000)
    }
  }

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
    >
      <div>
        <h2 className="text-2xl md:text-3xl font-bold mb-3">
          Never Miss a <span className="neon-text-blue">Plugin Deal</span> Again!
        </h2>
        <p className="text-muted-foreground">
          Subscribe to our newsletter to get the latest deals, exclusive offers, and free VSTs
          delivered directly to your inbox. No spam, just the good stuff.
        </p>
        
        <ul className="mt-6 space-y-2">
          {[
            'Weekly roundup of the best plugin deals',
            'Exclusive discount codes for subscribers',
            'Free plugin alerts and giveaways',
            'Tips and tutorials from industry experts'
          ].map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ duration: 0.3, delay: 0.2 + (i * 0.1) }}
              className="flex items-center gap-3"
            >
              <div className="h-5 w-5 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                <Check className="h-3 w-3" />
              </div>
              <span className="text-sm">{item}</span>
            </motion.li>
          ))}
        </ul>
      </div>
      
      <div className="bg-card rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="text-xl font-semibold">Join 5,000+ producers</h3>
          
          {submitted ? (
            <div className="py-8 flex flex-col items-center justify-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/20 text-primary flex items-center justify-center mb-3">
                <Check className="h-6 w-6" />
              </div>
              <h4 className="font-medium text-lg">Thank you for subscribing!</h4>
              <p className="text-muted-foreground text-sm mt-1">
                Check your inbox to confirm your subscription
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full pl-9 pr-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
              
              <Button type="submit" className="w-full">
                Subscribe to Newsletter
              </Button>
              
              <p className="text-xs text-muted-foreground text-center">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
              </p>
            </>
          )}
        </form>
      </div>
    </motion.div>
  )
}
