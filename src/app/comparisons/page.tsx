"use client";

import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Star, ChevronRight, Trophy } from 'lucide-react';
import products from '../../data/products';
import { cn } from '../../lib/utils';
import { Button } from '../../components/ui/button';
import BannerManager from '../../components/banners/banner-manager';

// Categories for filtering
const categories = [
  { id: 'Plugin', name: 'VST Plugins' },
  { id: 'SamplePack', name: 'Sample Packs' },
  { id: 'AITool', name: 'AI Tools' },
];

// Metadata is defined in layout.tsx

/**
 * Product Card Component
 */
const ProductCard = ({ product }) => {
  // Convert rating (0-5) to percentage (0-100) for styling
  const ratingPercentage = (product.rating / 5) * 100;
  
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative aspect-[4/3] bg-muted/50">
        {/* Product image or placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          {product.isTopPick && (
            <div className="absolute top-3 right-3 z-10 bg-amber-500/90 text-white text-xs font-bold py-1 px-2 rounded-full flex items-center">
              <Trophy className="h-3 w-3 mr-1" />
              TOP PICK
            </div>
          )}
          <span className="text-lg font-medium">{product.name}</span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold truncate">{product.name}</h3>
          <div className="text-sm text-muted-foreground">{product.brand}</div>
        </div>
        
        {/* Rating display */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star 
                key={star} 
                className={cn(
                  "h-4 w-4",
                  star <= Math.floor(product.rating) ? "fill-amber-500 text-amber-500" : "fill-muted text-muted"
                )} 
              />
            ))}
          </div>
          <span className="text-sm font-medium">{product.rating.toFixed(1)}</span>
        </div>
        
        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.description}</p>
        
        {/* Features badges */}
        <div className="mb-4">
          <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Key Features</h4>
          <div className="flex flex-wrap gap-1">
            {product.features.slice(0, 3).map((feature, index) => (
              <span 
                key={index} 
                className="inline-block bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full"
              >
                {feature}
              </span>
            ))}
            {product.features.length > 3 && (
              <span className="inline-block text-xs text-muted-foreground px-1 py-1">
                +{product.features.length - 3} more
              </span>
            )}
          </div>
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {product.tags.map((tag, index) => (
            <span key={index} className="text-xs text-muted-foreground">{tag}{index < product.tags.length - 1 ? ' • ' : ''}</span>
          ))}
        </div>
        
        {/* Action button */}
        <Button variant="outline" size="sm" className="w-full">
          View Details
        </Button>
      </div>
    </div>
  );
};

/**
 * Tier Section Component
 */
const TierSection = ({ title, description, color, products }) => {
  if (products.length === 0) {
    return null;
  }

  return (
    <div className="mb-12">
      <div className={cn(
        "py-2 px-4 rounded-lg mb-4 text-white font-bold",
        color
      )}>
        <h2 className="text-xl sm:text-2xl">{title}</h2>
        <p className="text-sm font-normal opacity-90">{description}</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

/**
 * ComingSoon Component
 */
const ComingSoon = () => (
  <div className="bg-muted/50 border border-dashed border-border rounded-lg p-8 flex flex-col items-center justify-center">
    <h3 className="text-xl font-bold mb-2">More Coming Soon</h3>
    <p className="text-muted-foreground text-center mb-4">We're constantly reviewing new products in this category.</p>
    <p className="text-sm text-primary">Check back soon for updates!</p>
  </div>
);

/**
 * Comparisons Page Component
 */
export default function ComparisonsPage() {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  // Filter products when category changes
  useEffect(() => {
    const filtered = products.filter(product => product.category === activeCategory);
    setFilteredProducts(filtered);
  }, [activeCategory]);
  
  // Group products into tiers based on rating
  const sTier = filteredProducts.filter(p => p.rating >= 4.8);
  const aTier = filteredProducts.filter(p => p.rating >= 4.5 && p.rating < 4.8);
  const bTier = filteredProducts.filter(p => p.rating < 4.5);
  
  // Get current category name
  const currentCategory = categories.find(c => c.id === activeCategory)?.name || '';
  
  // Extract brands from current category for contextual banners
  const categoryBrands = filteredProducts.map(product => product.brand);
  const uniqueBrands = Array.from(new Set(categoryBrands));
  
  return (
    <div className="container pt-20 pb-8">
      {/* Main heading */}
      <h1 className="text-3xl sm:text-4xl font-bold mb-4">Best {currentCategory} of 2025</h1>
      <p className="text-muted-foreground mb-8 max-w-3xl">
        Our expert team tests and compares the latest music production tools to help you find the best options for your studio. Updated monthly with the newest releases and features.
      </p>
      
      {/* Hero Banner */}
      <div className="mb-10">
        <BannerManager showHero={true} />
      </div>
      
      {/* Category selection */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(category => (
          <Button 
            key={category.id} 
            variant={activeCategory === category.id ? "default" : "outline"} 
            onClick={() => setActiveCategory(category.id)}
            className="px-6"
          >
            {category.name}
          </Button>
        ))}
      </div>
      
      <div className="mt-4">
        {/* Flexible banner system layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content column */}
          <div className="flex-1">
            {/* Tiers */}
            <TierSection
              title="S-Tier: The Absolute Best"
              description="Industry-leading products with exceptional quality and features"
              color="bg-gradient-to-r from-amber-500 to-orange-600"
              products={sTier}
            />
            
            <TierSection
              title="A-Tier: Excellent Options"
              description="Outstanding products with great features and performance"
              color="bg-gradient-to-r from-blue-500 to-indigo-600"
              products={aTier}
            />
            
            <TierSection
              title="B-Tier: Solid Choices"
              description="Good products that deliver solid results at competitive prices"
              color="bg-gradient-to-r from-emerald-500 to-teal-600"
              products={bTier}
            />
            
            {/* Show placeholder if few products */}
            {filteredProducts.length < 3 && (
              <div className="mt-12">
                <ComingSoon />
              </div>
            )}
          </div>
          
          {/* Sticky sidebar with relevant banners */}
          <div className="w-full lg:w-64">
            <div className="sticky top-24">
              <BannerManager 
                showSidebar={true} 
                relatedBrands={uniqueBrands} 
                pageCategory={currentCategory} 
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Contextual banners before methodology */}
      <div className="my-8">
        <BannerManager 
          showContextual={true} 
          relatedBrands={uniqueBrands} 
          pageCategory={currentCategory}
        />
      </div>
      
      {/* Methodology section */}
      <section className="mt-16 border-t border-border pt-8">
        <h2 className="text-2xl font-bold mb-4">Our Comparison Methodology</h2>
        <p className="text-muted-foreground mb-6">
          Each product is thoroughly evaluated by our team of music production experts based on sound quality,
          features, usability, value, and performance. Products are categorized into tiers based on overall rating
          and extensive hands-on testing in real studio environments.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 border border-border rounded-lg">
            <h3 className="font-bold mb-2">Testing Process</h3>
            <p className="text-sm text-muted-foreground">
              Each product undergoes 20+ hours of hands-on testing across multiple genres and production scenarios.
            </p>
          </div>
          <div className="p-4 border border-border rounded-lg">
            <h3 className="font-bold mb-2">Rating Criteria</h3>
            <p className="text-sm text-muted-foreground">
              Sound quality, feature set, user interface, performance, update frequency, and value for money.
            </p>
          </div>
          <div className="p-4 border border-border rounded-lg">
            <h3 className="font-bold mb-2">Update Schedule</h3>
            <p className="text-sm text-muted-foreground">
              All comparisons are reviewed monthly with new releases added and rankings adjusted accordingly.
            </p>
          </div>
        </div>
      </section>
      
      {/* Bottom banner */}
      <div className="mt-12">
        <BannerManager showBottom={true} />
      </div>
    </div>
  );
}
