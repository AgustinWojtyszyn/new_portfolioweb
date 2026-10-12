import { ImageResponse } from 'next/og';
export const alt='Agustín Wojtyszyn — Desarrollo web y aplicaciones a medida';
export const size={width:1200,height:630};
export const contentType='image/png';
export default function Image(){return new ImageResponse(<div style={{background:'#11161d',color:'#e8edf2',width:'100%',height:'100%',display:'flex',padding:'66px',flexDirection:'column',justifyContent:'space-between',fontFamily:'sans-serif'}}>
 <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',fontSize:23,fontWeight:750}}><span>Agustín Wojtyszyn</span><span style={{display:'flex',background:'#293e65',color:'#e8edf2',padding:'14px 16px',fontSize:22}}>aw</span></div>
 <div style={{display:'flex',flexDirection:'column',fontSize:80,fontWeight:800,letterSpacing:-4,lineHeight:1.1}}><span>Páginas web</span><span>y aplicaciones</span><span style={{color:'#afc3ff'}}>a medida.</span></div>
 <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',borderTop:'1px solid #3b4b5b',paddingTop:22,fontSize:19,color:'#b4c1d1'}}><span>WEB DESIGN / CUSTOM APPS</span><span>San Juan, Argentina</span></div>
 </div>,size);}
