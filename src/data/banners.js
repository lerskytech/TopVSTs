/**
 * Banner Ads Data for TopVSTs.com
 * 
 * This file contains all banner ads and promotional graphics for affiliate partners.
 * 
 * Banner Types:
 * - hero: Large banners for the homepage hero carousel
 * - featured: Medium banners for the featured deals section
 * - sidebar: Vertical banners for desktop sidebar
 * - mobile: Small banners for mobile display
 * - seasonal: Special promotional banners (Black Friday, Summer Sale, etc.)
 * 
 * Each banner should include:
 * - brand: Partner name
 * - image: Desktop banner image path
 * - mobileSrc: Mobile-optimized image path
 * - alt: SEO-friendly descriptive text
 * - link: Affiliate tracking URL
 * - type: Banner placement type (hero, featured, sidebar, mobile, seasonal)
 * - priority: Display priority (higher numbers show first in rotations)
 * - video: Optional YouTube/TikTok embed code
 * - startDate: Optional date when banner should start showing (for seasonal)
 * - endDate: Optional date when banner should stop showing (for seasonal)
 */

const banners = [
  // Hero Banners
  {
    brand: 'Unison',
    image: '/banners/unison-desktop.jpg',
    mobileSrc: '/banners/unison-mobile.jpg',
    alt: 'Unison Audio Premium MIDI Packs and Samples',
    link: 'https://partner.unison.audio/topvsts',
    type: 'hero',
    priority: 10,
    video: null,
  },
  {
    brand: 'Plugin Boutique',
    image: '/banners/pluginboutique-desktop.jpg',
    mobileSrc: '/banners/pluginboutique-mobile.jpg',
    alt: 'Plugin Boutique - The #1 Store for VST Plugins and Audio Software',
    link: 'https://www.pluginboutique.com/?a_aid=topvsts',
    type: 'hero',
    priority: 9,
    video: null,
  },
  {
    brand: 'Splice',
    image: '/banners/splice-desktop.jpg',
    mobileSrc: '/banners/splice-mobile.jpg',
    alt: 'Splice Sounds - Music Production Samples and Loops',
    link: 'https://splice.com?ref=topvsts',
    type: 'hero',
    priority: 8,
    video: null,
  },
  
  // Featured Deals
  {
    brand: 'Waves',
    image: '/banners/waves-desktop.jpg',
    mobileSrc: '/banners/waves-mobile.jpg',
    alt: 'Waves Audio Plugins - Professional Mixing and Mastering Tools',
    link: 'https://www.waves.com?ref=topvsts',
    type: 'featured',
    priority: 7,
    video: null,
  },
  {
    brand: 'W.A. Production',
    image: '/banners/waproduction-desktop.jpg',
    mobileSrc: '/banners/waproduction-mobile.jpg',
    alt: 'W.A. Production Music Software and Sample Packs',
    link: 'https://www.waproduction.com?ref=topvsts',
    type: 'featured',
    priority: 6,
    video: null,
  },
  {
    brand: 'Loopmasters',
    image: '/banners/loopmasters-desktop.jpg',
    mobileSrc: '/banners/loopmasters-mobile.jpg',
    alt: 'Loopmasters - Professional Samples, Loops and VST Plugin Instruments',
    link: 'https://www.loopmasters.com?ref=topvsts',
    type: 'featured',
    priority: 5,
    video: null,
  },
  
  // Sidebar Banners
  {
    brand: 'ADSR',
    image: '/banners/adsr-desktop.jpg',
    mobileSrc: '/banners/adsr-mobile.jpg',
    alt: 'ADSR Sounds - Music Production Courses, Samples and Presets',
    link: 'https://www.adsrsounds.com?ref=topvsts',
    type: 'sidebar',
    priority: 8,
    video: null,
  },
  {
    brand: 'Sonible',
    image: '/banners/sonible-desktop.jpg',
    mobileSrc: '/banners/sonible-mobile.jpg',
    alt: 'Sonible Smart Audio Tools - Intelligent Mixing Plugins',
    link: 'https://www.sonible.com?ref=topvsts',
    type: 'sidebar',
    priority: 7,
    video: null,
  },
  {
    brand: 'PluginFox',
    image: '/banners/pluginfox-desktop.jpg',
    mobileSrc: '/banners/pluginfox-mobile.jpg',
    alt: 'PluginFox - Premium Audio Software and Plugins',
    link: 'https://www.pluginfox.com?ref=topvsts',
    type: 'sidebar',
    priority: 6,
    video: null,
  },
  
  // Mobile Banners
  {
    brand: 'SoundRAW',
    image: '/banners/soundraw-desktop.jpg',
    mobileSrc: '/banners/soundraw-mobile.jpg',
    alt: 'SoundRAW - AI Music Generation Platform',
    link: 'https://soundraw.io?ref=topvsts',
    type: 'mobile',
    priority: 9,
    video: null,
  },
  
  // Seasonal Banners (Examples for future use)
  {
    brand: 'Plugin Boutique',
    image: '/banners/pluginboutique-desktop.jpg',
    mobileSrc: '/banners/pluginboutique-mobile.jpg',
    alt: 'Plugin Boutique Black Friday Sale - Up to 90% Off',
    link: 'https://www.pluginboutique.com/blackfriday?a_aid=topvsts',
    type: 'seasonal',
    priority: 10,
    startDate: '2025-11-20',
    endDate: '2025-12-01',
    video: null,
  },
  {
    brand: 'Waves',
    image: '/banners/waves-desktop.jpg',
    mobileSrc: '/banners/waves-mobile.jpg',
    alt: 'Waves Summer Sale - Limited Time Offers',
    link: 'https://www.waves.com/specials?ref=topvsts',
    type: 'seasonal',
    priority: 9,
    startDate: '2025-07-01',
    endDate: '2025-07-31',
    video: null,
  },
];

/**
 * Helper functions to filter banners by type, brand, etc.
 */

// Get banners by type
export const getBannersByType = (type) => {
  return banners.filter(banner => banner.type === type)
    .sort((a, b) => (b.priority || 0) - (a.priority || 0));
};

// Get banners by brand
export const getBannersByBrand = (brand) => {
  return banners.filter(banner => banner.brand.toLowerCase() === brand.toLowerCase())
    .sort((a, b) => (b.priority || 0) - (a.priority || 0));
};

// Get active seasonal banners
export const getActiveSeasonalBanners = () => {
  const today = new Date();
  return banners.filter(banner => {
    if (banner.type !== 'seasonal') return false;
    
    const startDate = banner.startDate ? new Date(banner.startDate) : null;
    const endDate = banner.endDate ? new Date(banner.endDate) : null;
    
    return (!startDate || today >= startDate) && (!endDate || today <= endDate);
  }).sort((a, b) => (b.priority || 0) - (a.priority || 0));
};

// Get random banners
export const getRandomBanners = (type, count = 1) => {
  const filteredBanners = type 
    ? banners.filter(banner => banner.type === type)
    : banners;
    
  // Shuffle array using Fisher-Yates algorithm
  const shuffled = [...filteredBanners];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  // Return the requested number of banners
  return shuffled.slice(0, count);
};

export default banners;
