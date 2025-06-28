"use client"

import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ScoreProps {
  name: string
  value: number
  index: number
}

function ScoreBar({ name, value, index }: ScoreProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-neon-green'
    if (score >= 80) return 'bg-neon-blue'
    if (score >= 70) return 'bg-neon-yellow'
    if (score >= 60) return 'bg-neon-purple'
    return 'bg-neon-pink'
  }
  
  return (
    <div ref={ref} className="mb-3">
      <div className="flex justify-between text-sm mb-1">
        <span>{name}</span>
        <span className="font-semibold">{value}/100</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className={cn("h-full rounded-full", getScoreColor(value))}
          initial={{ width: 0 }}
          animate={inView ? { width: `${value}%` } : { width: 0 }}
          transition={{ duration: 0.8, delay: index * 0.1 }}
        ></motion.div>
      </div>
    </div>
  )
}

interface ReviewScoresProps {
  scores: {
    sound: number
    features: number
    usability: number
    value: number
    overall: number
  }
  className?: string
}

export default function ReviewScores({ scores, className }: ReviewScoresProps) {
  const scoreItems = [
    { name: 'Sound Quality', value: scores.sound },
    { name: 'Features', value: scores.features },
    { name: 'Usability', value: scores.usability },
    { name: 'Value', value: scores.value },
  ]
  
  return (
    <div className={cn("bg-card border border-border rounded-lg p-6", className)}>
      <h2 className="text-2xl font-bold mb-6">Review Scores</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {scoreItems.map((item, index) => (
            <ScoreBar 
              key={item.name}
              name={item.name}
              value={item.value}
              index={index}
            />
          ))}
        </div>
        
        <div className="flex flex-col items-center justify-center bg-muted/30 rounded-lg p-6">
          <div className="text-5xl font-bold mb-2 neon-text-blue">
            {scores.overall}
          </div>
          <div className="text-lg font-medium">Overall Score</div>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Based on our comprehensive testing and evaluation process
          </div>
        </div>
      </div>
    </div>
  )
}
