import {test,expect} from '@playwright/test';

/** Temporary visual quality review: inspection images are not product assets. */
test('capture cinematic homepage at phone and desktop widths',async({page})=>{
 for(const width of [390,1440]){
  await page.setViewportSize({width,height:width===390?844:900});
  await page.goto('/es');
  await page.evaluate(()=>document.fonts.ready);
  await page.waitForTimeout(350);
  const screenshot=await page.screenshot({type:'jpeg',quality:48,fullPage:false});
  console.log('VXSHOT_'+width+'='+screenshot.toString('base64'));
  expect(screenshot.byteLength).toBeGreaterThan(1000);
 }
});
