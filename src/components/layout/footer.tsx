"use client"

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react'

// Import banner data using relative path
import { getFeaturedBanners } from '../../data/banners'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const featuredPartners = getFeaturedBanners().slice(0, 6) // Limit to 6 partner banners

  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div>
            <Link href="/" className="flex items-center mb-4">
              <span className="relative h-10 w-36">
                <Image
                  src="/img/logo.png"
                  alt="TopVSTs Logo"
                  fill
                  className="object-contain"
                />
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Helping producers find the best tools for music creation since 2023. Honest reviews, useful comparisons, and exclusive deals.
            </p>
            <div className="flex space-x-4">
              <Link href="https://facebook.com" className="text-muted-foreground hover:text-foreground transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="https://twitter.com" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="https://instagram.com" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://youtube.com" className="text-muted-foreground hover:text-foreground transition-colors">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Deals', 'Reviews', 'Comparisons', 'Tutorials', 'Freebies', 'News'].map((item) => (
                <li key={item}>
                  <Link 
                    href={`/${item.toLowerCase()}`} 
                    className="text-muted-foreground hover:text-foreground hover:underline transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {['Synth VSTs', 'Effect Plugins', 'Sample Packs', 'DAWs', 'MIDI Controllers', 'Sound Design', 'Mixing & Mastering'].map((item) => (
                <li key={item}>
                  <Link 
                    href={`/category/${item.toLowerCase().replace(/\s+/g, '-')}`} 
                    className="text-muted-foreground hover:text-foreground hover:underline transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="flex items-center space-x-2 text-muted-foreground mb-3">
              <Mail className="h-5 w-5" />
              <a href="mailto:info@topvsts.com" className="hover:text-foreground hover:underline transition-colors">
                info@topvsts.com
              </a>
            </div>
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Subscribe to our newsletter</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="bg-background text-sm px-3 py-2 border border-border rounded-l-md w-full focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button className="bg-primary text-primary-foreground px-3 py-2 text-sm font-medium rounded-r-md hover:bg-primary/90">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© {currentYear} TopVSTs.com. All rights reserved.</p>
          
          <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="hover:text-foreground hover:underline transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-foreground hover:underline transition-colors">
              Terms of Service
            </Link>
            <Link href="/affiliate-disclosure" className="hover:text-foreground hover:underline transition-colors">
              Affiliate Disclosure
            </Link>
            <Link href="/sitemap" className="hover:text-foreground hover:underline transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
        
        {/* Featured Partners */}
        <div className="mt-8 pt-6 border-t border-border">
          <h3 className="text-center text-sm font-semibold mb-4">Featured Partners</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {featuredPartners.map((banner, index) => (
              <Link 
                href={banner.link} 
                key={`${banner.brand}-${index}`}
                className="flex items-center justify-center p-2 bg-card hover:bg-accent rounded-md transition-colors"
                target="_blank"
                rel="nofollow noopener"
                onClick={() => {
                  // Track affiliate click
                  if (typeof window !== 'undefined' && window.gtag) {
                    window.gtag('event', 'affiliate_link_click', {
                      banner_brand: banner.brand,
                      brand: banner.brand,
                      type: Array.isArray(banner.types) ? banner.types.join(',') : banner.type,
                      location: 'footer_partners'
                    });
                  }
                }}
              >
                <div className="relative h-8 w-24 flex items-center justify-center">
                  <span className="text-xs font-medium text-center">{banner.brand}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        <div className="mt-6 text-xs text-center text-muted-foreground">
          <p className="affiliate-disclosure">
            TopVSTs.com is reader-supported. When you buy through links on our site, we may earn an affiliate commission.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
