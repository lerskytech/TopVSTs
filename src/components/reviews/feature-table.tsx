"use client"

import * as React from 'react'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

interface Feature {
  name: string
  description: string
}

interface FeatureTableProps {
  features: Feature[]
  className?: string
}

export default function FeatureTable({ features, className }: FeatureTableProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  
  return (
    <div ref={ref} className={className}>
      <h2 className="text-2xl font-bold mb-4">Key Features</h2>
      
      <div className="overflow-hidden rounded-lg border border-border">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4 font-medium">Feature</th>
              <th className="text-left p-4 font-medium">Description</th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature, index) => (
              <motion.tr
                key={`feature-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={index % 2 === 0 ? 'bg-card' : 'bg-background'}
              >
                <td className="p-4 border-t border-border font-medium">{feature.name}</td>
                <td className="p-4 border-t border-border">{feature.description}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
