/**
 * Sponsors/Affiliate Partners data
 * Contains information about all affiliate partners for TopVSTs.com
 * Each sponsor has name, logo, description, link, and type
 */

// Use consistent paths for images that are already included in the Next.js app
const sponsors = [
  {
    id: 'unison',
    name: 'Unison',
    logo: 'logos/unison.png',
    description: 'Premium MIDI packs, sample libraries, and music production tools for modern producers.',
    affiliateLink: 'https://unison.audio/go/topvsts/?aid=topvsts&utm_source=topvsts&utm_medium=affiliate&utm_campaign=music-tools',
    type: 'Samples',
    featured: true,
    bannerImages: {
      desktop: 'banners/unison-desktop.jpg',
      mobile: 'banners/unison-mobile.jpg'
    }
  },
  {
    id: 'rakuten',
    name: 'Rakuten Advertising',
    logo: 'logos/rakuten.png',
    description: 'Connect with leading music production brands and advertisers through Rakuten\'s affiliate network.',
    affiliateLink: 'https://rakutenadvertising.com/publishers/?utm_source=topvsts&utm_medium=referral&utm_campaign=music-affiliate',
    type: 'Network',
    featured: false,
    bannerImages: {
      desktop: 'banners/rakuten-desktop.jpg',
      mobile: 'banners/rakuten-mobile.jpg'
    }
  },
  {
    id: 'adsr',
    name: 'ADSR Sounds',
    logo: 'logos/adsr.png',
    description: 'Production tutorials, sample packs, and premium synth presets for electronic music producers.',
    affiliateLink: 'https://www.adsrsounds.com/affiliates/?aff=topvsts&utm_source=topvsts&utm_medium=affiliate&utm_campaign=sample-packs',
    type: 'Samples & Education',
    featured: true,
    bannerImages: {
      desktop: 'banners/adsr-desktop.jpg',
      mobile: 'banners/adsr-mobile.jpg'
    }
  },
  {
    id: 'loopmasters',
    name: 'Loopmasters',
    logo: 'logos/loopmasters.png',
    description: 'Professional sample libraries, VST plugins, and royalty-free loops for music production.',
    affiliateLink: 'https://www.loopmasters.com/affiliates/topvsts?a_aid=topvsts&a_bid=12345678&chan=topvsts-website',
    type: 'Samples & Plugins',
    featured: true,
    bannerImages: {
      desktop: 'banners/loopmasters-desktop.jpg',
      mobile: 'banners/loopmasters-mobile.jpg'
    }
  },
  {
    id: 'waproduction',
    name: 'W.A. Production',
    logo: 'logos/waproduction.png',
    description: 'Innovative audio plugins, sample packs, and producer tools for modern music creators.',
    affiliateLink: 'https://www.waproduction.com/plugins/?ref=topvsts-aff&utm_source=topvsts&utm_medium=affiliate&utm_campaign=music-tools',
    type: 'Plugins & Samples',
    featured: true,
    bannerImages: {
      desktop: 'banners/waproduction-desktop.jpg',
      mobile: 'banners/waproduction-mobile.jpg'
    }
  },
  {
    id: 'soundraw',
    name: 'SoundRAW',
    logo: 'logos/soundraw.png',
    description: 'AI-powered music generation platform for content creators and producers.',
    affiliateLink: 'https://soundraw.io/?via=topvsts&utm_source=topvsts&utm_medium=affiliate&utm_campaign=ai-music',
    type: 'AI Music',
    featured: false,
    bannerImages: {
      desktop: 'banners/soundraw-desktop.jpg',
      mobile: 'banners/soundraw-mobile.jpg'
    }
  },
  {
    id: 'sonible',
    name: 'Sonible',
    logo: 'logos/sonible.png',
    description: 'Smart audio tools and mixing plugins with AI-powered features.',
    affiliateLink: 'https://www.sonible.com/shop/?partner=topvsts&utm_source=topvsts&utm_medium=affiliate&utm_campaign=smart-plugins',
    type: 'Plugins',
    featured: false,
    bannerImages: {
      desktop: 'banners/sonible-desktop.jpg',
      mobile: 'banners/sonible-mobile.jpg'
    }
  },
  {
    id: 'pluginfox',
    name: 'PluginFox',
    logo: 'logos/pluginfox.png',
    description: 'Great deals on premium VST plugins, audio software, and sample libraries.',
    affiliateLink: 'https://www.pluginfox.com/deals/?ref=topvsts&utm_source=topvsts&utm_medium=affiliate&utm_campaign=vst-deals',
    type: 'Plugin Store',
    featured: true,
    bannerImages: {
      desktop: 'banners/pluginfox-desktop.jpg',
      mobile: 'banners/pluginfox-mobile.jpg'
    }
  },
  {
    id: 'waves',
    name: 'Waves',
    logo: 'logos/waves.png',
    description: 'Industry-standard audio plugins used by professional producers and engineers worldwide.',
    affiliateLink: 'https://www.waves.com/specials/?affiliate=topvsts&utm_source=topvsts&utm_medium=affiliate&utm_campaign=pro-audio',
    type: 'Plugins',
    featured: true,
    bannerImages: {
      desktop: 'banners/waves-desktop.jpg',
      mobile: 'banners/waves-mobile.jpg'
    }
  },
  {
    id: 'splice',
    name: 'Splice',
    logo: 'logos/splice.png',
    description: 'Millions of high-quality samples, loops, and presets with a revolutionary subscription model.',
    affiliateLink: 'https://splice.com/features/sounds?ref=topvsts&utm_source=topvsts&utm_medium=affiliate&utm_campaign=sounds-collection',
    type: 'Samples & Plugins',
    featured: true,
    bannerImages: {
      desktop: 'banners/splice-desktop.jpg',
      mobile: 'banners/splice-mobile.jpg'
    }
  },
  {
    id: 'pluginboutique',
    name: 'Plugin Boutique',
    logo: 'logos/pluginboutique.png',
    description: 'The world\'s most popular VST plugin online store with thousands of products available.',
    affiliateLink: 'https://www.pluginboutique.com/deals?utm_source=topvsts&utm_medium=affiliate&utm_campaign=vst-deals&a_aid=topvsts',
    type: 'Plugin Store',
    featured: true,
    bannerImages: {
      desktop: 'banners/pluginboutique-desktop.jpg',
      mobile: 'banners/pluginboutique-mobile.jpg'
    }
  }
];

/**
 * Get featured sponsors
 * Returns only sponsors marked as featured
 */
export const getFeaturedSponsors = () => {
  return sponsors.filter(sponsor => sponsor.featured);
};

/**
 * Get sponsor by ID
 * @param {string} id - The sponsor ID to look up
 * @returns {Object|null} - The sponsor object or null if not found
 */
export const getSponsorById = (id) => {
  return sponsors.find(sponsor => sponsor.id === id) || null;
};

/**
 * Get sponsors by type
 * @param {string} type - The sponsor type to filter by
 * @returns {Array} - Array of sponsors matching the type
 */
export const getSponsorsByType = (type) => {
  return sponsors.filter(sponsor => sponsor.type.includes(type));
};

export default sponsors;
