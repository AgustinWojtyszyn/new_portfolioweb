import {test,expect} from '@playwright/test';
test('all essential text is accessible without JavaScript',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
 const page=await context.newPage();await page.goto('http://127.0.0.1:3100/es');
 await expect(page.locator('h1')).toContainText('Hagamos algo');
 await expect(page.locator('.vx-service')).toHaveCount(3);
 await expect(page.locator('.vx-contact a[href^="mailto:"]')).toBeVisible();
 await context.close();
});
test('reduced motion disables cinematic loops, content stays visible',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/es');
 const check=await page.locator('.vx-sculpture-front').evaluate(el=>getComputedStyle(el).animationName);
 expect(check).toBe('none');
 await expect(page.locator('.vx-hero h1')).toBeVisible();
 await expect(page.locator('.vx-motion-chapter h2')).toBeVisible();
});
test('major surfaces are dark, never neon or light cards',async({page})=>{
 await page.goto('/es');
 const surfaces=await page.evaluate(()=>{
  const get=(selector:string)=>getComputedStyle(document.querySelector(selector)!).backgroundColor;
  return {main:get('.vx-page'),header:get('.vx-header'),statement:get('.vx-statement'),services:get('.vx-services'),contact:get('.vx-contact')};
 });
 for(const [name,value] of Object.entries(surfaces)){
  const rgb=value.match(/[\d.]+/g)?.slice(0,3).map(Number)??[];
  expect(rgb.length,name).toBe(3);expect(Math.max(...rgb),name).toBeLessThan(45);
 }
});