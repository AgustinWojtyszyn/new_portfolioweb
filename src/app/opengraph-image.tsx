import { ImageResponse } from 'next/og';

export const alt = 'Agustín Wojtyszyn — Diseño y desarrollo de páginas web, aplicaciones y tiendas online';
export const size = { width:1200, height:630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    <div style={{width:'100%',height:'100%',display:'flex',background:'#101b14',color:'#f2f3e9',fontFamily:'sans-serif',overflow:'hidden'}}>
      <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',padding:'56px 54px 50px 64px',width:'67%'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',fontSize:23,fontWeight:800}}>
          <span>Agustín Wojtyszyn</span>
          <span style={{fontSize:16,color:'#dfff75'}}>✳</span>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:5}}>
          <span style={{fontSize:23,color:'#dfff75',fontWeight:700}}>DISEÑO Y DESARROLLO WEB</span>
          <span style={{fontSize:88,lineHeight:1.01,letterSpacing:-5,fontWeight:900}}>Páginas web</span>
          <span style={{fontSize:88,lineHeight:1.01,letterSpacing:-5,fontWeight:900}}>que dejan</span>
          <span style={{fontSize:95,lineHeight:1.02,letterSpacing:-4,fontWeight:700,color:'#dfff75'}}>huella.</span>
        </div>
        <div style={{display:'flex',justifyContent:'space-between',fontSize:16,color:'#a9bda9',paddingTop:15,borderTop:'1px solid #465a48'}}>
          <span>Sitios web · Tiendas · Sistemas</span><span>San Juan, Argentina</span>
        </div>
      </div>
      <div style={{background:'#dfff75',width:'33%',display:'flex',alignItems:'center',justifyContent:'center',position:'relative',padding:40}}>
        <div style={{width:300,height:390,background:'#edf0e6',display:'flex',flexDirection:'column',border:'12px solid #18251a',transform:'rotate(-9deg)',boxShadow:'18px 24px 0 rgba(18,35,21,.24)'}}>
          <div style={{height:42,display:'flex',alignItems:'center',paddingLeft:18,background:'#e7ebdd',color:'#203324',fontSize:21,fontWeight:900}}>studio.</div>
          <div style={{flex:1,display:'flex',flexDirection:'column',justifyContent:'space-between',background:'#739b78',padding:20}}>
            <div style={{display:'flex',width:150,height:150,borderRadius:150,border:'25px solid #dce7ce',alignSelf:'flex-end',boxShadow:'inset 10px 9px 0 #3e694c'}}/>
            <div style={{fontSize:35,fontWeight:900,lineHeight:1.1,letterSpacing:-2,color:'#f7f8e8'}}>MADE TO<br/>STAND OUT.</div>
          </div>
        </div>
      </div>
    </div>,
    size
  );
}
