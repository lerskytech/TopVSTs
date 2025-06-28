"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import PluginCard from '@/components/ui/plugin-card'

// Mock data - would be fetched from API/database in real implementation
const dealsData = [
  {
    id: '1',
    title: 'Serum - Advanced Wavetable Synthesizer',
    image: '/img/plugins/serum.jpg',
    price: 189,
    salePrice: 129,
    rating: 4.9,
    category: 'Synth',
    brand: 'Xfer Records',
    affiliateUrl: 'https://example.com/serum-affiliate',
    slug: 'xfer-records-serum',
    featuredTag: 'Best Seller'
  },
  {
    id: '2',
    title: 'FabFilter Pro-Q 3 - Professional EQ Plugin',
    image: '/img/plugins/pro-q3.jpg',
    price: 179,
    salePrice: 149,
    rating: 5.0,
    category: 'EQ',
    brand: 'FabFilter',
    affiliateUrl: 'https://example.com/fabfilter-proq3-affiliate',
    slug: 'fabfilter-pro-q3',
    featuredTag: 'Top Rated'
  },
  {
    id: '3',
    title: 'Native Instruments Komplete 14',
    image: '/img/plugins/komplete.jpg',
    price: 599,
    salePrice: 299,
    rating: 4.8,
    category: 'Bundle',
    brand: 'Native Instruments',
    affiliateUrl: 'https://example.com/ni-komplete-affiliate',
    slug: 'ni-komplete-14'
  },
  {
    id: '4',
    title: 'Waves SSL E-Channel Strip',
    image: '/img/plugins/ssl-channel.jpg',
    price: 249,
    salePrice: 39.99,
    rating: 4.7,
    category: 'Channel Strip',
    brand: 'Waves',
    affiliateUrl: 'https://example.com/waves-ssl-affiliate',
    slug: 'waves-ssl-channel',
    featuredTag: 'Hot Deal'
  },
  {
    id: '5',
    title: 'Arturia Pigments 4',
    image: '/img/plugins/pigments.jpg',
    price: 199,
    salePrice: 99,
    rating: 4.6,
    category: 'Synth',
    brand: 'Arturia',
    affiliateUrl: 'https://example.com/arturia-pigments-affiliate',
    slug: 'arturia-pigments-4'
  },
  {
    id: '6',
    title: 'iZotope Ozone 10 Advanced',
    image: '/img/plugins/ozone.jpg',
    price: 499,
    salePrice: 249,
    rating: 4.9,
    category: 'Mastering',
    brand: 'iZotope',
    affiliateUrl: 'https://example.com/izotope-ozone-affiliate',
    slug: 'izotope-ozone-10'
  }
]

export default function TopDeals() {
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 3
  const totalPages = Math.ceil(dealsData.length / itemsPerPage)
  
  const nextPage = () => {
    setCurrentPage(prev => (prev + 1) % totalPages)
  }
  
  const prevPage = () => {
    setCurrentPage(prev => (prev - 1 + totalPages) % totalPages)
  }
  
  const visibleDeals = dealsData.slice(
    currentPage * itemsPerPage, 
    (currentPage + 1) * itemsPerPage
  )
  
  return (
    <section>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold">Top Deals Today</h2>
          <p className="text-muted-foreground mt-1">Limited-time offers on premium plugins</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={prevPage}
            disabled={currentPage === 0 && totalPages > 1}
            className="h-9 w-9"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <span className="text-sm">
            {currentPage + 1} / {totalPages}
          </span>
          
          <Button
            variant="outline"
            size="icon"
            onClick={nextPage}
            disabled={currentPage === totalPages - 1}
            className="h-9 w-9"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          
          <Button variant="link" href="/deals" className="ml-2">
            View All Deals
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleDeals.map((deal, index) => (
          <motion.div
            key={deal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <PluginCard {...deal} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
