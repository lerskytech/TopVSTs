import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Star, Download, ThumbsUp, ThumbsDown, Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { parseRating, formatPrice } from '@/lib/utils'
import AffiliateBanner from '@/components/ui/affiliate-banner'
import ReviewScores from '@/components/reviews/review-scores'
import ProsConsTable from '@/components/reviews/pros-cons-table'
import FeatureTable from '@/components/reviews/feature-table'
import RelatedPlugins from '@/components/reviews/related-plugins'
import ReviewComments from '@/components/reviews/review-comments'

// This would be replaced with actual data fetching in a real implementation
async function getReviewData(slug: string) {
  // Mock data for a single plugin review
  return {
    id: '1',
    title: 'Xfer Records Serum - The Ultimate Wavetable Synthesizer',
    slug: 'xfer-records-serum',
    excerpt: 'A powerful wavetable synthesizer that has become an industry standard for electronic music production.',
    rating: 4.9,
    price: 189,
    salePrice: 129,
    brand: 'Xfer Records',
    category: 'Synthesizer',
    releaseDate: '2021-05-20',
    reviewDate: '2022-06-15',
    reviewedBy: 'Alex Johnson',
    affiliateUrl: 'https://example.com/serum-affiliate',
    heroImage: '/img/plugins/serum-hero.jpg',
    downloadUrl: 'https://example.com/download-serum-demo',
    downloadSize: '500MB',
    scores: {
      sound: 95,
      features: 90,
      usability: 85,
      value: 88,
      overall: 92,
    },
    pros: [
      'Incredible sound quality',
      'Intuitive and powerful wavetable editor',
      'Versatile modulation options',
      'Regular updates and support',
      'Extensive preset library'
    ],
    cons: [
      'CPU intensive for complex patches',
      'Steeper learning curve for beginners',
      'Premium price point'
    ],
    features: [
      {
        name: 'Sound Engine',
        description: 'Wavetable synthesis with multiple oscillators',
      },
      {
        name: 'Filters',
        description: '10 filter types with multiple configurations',
      },
      {
        name: 'Effects',
        description: '10 high-quality effects with routing options',
      },
      {
        name: 'Modulation',
        description: 'LFOs, envelopes, and matrix modulation system',
      },
    ],
    content: `
      <h2>Introduction</h2>
      <p>Xfer Records' Serum has established itself as one of the most powerful and versatile software synthesizers available. Released in 2014 by Steve Duda, Serum quickly gained popularity among electronic music producers for its pristine sound quality, visual wavetable editor, and deep modulation capabilities.</p>

      <h2>Sound Quality</h2>
      <p>Serum's sound engine delivers remarkably clean, high-quality audio with minimal aliasing, thanks to its oversampled, high-resolution wavetable oscillators. The clarity and definition of the sound make it perfect for modern electronic music production, especially genres that demand precision and power.</p>

      <h2>User Interface</h2>
      <p>One of Serum's standout features is its intuitive, visual interface. The wavetable editor allows you to draw and manipulate waveforms directly, with real-time visual feedback. This makes sound design more accessible and inspiring, even for producers who aren't synthesis experts.</p>

      <h2>Features and Flexibility</h2>
      <p>With two main wavetable oscillators, a sub-oscillator, and a noise oscillator, Serum provides a robust foundation for sound creation. Add to this the flexible modulation system, two powerful filters, and a comprehensive effects section, and you have a synthesizer capable of producing an almost limitless variety of sounds.</p>

      <h2>Modulation System</h2>
      <p>Serum's modulation capabilities are exceptional, with LFOs, envelopes, and a matrix that lets you connect virtually any parameter to any modulation source. This flexibility is enhanced by the visual approach, which makes complex modulation setups both intuitive and enjoyable.</p>

      <h2>Presets and Expandability</h2>
      <p>The synthesizer comes with a substantial library of factory presets, covering a wide range of sounds from basses and leads to pads and effects. Additionally, there's a thriving ecosystem of third-party preset packs, ensuring you'll never run out of inspiration.</p>

      <h2>CPU Performance</h2>
      <p>It's worth noting that Serum can be demanding on your computer's resources, especially when using multiple instances or creating complex patches. However, the software includes several options to help manage CPU usage, and the sound quality justifies the processing power required.</p>

      <h2>Value for Money</h2>
      <p>While Serum is positioned as a premium product with a price tag to match, its capabilities, sound quality, and regular updates make it a worthwhile investment for serious producers. The rent-to-own option through Splice also makes it more accessible to those on a tighter budget.</p>

      <h2>Conclusion</h2>
      <p>Xfer Records Serum remains a top choice for electronic music producers, and for good reason. Its combination of pristine sound quality, intuitive interface, and deep sound design capabilities make it a versatile tool that can handle virtually any synthesis task. While it requires some investment in both money and learning time, the results you can achieve with Serum make it one of the best VST synthesizers available.</p>
    `,
    youtubeId: 'rf4Dj3FSCjc',
    systemRequirements: {
      windows: 'Windows 7 or later, 4GB RAM, 1GB free disk space',
      mac: 'macOS 10.11 or later, 4GB RAM, 1GB free disk space',
      formats: 'VST, AU, AAX'
    },
    relatedPlugins: [
      {
        id: '2',
        title: 'Native Instruments Massive X',
        image: '/img/plugins/massive-x.jpg',
        price: 199,
        rating: 4.7,
        category: 'Synthesizer',
        brand: 'Native Instruments',
        affiliateUrl: 'https://example.com/massive-x-affiliate',
        slug: 'native-instruments-massive-x'
      },
      {
        id: '3',
        title: 'Arturia Pigments 4',
        image: '/img/plugins/pigments.jpg',
        price: 199,
        salePrice: 149,
        rating: 4.6,
        category: 'Synthesizer',
        brand: 'Arturia',
        affiliateUrl: 'https://example.com/pigments-affiliate',
        slug: 'arturia-pigments-4'
      },
      {
        id: '4',
        title: 'Vital Synth',
        image: '/img/plugins/vital.jpg',
        price: 80,
        rating: 4.8,
        category: 'Synthesizer',
        brand: 'Vital Audio',
        affiliateUrl: 'https://example.com/vital-affiliate',
        slug: 'vital-synth'
      }
    ]
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const review = await getReviewData(params.slug)
  
  return {
    title: `${review.title} Review | TopVSTs`,
    description: review.excerpt,
    openGraph: {
      title: `${review.title} Review | TopVSTs`,
      description: review.excerpt,
      type: 'article',
      images: [
        {
          url: review.heroImage,
          width: 1200,
          height: 630,
          alt: review.title
        }
      ]
    }
  }
}

export default async function ReviewPage({ params }: { params: { slug: string } }) {
  const review = await getReviewData(params.slug)
  const stars = parseRating(review.rating)
  const isOnSale = review.salePrice && review.salePrice < review.price

  return (
    <div className="container py-8">
      {/* Breadcrumbs */}
      <nav className="flex mb-4 text-sm">
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/" className="text-muted-foreground hover:text-foreground">Home</Link>
          </li>
          <li className="text-muted-foreground">/</li>
          <li>
            <Link href="/reviews" className="text-muted-foreground hover:text-foreground">Reviews</Link>
          </li>
          <li className="text-muted-foreground">/</li>
          <li>{review.title}</li>
        </ol>
      </nav>

      {/* Review Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{review.title}</h1>
          
          <div className="flex flex-wrap gap-4 mb-6">
            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="stars-container">
                {stars.map((star, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 ${
                      star === 'full' ? 'text-neon-yellow fill-neon-yellow' : 
                      star === 'half' ? 'text-neon-yellow fill-neon-yellow/50' : 
                      'text-muted-foreground'
                    }`}
                  />
                ))}
              </div>
              <span className="font-semibold">{review.rating.toFixed(1)}/5.0</span>
            </div>
            
            {/* Category */}
            <div className="text-muted-foreground">
              Category: <Link href={`/category/${review.category.toLowerCase()}`} className="hover:text-primary hover:underline">{review.category}</Link>
            </div>
            
            {/* Brand */}
            <div className="text-muted-foreground">
              Brand: <Link href={`/brand/${review.brand.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-primary hover:underline">{review.brand}</Link>
            </div>
            
            {/* Reviewed date */}
            <div className="text-muted-foreground">
              Reviewed: {new Date(review.reviewDate).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric'
              })}
            </div>
          </div>
          
          <p className="text-lg mb-8">{review.excerpt}</p>
        </div>
        
        {/* Quick Stats/Buy Card */}
        <div className="bg-card rounded-lg p-6 border border-border">
          {/* Price */}
          <div className="mb-4">
            {isOnSale ? (
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold">{formatPrice(review.salePrice)}</span>
                <span className="text-lg line-through text-muted-foreground">{formatPrice(review.price)}</span>
                <span className="bg-destructive text-destructive-foreground text-sm font-medium px-2 py-0.5 rounded-md">
                  {Math.round(((review.price - review.salePrice) / review.price) * 100)}% OFF
                </span>
              </div>
            ) : (
              <div className="text-2xl font-bold">{formatPrice(review.price)}</div>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="space-y-3 mb-6">
            <Button className="w-full" size="lg" asChild>
              <a href={review.affiliateUrl} target="_blank" rel="nofollow noopener">
                Get The Best Deal
              </a>
            </Button>
            
            <Button variant="outline" className="w-full gap-2" asChild>
              <a href={review.downloadUrl} target="_blank" rel="nofollow noopener">
                <Download className="h-4 w-4" />
                Download Trial
              </a>
            </Button>
          </div>
          
          {/* Quick Stats */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Release Date:</span>
              <span>{new Date(review.releaseDate).toLocaleDateString('en-US', {
                year: 'numeric', month: 'short'
              })}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Category:</span>
              <span>{review.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Download Size:</span>
              <span>{review.downloadSize}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Format:</span>
              <span>{review.systemRequirements.formats}</span>
            </div>
          </div>
          
          <div className="mt-6">
            <p className="text-xs text-muted-foreground affiliate-disclosure">
              As an affiliate, we may earn a commission from qualifying purchases.
            </p>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative aspect-video w-full rounded-lg overflow-hidden my-8">
        <Image
          src={review.heroImage}
          alt={review.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Pros & Cons */}
          <ProsConsTable pros={review.pros} cons={review.cons} className="mb-8" />
          
          {/* Review Scores */}
          <ReviewScores scores={review.scores} className="mb-8" />
          
          {/* YouTube Video */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Video Review</h2>
            <div className="relative aspect-video w-full rounded-lg overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${review.youtubeId}`}
                title={`${review.title} Video Review`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              ></iframe>
            </div>
          </div>
          
          {/* Main Review Content */}
          <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: review.content }}
          />
          
          {/* System Requirements */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">System Requirements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Windows</h3>
                <p className="text-sm">{review.systemRequirements.windows}</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Mac</h3>
                <p className="text-sm">{review.systemRequirements.mac}</p>
              </div>
            </div>
          </div>
          
          {/* Features Table */}
          <FeatureTable features={review.features} className="mb-8" />
          
          {/* Comments Section */}
          <ReviewComments reviewSlug={review.slug} />
        </div>
        
        {/* Sidebar */}
        <div className="space-y-8">
          {/* Affiliate Banners */}
          <div className="space-y-4">
            <AffiliateBanner
              src="/img/banners/sidebar-1.jpg"
              alt="Special Offer"
              href="https://example.com/affiliate-sidebar-1"
            />
            
            <AffiliateBanner
              src="/img/banners/sidebar-2.jpg"
              alt="Limited Time Deal"
              href="https://example.com/affiliate-sidebar-2"
            />
          </div>
          
          {/* Related Plugins */}
          <RelatedPlugins plugins={review.relatedPlugins} />
        </div>
      </div>
    </div>
  )
}
