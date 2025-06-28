"use client"

import * as React from 'react'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { cn } from '../../lib/utils'

interface ProsConsTableProps {
  pros: string[]
  cons: string[]
  className?: string
}

export default function ProsConsTable({ pros, cons, className }: ProsConsTableProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  
  return (
    <div ref={ref} className={cn("grid grid-cols-1 md:grid-cols-2 gap-6", className)}>
      {/* Pros */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-neon-green">
          <Check className="h-5 w-5" />
          Pros
        </h3>
        <ul className="space-y-3">
          {pros.map((pro, index) => (
            <motion.li
              key={`pro-${index}`}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-start gap-3"
            >
              <div className="mt-1 h-5 w-5 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center flex-shrink-0">
                <Check className="h-3 w-3" />
              </div>
              <span>{pro}</span>
            </motion.li>
          ))}
        </ul>
      </div>
      
      {/* Cons */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-neon-pink">
          <X className="h-5 w-5" />
          Cons
        </h3>
        <ul className="space-y-3">
          {cons.map((con, index) => (
            <motion.li
              key={`con-${index}`}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-start gap-3"
            >
              <div className="mt-1 h-5 w-5 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center flex-shrink-0">
                <X className="h-3 w-3" />
              </div>
              <span>{con}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  )
}
