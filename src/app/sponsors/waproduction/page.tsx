import React from 'react';
import WAProdShowcase from '../../../components/sections/wa-prod-showcase';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'WA Production Affiliate Deals | TopVSTs',
  description: 'Exclusive deals on premium audio plugins, samples, and music production tools from WA Production.',
  openGraph: {
    title: 'WA Production Deals | TopVSTs',
    description: 'Exclusive deals on premium audio plugins, samples, and music production tools from WA Production.',
    url: 'https://topvsts.com/sponsors/waproduction',
    siteName: 'TopVSTs',
    locale: 'en_US',
    type: 'website',
  },
};

export default function WAProdPage() {
  return (
    <div className="container max-w-6xl py-8">
      <WAProdShowcase />
    </div>
  );
}
