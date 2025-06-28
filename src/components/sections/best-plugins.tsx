"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import PluginCard from '@/components/ui/plugin-card'

const categories = [
  'All', 'Synths', 'Effects', 'Mixing', 'Mastering', 'Instruments'
]

// Mock data - would be fetched from API/database in real implementation
const pluginsData = [
  {
    id: '1',
    title: 'Serum - Advanced Wavetable Synthesizer',
    image: '/img/plugins/serum.jpg',
    price: 189,
    rating: 4.9,
    category: 'Synths',
    brand: 'Xfer Records',
    affiliateUrl: 'https://example.com/serum-affiliate',
    slug: 'xfer-records-serum',
  },
  {
    id: '2',
    title: 'FabFilter Pro-Q 3 - Professional EQ Plugin',
    image: '/img/plugins/pro-q3.jpg',
    price: 179,
    rating: 5.0,
    category: 'Mixing',
    brand: 'FabFilter',
    affiliateUrl: 'https://example.com/fabfilter-proq3-affiliate',
    slug: 'fabfilter-pro-q3',
  },
  {
    id: '3',
    title: 'Native Instruments Komplete 14',
    image: '/img/plugins/komplete.jpg',
    price: 599,
    rating: 4.8,
    category: 'Instruments',
    brand: 'Native Instruments',
    affiliateUrl: 'https://example.com/ni-komplete-affiliate',
    slug: 'ni-komplete-14'
  },
  {
    id: '4',
    title: 'Soundtoys 5 Effects Bundle',
    image: '/img/plugins/soundtoys.jpg',
    price: 499,
    rating: 4.9,
    category: 'Effects',
    brand: 'Soundtoys',
    affiliateUrl: 'https://example.com/soundtoys-affiliate',
    slug: 'soundtoys-5'
  },
  {
    id: '5',
    title: 'iZotope Ozone 10 Advanced',
    image: '/img/plugins/ozone.jpg',
    price: 499,
    rating: 4.9,
    category: 'Mastering',
    brand: 'iZotope',
    affiliateUrl: 'https://example.com/izotope-affiliate',
    slug: 'izotope-ozone-10'
  },
  {
    id: '6',
    title: 'Spectrasonics Omnisphere 2.8',
    image: '/img/plugins/omnisphere.jpg',
    price: 499,
    rating: 4.8,
    category: 'Synths',
    brand: 'Spectrasonics',
    affiliateUrl: 'https://example.com/omnisphere-affiliate',
    slug: 'spectrasonics-omnisphere'
  },
  {
    id: '7',
    title: 'Valhalla Room Reverb',
    image: '/img/plugins/valhalla.jpg',
    price: 50,
    rating: 4.7,
    category: 'Effects',
    brand: 'Valhalla DSP',
    affiliateUrl: 'https://example.com/valhalla-affiliate',
    slug: 'valhalla-room'
  },
  {
    id: '8',
    title: 'UAD SSL G Bus Compressor',
    image: '/img/plugins/ssl-comp.jpg',
    price: 299,
    rating: 4.9,
    category: 'Mixing',
    brand: 'Universal Audio',
    affiliateUrl: 'https://example.com/uad-ssl-affiliate',
    slug: 'uad-ssl-bus-compressor'
  }
]

export default function BestPlugins() {
  const [activeCategory, setActiveCategory] = useState('All')
  
  const filteredPlugins = activeCategory === 'All' 
    ? pluginsData 
    : pluginsData.filter(plugin => plugin.category === activeCategory)
  
  return (
    <section>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold">Best Plugins</h2>
          <p className="text-muted-foreground mt-1">Editor-selected top plugins for every need</p>
        </div>
        
        <div className="flex items-center overflow-x-auto pb-2 md:pb-0 gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPlugins.map((plugin, index) => (
          <motion.div
            key={plugin.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <PluginCard {...plugin} size="small" />
          </motion.div>
        ))}
      </div>
      
      <div className="flex justify-center mt-8">
        <Button variant="outline" href="/reviews">
          View All Plugins
        </Button>
      </div>
    </section>
  )
}
