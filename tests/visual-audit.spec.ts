import {test,expect} from '@playwright/test';

test('visual design review captures every scene on mobile and desktop',async({page})=>{
 for(const width of [390,1440]){
  const height=width===390?844:900;
  await page.setViewportSize({width,height});
  await page.goto('/es');
  await page.evaluate(()=>document.fonts.ready);
  const capture=async(label:string)=>{
   await page.waitForTimeout(280);
   const shot=await page.screenshot({type:'jpeg',quality:40,fullPage:false});
   console.log('VXMOTION_'+width+'_'+label+'='+shot.toString('base64'));
   expect(shot.byteLength).toBeGreaterThan(1000);
  };
  await capture('hero');
  const film=await page.locator('.vx-film').evaluate(el=>({top:el.getBoundingClientRect().top+window.scrollY,length:el.getBoundingClientRect().height}));
  for(const [label,progress] of [['film-one',.04],['film-two',.47],['film-three',.93]] as const){
   await page.evaluate(value=>window.scrollTo(0,value),film.top+(film.length-height)*progress);
   await capture(label);
  }
  for(const [label,selector] of [['letter','.vx-chapter--direction'],['orbit','.vx-motion-chapter'],['building','.vx-chapter--engineering']] as const){
   await page.locator(selector).scrollIntoViewIfNeeded();
   await capture(label);
  }
 }
});
