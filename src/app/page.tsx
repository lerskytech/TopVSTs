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
import PartnerShowcase from '../components/sections/partner-showcase'

export const metadata: Metadata = {
  title: 'TopVSTs - Best Music Production Plugins, Samples & Tools',
  description: 'Find the best VST plugins, sample packs, and music production tools for producers, beatmakers, and DJs. Expert reviews, comparisons, and exclusive deals.',
}

export default function Home() {
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

      {/* Partner Showcase */}
      <section className="container">
        <PartnerShowcase />
      </section>
      
      {/* Newsletter */}
      <section className="container bg-muted/30 rounded-lg py-8 px-4 md:p-8">
        <Newsletter />
      </section>
    </div>
  )
}
