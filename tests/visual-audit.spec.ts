import {test,expect} from '@playwright/test';
/** Temporary visual review captures - removed after final inspection. */
test('cinematic visual review for mobile and desktop',async({page})=>{
 for(const width of [390,1440]){
  await page.setViewportSize({width,height:width===390?844:900});
  await page.goto('/es');
  await page.evaluate(()=>document.fonts.ready);
  for(const [label,selector] of [['hero','.vx-hero'],['identity','.vx-chapter--direction'],['motion','.vx-motion-chapter'],['services','.vx-services'],['contact','.vx-contact']] as const){
   await page.locator(selector).scrollIntoViewIfNeeded();
   await page.waitForTimeout(100);
   const shot=await page.screenshot({type:'jpeg',quality:38,fullPage:false});
   console.log('VXSHOT_'+width+'_'+label+'='+shot.toString('base64'));
   expect(shot.byteLength).toBeGreaterThan(800);
  }
 }
});
