"use client"

import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { Play } from 'lucide-react'
import { motion } from 'framer-motion'

// Mock data - would be replaced with actual video content
const featuredVideos = [
  {
    id: '1',
    title: 'Top 10 Synth VSTs for EDM Production in 2025',
    thumbnail: '/img/videos/synth-vst-thumbnail.jpg',
    videoId: 'abc123', // YouTube ID
    duration: '18:42',
    source: 'youtube'
  },
  {
    id: '2',
    title: 'How to Master Your Tracks Like a Pro - Plugin Walkthrough',
    thumbnail: '/img/videos/mastering-thumbnail.jpg',
    videoId: 'def456', // YouTube ID
    duration: '24:15',
    source: 'youtube'
  },
  {
    id: '3',
    title: 'FabFilter Pro-Q 3 Complete Tutorial - Mix Like a Pro',
    thumbnail: '/img/videos/fabfilter-thumbnail.jpg',
    videoId: 'ghi789', // YouTube ID
    duration: '32:08',
    source: 'youtube'
  }
]

export default function VideoSpotlight() {
  const [activeVideo, setActiveVideo] = useState(featuredVideos[0])
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2
  })

  return (
    <section ref={ref} className="py-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold">Video Spotlight</h2>
          <p className="text-muted-foreground mt-1">Watch our latest tutorials and reviews</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
            {/* This would be an embedded YouTube iframe in production */}
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src={activeVideo.thumbnail} 
                alt={activeVideo.title}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="absolute flex flex-col items-center">
                <button 
                  className="bg-primary rounded-full p-5 mb-4 hover:bg-primary/90 transition-colors"
                  aria-label="Play video"
                >
                  <Play className="h-8 w-8 fill-current text-primary-foreground" />
                </button>
                <h3 className="text-xl font-bold text-center px-4">
                  {activeVideo.title}
                </h3>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="font-semibold text-lg">More Videos</h3>
          
          <div className="space-y-4">
            {featuredVideos.map((video) => (
              <div 
                key={video.id}
                onClick={() => setActiveVideo(video)}
                className={`flex gap-3 rounded-md p-2 cursor-pointer hover:bg-accent transition-colors ${video.id === activeVideo.id ? 'bg-accent' : ''}`}
              >
                <div className="relative w-20 h-20 flex-shrink-0 rounded overflow-hidden">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute bottom-1 right-1 bg-black/80 text-xs px-1 rounded">
                    {video.duration}
                  </div>
                </div>
                
                <div className="flex-1">
                  <h4 className="text-sm font-medium line-clamp-2">{video.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">TopVSTs</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="pt-2">
            <a 
              href="https://www.youtube.com" 
              target="_blank" 
              rel="noreferrer"
              className="text-primary text-sm font-medium hover:underline"
            >
              Visit our YouTube channel
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
