import type { Metadata } from 'next';
import { siteUrl } from '@/lib/site';
import './globals.css';
import './motion.css';
export const metadata: Metadata = { metadataBase: new URL(siteUrl) };
export default function RootLayout({children}:{children:React.ReactNode}) {return children;}
