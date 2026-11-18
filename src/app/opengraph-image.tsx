import {ImageResponse} from 'next/og';
export const alt='Agustín Wojtyszyn — Hagamos algo que no se olvide';
export const size={width:1200,height:630};
export const contentType='image/png';
export default function Image(){
 return new ImageResponse(
  <div style={{width:'100%',height:'100%',background:'#090a0c',color:'#ece8e3',display:'flex',flexDirection:'column',justifyContent:'space-between',padding:'70px 78px',fontFamily:'sans-serif'}}>
   <div style={{display:'flex',justifyContent:'space-between',fontSize:24,fontWeight:700}}><span>Agustín Wojtyszyn</span><span style={{fontSize:15,color:'#c7c1bd'}}>Diseño & desarrollo</span></div>
   <div style={{fontSize:92,lineHeight:1,letterSpacing:-7,fontWeight:900,display:'flex',flexDirection:'column'}}><span>Hagamos algo</span><span>que no se olvide.</span></div>
   <div style={{display:'flex',justifyContent:'space-between',borderTop:'1px solid #39383b',paddingTop:19,fontSize:17,color:'#c7c1bd'}}><span>Experiencias digitales con identidad propia</span><span>San Juan, Argentina</span></div>
  </div>,size);
}
