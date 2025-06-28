import * as React from 'react'
import { Metadata } from 'next'
import Hero from '../components/sections/hero'
import TopDeals from '../components/sections/top-deals'
import BestPlugins from '../components/sections/best-plugins'
import VideoSpotlight from '../components/sections/video-spotlight'
import TrustSection from '../components/sections/trust-section'
import Newsletter from '../components/sections/newsletter'
import FeaturedDeals from '../components/sections/featured-deals'
import BannerManager from '../components/banners/banner-manager'

// Import sponsors data
import { getFeaturedSponsors } from '../data/sponsors'

export const metadata: Metadata = {
  title: 'TopVSTs - Best Music Production Plugins, Samples & Tools',
  description: 'Find the best VST plugins, sample packs, and music production tools for producers, beatmakers, and DJs. Expert reviews, comparisons, and exclusive deals.',
}

export default function Home() {
  const featuredSponsors = getFeaturedSponsors()
  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <Hero />

      {/* Top Deals Today */}
      <section className="container">
        <TopDeals />
      </section>
      
      {/* Featured Deals - Using BannerManager */}
      <section className="container">
        <BannerManager showFeatured={true} />
      </section>

      {/* Hero Banner Carousel */}
      <section className="container">
        <BannerManager showHero={true} />
      </section>

      {/* Best Plugins Grid */}
      <section className="container">
        <BestPlugins />
      </section>

      {/* Video Spotlight */}
      <section className="container">
        <VideoSpotlight />
      </section>

      {/* Trust & Social Section */}
      <section className="container">
        <TrustSection />
      </section>

      {/* Sponsor Showcase */}
      <section className="container">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">Our Trusted Partners</h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8">
            We partner with the best in music production to bring you exclusive deals and recommendations
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {featuredSponsors.map((sponsor) => (
              <a 
                href={sponsor.affiliateLink}
                key={sponsor.id}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="group flex flex-col items-center p-4 bg-card hover:bg-accent rounded-lg transition-all duration-300 border border-border hover:border-primary hover-neon-effect"
              >
                <div className="w-full h-12 flex items-center justify-center mb-3">
                  {/* Text placeholder until actual logos are added */}
                  <span className="font-medium text-lg group-hover:text-primary transition-colors">
                    {sponsor.name}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground text-center line-clamp-2">
                  {sponsor.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="container bg-muted/30 rounded-lg py-8 px-4 md:p-8">
        <Newsletter />
      </section>
    </div>
  )
}
