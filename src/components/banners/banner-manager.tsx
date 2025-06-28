"use client"

import * as React from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { getBannersByType, getActiveSeasonalBanners, getRandomBanners } from '../../data/banners';
import BannerCarousel from './banner-carousel';
import FeaturedBanners from './featured-banners';
import StickySidebar from './sticky-sidebar';
import BottomBanner from './bottom-banner';
import ContextualBanner from './contextual-banner';

interface BannerManagerProps {
  showHero?: boolean;
  showFeatured?: boolean;
  showSidebar?: boolean;
  showBottom?: boolean;
  showContextual?: boolean;
  relatedBrands?: string[];
  pageCategory?: string;
}

/**
 * BannerManager handles the display and tracking of all affiliate banners
 * 
 * This component:
 * 1. Controls which banner sections appear on which pages
 * 2. Implements banner rotation and randomization
 * 3. Handles banner tracking and analytics
 * 4. Manages seasonal banner logic
 */
export default function BannerManager({
  showHero = false,
  showFeatured = false,
  showSidebar = false,
  showBottom = false,
  showContextual = false,
  relatedBrands = [],
  pageCategory = '',
}: BannerManagerProps) {
  const pathname = usePathname();
  
  // Initialize analytics listener once
  React.useEffect(() => {
    const trackBannerClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const bannerLink = target.closest('.affiliate-banner a');
      
      if (bannerLink) {
        const brandName = bannerLink.getAttribute('data-brand') || 'unknown';
        const url = bannerLink.getAttribute('href') || '';
        
        // Send analytics event
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'affiliate_click', {
            affiliate_brand: brandName,
            affiliate_url: url,
            page_path: pathname,
          });
        }
      }
    };
    
    // Add global click event listener
    document.addEventListener('click', trackBannerClick);
    
    // Clean up
    return () => {
      document.removeEventListener('click', trackBannerClick);
    };
  }, [pathname]);

  // Get relevant banners for each section
  const heroBanners = React.useMemo(() => {
    const seasonal = getActiveSeasonalBanners();
    const heroType = getBannersByType('hero');
    
    // Prioritize seasonal banners, then regular hero banners
    return [...seasonal, ...heroType].slice(0, 3);
  }, []);
  
  const featuredBanners = React.useMemo(() => {
    return getBannersByType('featured').slice(0, 6);
  }, []);
  
  const sidebarBanners = React.useMemo(() => {
    // Filter based on page category or related brands if provided
    if (pageCategory || relatedBrands.length > 0) {
      const contextual = getBannersByType('sidebar').filter(banner => {
        if (relatedBrands.includes(banner.brand)) return true;
        return false;
      });
      
      if (contextual.length > 0) {
        return contextual;
      }
    }
    
    // Fallback to random sidebar banners
    return getBannersByType('sidebar');
  }, [pageCategory, relatedBrands]);
  
  const bottomBanners = React.useMemo(() => {
    // Use mobile banners for bottom display if available
    const mobileBanners = getBannersByType('mobile');
    if (mobileBanners.length > 0) {
      return mobileBanners;
    }
    
    // Fallback to random banner from any type
    return getRandomBanners(null, 1);
  }, []);

  // Get contextual banners based on related brands
  const contextualBanners = React.useMemo(() => {
    if (!relatedBrands || relatedBrands.length === 0) return [];
    
    // Try to find banners related to the brands mentioned on the page
    const relevantBanners = [];
    for (const brand of relatedBrands) {
      const brandBanners = getBannersByType('hero').filter(
        banner => banner.brand.toLowerCase() === brand.toLowerCase()
      );
      
      if (brandBanners.length > 0) {
        relevantBanners.push(brandBanners[0]);
        if (relevantBanners.length >= 2) break; // Limit to 2 contextual banners
      }
    }
    
    return relevantBanners;
  }, [relatedBrands]);

  return (
    <>
      {/* Google Analytics Tag - for banner click tracking */}
      <Script
        id="ga-banner-tracking"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX', {
              page_path: window.location.pathname,
            });
          `
        }}
      />
      
      {/* Hero Banner Carousel */}
      {showHero && heroBanners.length > 0 && (
        <BannerCarousel banners={heroBanners} className="mb-8" />
      )}
      
      {/* Featured Deals Grid */}
      {showFeatured && featuredBanners.length > 0 && (
        <FeaturedBanners banners={featuredBanners} className="mb-8" />
      )}
      
      {/* Sticky Sidebar */}
      {showSidebar && sidebarBanners.length > 0 && (
        <StickySidebar banners={sidebarBanners} />
      )}
      
      {/* Bottom Banner */}
      {showBottom && bottomBanners.length > 0 && (
        <BottomBanner banners={bottomBanners} />
      )}
      
      {/* Contextual Banners */}
      {showContextual && contextualBanners.length > 0 && (
        <div className="my-8">
          <ContextualBanner banners={contextualBanners} />
        </div>
      )}
    </>
  );
}

// Add TypeScript support for gtag
declare global {
  interface Window {
    gtag: (
      command: string,
      action: string,
      params?: Record<string, any>
    ) => void;
    dataLayer: any[];
  }
}
