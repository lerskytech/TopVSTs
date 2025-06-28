// Product data for TopVSTs.com
// This file contains structured data for all products used in comparisons and rankings
// Each product has consistent fields for easy filtering and display

/**
 * Categories available:
 * - Plugin: Software instruments, effects, and audio processing tools
 * - SamplePack: Collections of audio samples, loops, and sounds
 * - AITool: AI-powered music creation and audio processing tools
 *
 * To add new categories:
 * 1. Add the category name to the filter options in the comparisons page
 * 2. Ensure products have the correct category value
 * 3. Add appropriate filters and sort options
 */

const products = [
  // Plugins
  {
    id: "serum",
    name: "Serum",
    brand: "Xfer Records",
    category: "Plugin",
    image: "images/products/serum.png",
    description: "Industry standard wavetable synthesizer with pristine sound quality and advanced modulation capabilities.",
    rating: 4.9,
    features: [
      "Wavetable synthesis",
      "Visual wavetable editor",
      "Advanced modulation",
      "High-quality effects",
      "Extensive preset library"
    ],
    tags: ["Synthesizer", "Wavetable", "Sound Design"],
    isTopPick: true
  },
  {
    id: "fabfilter-pro-q3",
    name: "Pro-Q 3",
    brand: "FabFilter",
    category: "Plugin",
    image: "images/products/pro-q3.png",
    description: "Professional high-quality equalizer with pristine sound and unrivaled workflow efficiency.",
    rating: 4.8,
    features: [
      "Dynamic EQ",
      "Mid/side processing",
      "Spectrum analyzer",
      "Up to 24 bands",
      "External spectrum visualization"
    ],
    tags: ["EQ", "Mixing", "Mastering"],
    isTopPick: true
  },
  {
    id: "omnisphere",
    name: "Omnisphere 2",
    brand: "Spectrasonics",
    category: "Plugin",
    image: "images/products/omnisphere.png",
    description: "Flagship synthesizer with vast sound library and unmatched sound design capabilities.",
    rating: 4.8,
    features: [
      "Massive sound library",
      "Hardware synth integration",
      "Granular synthesis",
      "Multi-timbral architecture",
      "Arpeggiator"
    ],
    tags: ["Synthesizer", "Workstation", "Sound Design"],
    isTopPick: false
  },
  {
    id: "ozone",
    name: "Ozone 10 Advanced",
    brand: "iZotope",
    category: "Plugin",
    image: "images/products/ozone.png",
    description: "Complete mastering suite with AI-powered assistive features for professional results.",
    rating: 4.7,
    features: [
      "Master Assistant AI",
      "Dynamic EQ",
      "Spectral Shaper",
      "Imager",
      "Vintage modules"
    ],
    tags: ["Mastering", "AI-Assisted", "All-in-One"],
    isTopPick: false
  },
  {
    id: "valhalla-vintage-verb",
    name: "VintageVerb",
    brand: "Valhalla DSP",
    category: "Plugin",
    image: "images/products/valhalla.png",
    description: "Classic reverb plugin with pristine algorithmic sound and extensive mode options.",
    rating: 4.7,
    features: [
      "17 reverb algorithms",
      "Multiple era modes",
      "Low CPU usage",
      "Color modulation",
      "Affordable price"
    ],
    tags: ["Reverb", "Mixing", "Creative"],
    isTopPick: false
  },
  {
    id: "sylenth1",
    name: "Sylenth1",
    brand: "LennarDigital",
    category: "Plugin",
    image: "images/products/sylenth1.png",
    description: "Classic virtual analog synthesizer known for its rich, warm sound and CPU efficiency.",
    rating: 4.5,
    features: [
      "4 oscillators",
      "2 filters",
      "Analog sound",
      "Low CPU usage",
      "Extensive preset library"
    ],
    tags: ["Synthesizer", "Virtual Analog", "EDM"],
    isTopPick: false
  },
  {
    id: "soothe2",
    name: "Soothe 2",
    brand: "Oeksound",
    category: "Plugin",
    image: "images/products/soothe2.png",
    description: "Dynamic resonance suppressor that reduces harshness and resonances in audio material.",
    rating: 4.6,
    features: [
      "Dynamic processing",
      "Real-time analysis",
      "Mid/side operation",
      "Frequency-dependent depth",
      "Delta monitoring"
    ],
    tags: ["Dynamic EQ", "Mixing", "Mastering"],
    isTopPick: false
  },
  {
    id: "kontakt",
    name: "Kontakt 7",
    brand: "Native Instruments",
    category: "Plugin",
    image: "images/products/kontakt.png",
    description: "Industry-standard sampler with vast library of instruments and sound design capabilities.",
    rating: 4.7,
    features: [
      "Advanced sampling engine",
      "Extensive library",
      "Flexible routing",
      "Custom interfaces",
      "Deep editing"
    ],
    tags: ["Sampler", "Virtual Instruments", "Orchestra"],
    isTopPick: false
  },

  // Sample Packs
  {
    id: "black-octopus-leviathan",
    name: "Leviathan",
    brand: "Black Octopus Sound",
    category: "SamplePack",
    image: "images/products/leviathan.png",
    description: "Massive collection of bass, drums, and sound design elements for electronic music production.",
    rating: 4.8,
    features: [
      "2,500+ samples",
      "Royalty-free",
      "24-bit quality",
      "Bass design focus",
      "Genre-diverse"
    ],
    tags: ["Bass Music", "EDM", "Sound Design"],
    isTopPick: true
  },
  {
    id: "splice-sounds",
    name: "Splice Sounds Subscription",
    brand: "Splice",
    category: "SamplePack",
    image: "images/products/splice.png",
    description: "Subscribe to access millions of high-quality, royalty-free samples, loops, and presets.",
    rating: 4.7,
    features: [
      "Millions of samples",
      "Credit system",
      "Plugin preset access",
      "Constantly updated",
      "AI-powered search"
    ],
    tags: ["Subscription", "All Genres", "Loops"],
    isTopPick: false
  },
  {
    id: "komplete-ultimate",
    name: "Komplete Ultimate",
    brand: "Native Instruments",
    category: "SamplePack",
    image: "images/products/komplete.png",
    description: "Comprehensive collection of instruments, effects, and samples covering virtually all production needs.",
    rating: 4.9,
    features: [
      "120+ instruments & effects",
      "700+ GB content",
      "Orchestra libraries",
      "Synthesizers",
      "Guitar & bass effects"
    ],
    tags: ["Bundle", "All-in-One", "Professional"],
    isTopPick: true
  },
  {
    id: "undrgrnd-sounds-lofi",
    name: "Lo-Fi Beats & Jazz",
    brand: "Undrgrnd Sounds",
    category: "SamplePack",
    image: "images/products/lofi.png",
    description: "Vintage-inspired sample collection for creating authentic lo-fi hip-hop and jazz productions.",
    rating: 4.5,
    features: [
      "Vinyl samples",
      "Jazz instruments",
      "Drum breaks",
      "Analog processing",
      "One-shots & loops"
    ],
    tags: ["Lo-Fi", "Hip-Hop", "Jazz"],
    isTopPick: false
  },
  {
    id: "loopmasters-drum-funk",
    name: "Drum & Bass Funk",
    brand: "Loopmasters",
    category: "SamplePack",
    image: "images/products/drum-funk.png",
    description: "Soulful and energetic drum & bass sample pack with authentic breaks and musical elements.",
    rating: 4.3,
    features: [
      "Breakbeats",
      "Bass loops",
      "Musical elements",
      "One-shots",
      "MIDI files"
    ],
    tags: ["Drum & Bass", "Breaks", "Funk"],
    isTopPick: false
  },
  {
    id: "sound-yeti-collision",
    name: "Collision FX",
    brand: "Sound Yeti",
    category: "SamplePack",
    image: "images/products/collision.png",
    description: "Cinematic impacts, transitions, and sound design elements for film scoring and electronic music.",
    rating: 4.6,
    features: [
      "Designed impacts",
      "Transitions",
      "Risers & falls",
      "Drones",
      "Kontakt instrument"
    ],
    tags: ["Cinematic", "Sound Design", "SFX"],
    isTopPick: false
  },
  {
    id: "cymatics-dragon",
    name: "Dragon",
    brand: "Cymatics",
    category: "SamplePack",
    image: "images/products/dragon.png",
    description: "Aggressive and powerful sample pack for trap, hip-hop, and electronic music production.",
    rating: 4.4,
    features: [
      "808s & drums",
      "Melodic loops",
      "One-shots",
      "Vocal samples",
      "MIDI files"
    ],
    tags: ["Trap", "Hip-Hop", "EDM"],
    isTopPick: false
  },

  // AI Tools
  {
    id: "izotope-neutron",
    name: "Neutron 4",
    brand: "iZotope",
    category: "AITool",
    image: "images/products/neutron.png",
    description: "AI-powered mixing assistant with intelligent features for faster, better mixes.",
    rating: 4.7,
    features: [
      "Mix Assistant",
      "Visual Mixer",
      "Track Assistant",
      "Intelligent EQ",
      "Machine learning"
    ],
    tags: ["Mixing", "AI-Assisted", "All-in-One"],
    isTopPick: true
  },
  {
    id: "melodyne",
    name: "Melodyne 5",
    brand: "Celemony",
    category: "AITool",
    image: "images/products/melodyne.png",
    description: "Industry-standard pitch correction and audio manipulation software with DNA technology.",
    rating: 4.8,
    features: [
      "DNA technology",
      "Multitrack editing",
      "Chord detection",
      "Pitch & time correction",
      "Sound design capabilities"
    ],
    tags: ["Pitch Correction", "Vocal Editing", "Audio Manipulation"],
    isTopPick: true
  },
  {
    id: "sonible-smart-eq",
    name: "smart:EQ 3",
    brand: "Sonible",
    category: "AITool",
    image: "images/products/smart-eq.png",
    description: "AI-powered equalizer that automatically creates custom profiles for balanced sound.",
    rating: 4.5,
    features: [
      "AI profiles",
      "Smart bands",
      "Real-time visualization",
      "Group processing",
      "M/S processing"
    ],
    tags: ["EQ", "Mixing", "AI-Assisted"],
    isTopPick: false
  },
  {
    id: "audioshake",
    name: "AudioShake",
    brand: "AudioShake",
    category: "AITool",
    image: "images/products/audioshake.png",
    description: "AI-powered stem separation technology that splits mixed audio into individual instrument tracks.",
    rating: 4.6,
    features: [
      "Vocal isolation",
      "Instrumental creation",
      "Multi-stem separation",
      "Batch processing",
      "High-quality output"
    ],
    tags: ["Stem Separation", "Remixing", "Audio Editing"],
    isTopPick: false
  },
  {
    id: "soundraw",
    name: "SoundRaw",
    brand: "SoundRaw",
    category: "AITool",
    image: "images/products/soundraw.png",
    description: "AI music generator that creates original, royalty-free tracks based on your parameters.",
    rating: 4.3,
    features: [
      "Customizable parameters",
      "Genre selection",
      "Mood control",
      "Arrangement options",
      "Commercial licensing"
    ],
    tags: ["Music Generation", "Royalty-Free", "Content Creation"],
    isTopPick: false
  },
  {
    id: "waves-clarity",
    name: "Clarity Vx",
    brand: "Waves Audio",
    category: "AITool",
    image: "images/products/clarity.png",
    description: "Neural networks powered plugin for voice isolation and cleaning in real-time.",
    rating: 4.4,
    features: [
      "Voice isolation",
      "De-noise",
      "De-reverb",
      "Real-time processing",
      "Low latency"
    ],
    tags: ["Vocal Processing", "Noise Reduction", "Post Production"],
    isTopPick: false
  },
  {
    id: "landr-mastering",
    name: "LANDR Mastering",
    brand: "LANDR",
    category: "AITool",
    image: "images/products/landr.png",
    description: "Automated, AI-powered mastering solution that analyzes and enhances your music.",
    rating: 4.2,
    features: [
      "Instant mastering",
      "Genre detection",
      "Style customization",
      "Cloud-based",
      "Subscription plans"
    ],
    tags: ["Mastering", "Cloud Service", "Distribution"],
    isTopPick: false
  },
];

// Export the products data
export default products;
