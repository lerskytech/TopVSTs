"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import BannerGrid from '../sponsors/BannerGrid';
import BannerCarousel from '../sponsors/BannerCarousel';

// Hard-coded banner data for WA Production
const waprodBanners = [
  {
    name: "InstaComposer",
    product: "InstaComposer - AI Powered MIDI Generator",
    banner: "/banners/waprod-instacomposer-1x1.png", 
    link: "https://www.waproduction.com/plugins/view/instacomposer",
    shape: "1:1",
    alt: "InstaComposer AI Powered MIDI Generator - WA Production",
    featured: true
  },
  {
    name: "Ultimate MIDI Bundle",
    product: "Ultimate MIDI Bundle - Complete MIDI Collection",
    banner: "/banners/waprod-ultimate-midi-bundle-1x1.png",
    link: "https://www.waproduction.com/bundles",
    shape: "1:1",
    alt: "Ultimate MIDI Bundle - Complete MIDI Collection from WA Production",
    featured: true
  },
  {
    name: "MIDIQ Horizontal",
    product: "MIDIQ - MIDI Programming Assistant",
    banner: "/banners/waprod-midiq-horizontal-1.png",
    link: "https://www.waproduction.com/plugins/view/midiq",
    shape: "horizontal",
    alt: "MIDIQ - MIDI Programming Assistant from WA Production",
    featured: false
  },
  {
    name: "Membership",
    product: "WA Production Membership - All Access Pass",
    banner: "/banners/waprod-membership-horizontal-1.png",
    link: "https://www.waproduction.com/subscribe/new",
    shape: "horizontal",
    alt: "WA Production Membership - All Access Pass",
    featured: true
  }
];

/**
 * WA Production Showcase Component
 * 
 * A complete showcase section for WA Production affiliate banners.
 */
const WAProdShowcase = () => {
  // Filter banners by shape and featured flag
  const featuredBanners = waprodBanners.filter(banner => banner.featured);
  const horizontalBanners = waprodBanners.filter(banner => banner.shape === 'horizontal');
  const squareBanners = waprodBanners.filter(banner => banner.shape === '1:1');
  const verticalBanners = waprodBanners.filter(banner => banner.shape === 'vertical');

  return (
    <div className="space-y-8">
      <div style={{background: 'red', color: 'white', padding: '10px', textAlign: 'center', fontWeight: 'bold', marginBottom: '10px'}}>
        WA PRODUCTION TEST - {new Date().toLocaleTimeString()}
      </div>
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold">WA Production Deals</h2>
        <p className="text-muted-foreground mt-2">
          Premium audio plugins, samples, and music production tools
        </p>
      </div>

      {/* Featured Carousel */}
      {featuredBanners.length > 0 && (
        <BannerCarousel 
          banners={featuredBanners} 
          title="Featured WA Production Deals"
          className="mb-8"
        />
      )}
      
      {/* Grid of square (1:1) banners */}
      {squareBanners.length > 0 && (
        <BannerGrid 
          banners={squareBanners} 
          shape="1:1"
          title="Featured Products"
          className="mb-8"
        />
      )}
      
      {/* Grid of horizontal banners */}
      {horizontalBanners.length > 0 && (
        <BannerGrid 
          banners={horizontalBanners} 
          shape="horizontal"
          title="More Great Deals"
          className="mb-8"
        />
      )}
      
      {/* Grid of vertical banners */}
      {verticalBanners.length > 0 && (
        <BannerGrid 
          banners={verticalBanners} 
          shape="vertical"
          title="Special Offers"
          className="mb-8"
        />
      )}
      
      {/* Affiliate disclosure footer */}
      <div className="text-xs text-muted-foreground text-center p-4 border-t border-border">
        <p>
          TopVSTs is an affiliate partner of WA Production. When you purchase through our links, 
          we may earn a commission at no additional cost to you.
        </p>
      </div>
    </div>
  );
};

export default WAProdShowcase;
