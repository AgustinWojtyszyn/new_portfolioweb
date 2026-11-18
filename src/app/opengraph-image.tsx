import { ImageResponse } from 'next/og';
export const alt = 'Agustín Wojtyszyn — No otra página. Una experiencia.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default function Image() {
 return new ImageResponse(
  <div style={{background:'#0a0b0d',width:'100%',height:'100%',display:'flex',flexDirection:'column',justifyContent:'space-between',padding:'62px 70px',color:'#f0eee9',fontFamily:'sans-serif'}}>
   <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',fontSize:25,fontWeight:700}}>
    <span>Agustín Wojtyszyn</span><span style={{color:'#b5b4b1',fontSize:18}}>Diseño y desarrollo</span>
   </div>
   <div style={{display:'flex',flexDirection:'column',gap:12,letterSpacing:-5,fontWeight:900,fontSize:86,lineHeight:1}}>
    <span>No otra página.</span><span>Una experiencia.</span>
   </div>
   <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',borderTop:'2px solid #303136',paddingTop:20,color:'#b5b4b1',fontSize:17}}>
    <span>Diseño digital con identidad propia</span><span>San Juan, Argentina</span>
   </div>
  </div>,size);
}