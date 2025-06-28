import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Music Production Tools & VST Plugins Compared | TopVSTs',
  description: 'Compare the best music production tools, VST plugins, sample packs, and AI music tools of 2025. Find expert ratings, features, and detailed comparisons.',
  keywords: 'best vst plugins, music production tools comparison, top sample packs, AI music tools ranking',
  openGraph: {
    title: 'Best Music Production Tools Compared | TopVSTs',
    description: 'Expert comparisons of the top VST plugins, sample packs, and AI music tools for producers.',
    type: 'website',
  },
};

export default function ComparisonsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}
