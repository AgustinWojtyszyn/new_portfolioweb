import { notFound } from 'next/navigation';
import { Hero,SelectedWork,Ecosystem,Midnight,Experience,Stack,Evolution,About,Contact,Footer } from '@/sections/home';
import { identity,isLanguage,siteUrl } from '@/lib/site';
export default async function Home({params}:{params:Promise<{lang:string}>}) {
 const {lang}=await params;if(!isLanguage(lang))notFound();
 const person={'@context':'https://schema.org','@type':'Person',name:identity.name,jobTitle:'Full Stack Web Developer',url:`${siteUrl}/${lang}`,email:identity.email,address:{'@type':'PostalAddress',addressLocality:'San Juan',addressCountry:'AR'},sameAs:[identity.github,identity.linkedin]};
 return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(person).replace(/</g,'\\u003c')}}/><main id="main"><Hero lang={lang}/><SelectedWork lang={lang}/><Ecosystem lang={lang}/><Midnight lang={lang}/><Experience lang={lang}/><Stack lang={lang}/><Evolution lang={lang}/><About lang={lang}/><Contact lang={lang}/></main><Footer lang={lang}/></>;
}
