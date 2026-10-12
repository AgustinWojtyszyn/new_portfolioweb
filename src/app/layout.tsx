import type { Metadata } from 'next';
import { siteUrl } from '@/lib/site';
import './base.css';
import './studio.css';
import './studio-dark.css';
import './studio-visual-rich.css';
import './signature.css';
export const metadata: Metadata = { metadataBase: new URL(siteUrl) };
export default function RootLayout({children}:{children:React.ReactNode}) {return children;}
