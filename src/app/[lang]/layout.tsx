import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Navigation } from '@/components/navigation';
import { isLanguage, languages, siteUrl } from '@/lib/site';
export function generateStaticParams() {return languages.map(lang=>({lang}));}
export async function generateMetadata({params}:{params:Promise<{lang:string}>}):Promise<Metadata> {
 const {lang}=await params; if(!isLanguage(lang)) notFound();
 const description=lang==='es'?'Páginas web profesionales, aplicaciones a medida y automatizaciones para comercios, profesionales y empresas. Desarrollo web personalizado en San Juan, Argentina.':'Professional websites, custom apps and workflow automation for businesses and teams. Independent web developer in Argentina.';
 const title=lang==='es'?'Agustín Wojtyszyn — Páginas web y aplicaciones a medida':'Agustín Wojtyszyn — Websites & Custom Applications';
 return {metadataBase:new URL(siteUrl), title:{default:title,template:'%s — Agustín Wojtyszyn'},description,alternates:{canonical:`/${lang}`,languages:{es:'/es',en:'/en','x-default':'/es'}},openGraph:{type:'website',locale:lang==='es'?'es_AR':'en_US',alternateLocale:lang==='es'?'en_US':'es_AR',siteName:'Agustín Wojtyszyn',title,description,url:`/${lang}`,images:[{url:'/opengraph-image',width:1200,height:630,alt:lang==='es'?'Páginas web y aplicaciones a medida':'Websites and custom applications'}]},twitter:{card:'summary_large_image',title,description,images:['/opengraph-image']},robots:process.env.SITE_URL?{index:true,follow:true}:{index:false,follow:true},icons:{icon:'/icon.svg'}};
}
export default async function LanguageLayout({children,params}:{children:React.ReactNode;params:Promise<{lang:string}>}) {
 const {lang}=await params;if(!isLanguage(lang))notFound();
 return <html lang={lang}><body><Navigation lang={lang}/>{children}</body></html>;
}
