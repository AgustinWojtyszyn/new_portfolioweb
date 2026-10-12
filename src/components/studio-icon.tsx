import type { CSSProperties } from 'react';
const icons={web:'web-window',app:'app-window',automate:'database-stats',design:'design-nib',arrow:'arrow-up-right',right:'arrow-right',check:'check',mail:'mail',calendar:'calendar',data:'database',screen:'computer',reports:'report-columns',menu:'menu',close:'xmark'} as const;
export type IconName=keyof typeof icons;
export function StudioIcon({name,className=''}:{name:IconName;className?:string}){
 const image='/iconoir/'+icons[name]+'.svg';
 return <span className={'studio-icon '+className} aria-hidden="true" style={{maskImage:'url('+image+')',WebkitMaskImage:'url('+image+')'} as CSSProperties}/>;
}
