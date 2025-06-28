import * as React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Star } from 'lucide-react'
import { formatPrice, parseRating } from '../../lib/utils'
import { Button } from '../../components/ui/button'
import AffiliateBanner from '../../components/ui/affiliate-banner'

export const metadata: Metadata = {
  title: 'Plugin Reviews | TopVSTs',
  description: 'In-depth reviews of the best music production plugins, virtual instruments, and audio effects. Find detailed analysis, ratings, and comparisons.',
}

// Mock data for the reviews page - in a real app, this would come from a database or API
const reviews = [
  {
    id: '1',
    title: 'Xfer Records Serum - The Ultimate Wavetable Synthesizer',
    slug: 'xfer-records-serum',
    excerpt: 'A powerful wavetable synthesizer that has become an industry standard for electronic music production.',
    rating: 4.9,
    price: 189,
    salePrice: 129,
    brand: 'Xfer Records',
    category: 'Synthesizer',
    heroImage: '/img/plugins/serum-hero.jpg',
    reviewedBy: 'Alex Johnson',
    reviewDate: '2022-06-15',
  },
  {
    id: '2',
    title: 'Native Instruments Massive X - Next Generation Synth',
    slug: 'native-instruments-massive-x',
    excerpt: 'The long-awaited sequel to the legendary Massive synth brings powerful new features and an enhanced sound engine.',
    rating: 4.7,
    price: 199,
    brand: 'Native Instruments',
    category: 'Synthesizer',
    heroImage: '/img/plugins/massive-x.jpg',
    reviewedBy: 'Emily Chen',
    reviewDate: '2022-05-10',
  },
  {
    id: '3',
    title: 'FabFilter Pro-Q 3 - Professional Equalizer',
    slug: 'fabfilter-pro-q-3',
    excerpt: 'The industry-standard EQ plugin with unmatched sound quality and an intuitive interface.',
    rating: 4.9,
    price: 179,
    brand: 'FabFilter',
    category: 'Equalizer',
    heroImage: '/img/plugins/pro-q-3.jpg',
    reviewedBy: 'Michael Brown',
    reviewDate: '2022-04-22',
  },
  {
    id: '4',
    title: 'Arturia Pigments 4 - Advanced Spectral Synth',
    slug: 'arturia-pigments-4',
    excerpt: 'A versatile software synthesizer that combines multiple synthesis engines with powerful modulation capabilities.',
    rating: 4.6,
    price: 199,
    salePrice: 149,
    brand: 'Arturia',
    category: 'Synthesizer',
    heroImage: '/img/plugins/pigments.jpg',
    reviewedBy: 'Sarah Wilson',
    reviewDate: '2022-03-15',
  },
  {
    id: '5',
    title: 'Valhalla VintageVerb - Classic Reverb Effects',
    slug: 'valhalla-vintageverb',
    excerpt: 'A reverb plugin that captures the sound of classic hardware units from the 70s, 80s, and beyond.',
    rating: 4.8,
    price: 50,
    brand: 'Valhalla DSP',
    category: 'Reverb',
    heroImage: '/img/plugins/vintageverb.jpg',
    reviewedBy: 'David Lee',
    reviewDate: '2022-02-28',
  },
  {
    id: '6',
    title: 'iZotope Ozone 11 - Mastering Suite',
    slug: 'izotope-ozone-11',
    excerpt: 'A complete mastering suite that combines essential mastering tools with intelligent assistance.',
    rating: 4.8,
    price: 299,
    salePrice: 199,
    brand: 'iZotope',
    category: 'Mastering',
    heroImage: '/img/plugins/ozone.jpg',
    reviewedBy: 'Jennifer Garcia',
    reviewDate: '2022-01-20',
  },
  {
    id: '7',
    title: 'Vital - Free Spectral Warping Wavetable Synth',
    slug: 'vital-synth',
    excerpt: 'A spectral warping wavetable synthesizer with a visual and modular workflow, available in free and premium versions.',
    rating: 4.8,
    price: 80,
    brand: 'Vital Audio',
    category: 'Synthesizer',
    heroImage: '/img/plugins/vital.jpg',
    reviewedBy: 'Chris Martin',
    reviewDate: '2021-12-15',
  },
  {
    id: '8',
    title: 'Soundtoys 5 - Creative Effects Bundle',
    slug: 'soundtoys-5',
    excerpt: 'A collection of creative audio effects that bring analog warmth and character to digital productions.',
    rating: 4.7,
    price: 499,
    salePrice: 299,
    brand: 'Soundtoys',
    category: 'Effects Bundle',
    heroImage: '/img/plugins/soundtoys.jpg',
    reviewedBy: 'Lisa Thompson',
    reviewDate: '2021-11-10',
  }
]

// Filter options
const categories = Array.from(new Set(reviews.map(review => review.category)))
const brands = Array.from(new Set(reviews.map(review => review.brand)))

export default function ReviewsPage() {
  return (
    <div className="container pt-20 pb-8">

      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Plugin Reviews</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Discover in-depth, unbiased reviews of the best music production plugins. Our expert team tests each product thoroughly to help you make informed decisions.
        </p>
      </div>

      {/* Featured Banner */}
      <div className="mb-10">
        <AffiliateBanner
          src="/img/banners/reviews-featured.jpg"
          mobileSrc="/img/banners/reviews-featured-mobile.jpg"
          alt="Featured Plugin Deal"
          href="https://example.com/featured-deal"
          size="large"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="font-bold text-lg mb-4">Filter Reviews</h2>
            
            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="font-medium text-base mb-2">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center">
                    <input 
                      type="checkbox" 
                      id={`category-${category}`} 
                      className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                    />
                    <label htmlFor={`category-${category}`} className="ml-2 text-sm">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Brand Filter */}
            <div className="mb-6">
              <h3 className="font-medium text-base mb-2">Brands</h3>
              <div className="space-y-2">
                {brands.map((brand) => (
                  <div key={brand} className="flex items-center">
                    <input 
                      type="checkbox" 
                      id={`brand-${brand}`}
                      className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                    />
                    <label htmlFor={`brand-${brand}`} className="ml-2 text-sm">
                      {brand}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Price Filter */}
            <div className="mb-6">
              <h3 className="font-medium text-base mb-2">Price Range</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="price-free" 
                    className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                  />
                  <label htmlFor="price-free" className="ml-2 text-sm">Free</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="price-under-50" 
                    className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                  />
                  <label htmlFor="price-under-50" className="ml-2 text-sm">Under $50</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="price-50-100" 
                    className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                  />
                  <label htmlFor="price-50-100" className="ml-2 text-sm">$50 - $100</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="price-100-200" 
                    className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                  />
                  <label htmlFor="price-100-200" className="ml-2 text-sm">$100 - $200</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="price-over-200" 
                    className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                  />
                  <label htmlFor="price-over-200" className="ml-2 text-sm">Over $200</label>
                </div>
              </div>
            </div>
            
            {/* Rating Filter */}
            <div className="mb-6">
              <h3 className="font-medium text-base mb-2">Minimum Rating</h3>
              <div className="space-y-2">
                {[4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center">
                    <input 
                      type="radio" 
                      name="rating" 
                      id={`rating-${rating}`} 
                      className="h-4 w-4 rounded-full border-border text-primary focus:ring-primary"
                    />
                    <label htmlFor={`rating-${rating}`} className="ml-2 text-sm flex items-center">
                      {rating}+ 
                      <Star className="h-3 w-3 ml-1 text-neon-yellow fill-neon-yellow" />
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <Button variant="outline" className="w-full">
              Apply Filters
            </Button>
          </div>
          
          {/* Sidebar Banners */}
          <div className="space-y-4">
            <AffiliateBanner
              src="/img/banners/sidebar-1.jpg"
              alt="Special Offer"
              href="https://example.com/affiliate-sidebar-1"
              size="small"
            />
            
            <AffiliateBanner
              src="/img/banners/sidebar-2.jpg"
              alt="Limited Time Deal"
              href="https://example.com/affiliate-sidebar-2"
              size="small"
            />
          </div>
        </div>
        
        {/* Reviews List */}
        <div className="lg:col-span-3">
          {/* Sorting Controls */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-medium">{reviews.length}</span> reviews
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-sm">Sort by:</label>
              <select 
                id="sort"
                className="text-sm py-1 px-2 rounded border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="highest">Highest Rated</option>
                <option value="lowest">Lowest Rated</option>
                <option value="price-high">Price: High to Low</option>
                <option value="price-low">Price: Low to High</option>
              </select>
            </div>
          </div>
          
          {/* Reviews Grid */}
          <div className="space-y-8">
            {reviews.map((review) => {
              const stars = parseRating(review.rating)
              const isOnSale = review.salePrice && review.salePrice < review.price
              
              return (
                <div 
                  key={review.id}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-card border border-border rounded-lg p-4 md:p-6 hover-lift transition-all"
                >
                  {/* Image */}
                  <Link href={`/reviews/${review.slug}`} className="block relative aspect-video md:aspect-square rounded-md overflow-hidden">
                    <Image
                      src={review.heroImage}
                      alt={review.title}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                    />
                  </Link>
                  
                  {/* Content */}
                  <div className="md:col-span-2 flex flex-col">
                    {/* Title & Meta */}
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium bg-muted px-2 py-0.5 rounded">
                          {review.category}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {review.brand}
                        </span>
                      </div>
                      
                      <Link href={`/reviews/${review.slug}`}>
                        <h2 className="text-xl font-bold mb-2 hover:text-primary transition-colors">
                          {review.title}
                        </h2>
                      </Link>
                      
                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="stars-container">
                          {stars.map((star, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${
                                star === 'full' ? 'text-neon-yellow fill-neon-yellow' : 
                                star === 'half' ? 'text-neon-yellow fill-neon-yellow/50' : 
                                'text-muted-foreground'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-medium">{review.rating.toFixed(1)}/5.0</span>
                      </div>
                      
                      {/* Excerpt */}
                      <p className="text-sm text-muted-foreground mb-4">
                        {review.excerpt}
                      </p>
                    </div>
                    
                    {/* Bottom Section */}
                    <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">
                          Reviewed by {review.reviewedBy} on {new Date(review.reviewDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                        
                        {/* Price */}
                        <div className="flex items-center gap-2">
                          {isOnSale ? (
                            <>
                              <span className="text-lg font-bold">{formatPrice(review.salePrice)}</span>
                              <span className="text-sm line-through text-muted-foreground">{formatPrice(review.price)}</span>
                              <span className="bg-destructive text-destructive-foreground text-xs px-1.5 py-0.5 rounded">
                                SALE
                              </span>
                            </>
                          ) : (
                            <span className="text-lg font-bold">{formatPrice(review.price)}</span>
                          )}
                        </div>
                      </div>
                      
                      <Link href={`/reviews/${review.slug}`}>
                        <Button>Read Review</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          
          {/* Pagination */}
          <div className="flex justify-center mt-10">
            <nav className="flex items-center gap-1">
              <Button variant="outline" size="sm" disabled className="h-8 w-8 p-0 flex items-center justify-center">
                &lt;
              </Button>
              
              <Button variant="outline" size="sm" className="h-8 w-8 p-0 flex items-center justify-center bg-primary text-primary-foreground">
                1
              </Button>
              
              <Button variant="outline" size="sm" className="h-8 w-8 p-0 flex items-center justify-center">
                2
              </Button>
              
              <Button variant="outline" size="sm" className="h-8 w-8 p-0 flex items-center justify-center">
                3
              </Button>
              
              <span className="mx-1">...</span>
              
              <Button variant="outline" size="sm" className="h-8 w-8 p-0 flex items-center justify-center">
                8
              </Button>
              
              <Button variant="outline" size="sm" className="h-8 w-8 p-0 flex items-center justify-center">
                &gt;
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}
