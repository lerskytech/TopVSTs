/**
 * Sponsors Data
 * Contains information about sponsors for TopVSTs.com affiliate marketing
 */

export const sponsors = [
  {
    name: 'SoundRAW',
    logo: '/logos/soundraw.png',
    banners: [
      { 
        image: '/banners/soundraw-banner.png', 
        alt: 'SoundRAW – AI Music Generator Main Banner', 
        use: 'carousel', 
        url: 'https://soundraw.io/?ref=xburquln' 
      }
    ],
    // These extra banners are stored for future use in other sections of the site
    // such as a dedicated SoundRAW promo page, promotional gallery, or other marketing sections
    promosToUseLater: [
      { 
        image: '/banners/soundraw-banner2.png', 
        alt: 'SoundRAW – Collaboration Promo', 
        url: 'https://soundraw.io/?ref=xburquln' 
      },
      { 
        image: '/banners/soundraw-banner3.png', 
        alt: 'SoundRAW – Create Custom Beats', 
        url: 'https://soundraw.io/?ref=xburquln' 
      }
    ],
    url: 'https://soundraw.io/?ref=xburquln',
    description: 'AI-powered music creation for creators, producers, and artists.'
  },
  {
    name: 'WA Production',
    logo: '/logos/waproduction.png',
    description: 'Premium audio plugins, samples, and music production tools for modern producers.',
    url: 'https://www.waproduction.com/#a_aid=685f6ff87f025'
  }
];

/**
 * Get all sponsors
 * Returns all sponsors in the system
 */
export const getAllSponsors = () => {
  return sponsors;
};

/**
 * Get sponsor by name
 * @param {string} name - The sponsor name to look up
 * @returns {Object|null} - The sponsor object or null if not found
 */
export const getSponsorByName = (name) => {
  return sponsors.find(sponsor => sponsor.name === name) || null;
};

export default sponsors;
