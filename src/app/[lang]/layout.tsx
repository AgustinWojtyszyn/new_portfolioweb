import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MotionLayer } from '@/components/motion-layer';
import { Navigation } from '@/components/navigation';
import { isLanguage, languages, siteUrl } from '@/lib/site';
export function generateStaticParams() {return languages.map(lang=>({lang}));}
export async function generateMetadata({params}:{params:Promise<{lang:string}>}):Promise<Metadata> {
 const {lang}=await params; if(!isLanguage(lang)) notFound();
 const description=lang==='es'?'Desarrollador Full Stack en San Juan, Argentina. Software operativo, plataformas de datos y sistemas interactivos, desde la arquitectura hasta producción.':'Full Stack Developer from San Juan, Argentina building production software, operational platforms, data systems and interactive web experiences.';
 return {metadataBase:new URL(siteUrl), title:{default:'Agustín Wojtyszyn — Full Stack Developer',template:'%s — Agustín Wojtyszyn'},description,alternates:{canonical:`/${lang}`,languages:{es:'/es',en:'/en','x-default':'/es'}},openGraph:{type:'website',locale:lang==='es'?'es_AR':'en_US',alternateLocale:lang==='es'?'en_US':'es_AR',siteName:'Agustín Wojtyszyn / System Atlas',title:'Agustín Wojtyszyn — Full Stack Developer',description,url:`/${lang}`,images:[{url:'/opengraph-image',width:1200,height:630,alt:'Agustín Wojtyszyn — Building systems for the real world.'}]},twitter:{card:'summary_large_image',title:'Agustín Wojtyszyn — Full Stack Developer',description,images:['/opengraph-image']},robots:process.env.SITE_URL?{index:true,follow:true}:{index:false,follow:true},icons:{icon:'/icon.svg'}};
}
export default async function LanguageLayout({children,params}:{children:React.ReactNode;params:Promise<{lang:string}>}) {
 const {lang}=await params;if(!isLanguage(lang))notFound();
 return <html lang={lang}><body><Navigation lang={lang}/>{children}<MotionLayer/></body></html>;
}
