import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('WCAG serious and critical issues: none at mobile and desktop',async({page})=>{
 for(const width of [390,1280]){
  await page.setViewportSize({width,height:850});
  await page.goto('/es');
  const results=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
  const violations=results.violations.filter(item=>item.impact==='serious'||item.impact==='critical').map(item=>({id:item.id,impact:item.impact,targets:item.nodes.map(x=>x.target.join(' ')).slice(0,4)}));
  expect(violations,'width '+width+': '+JSON.stringify(violations)).toEqual([]);
 }
});
test('hero title and a direct hiring action fit the desktop fold',async({page})=>{
 await page.setViewportSize({width:1280,height:800});
 await page.goto('/es');
 const r=await page.evaluate(()=>{
  const rect=(s:string)=>document.querySelector(s)!.getBoundingClientRect();
  return {heading:rect('.vx-hero h1'),cta:rect('.vx-hero .vx-primary-link'),sculpture:rect('.vx-sculpture')};
 });
 expect(r.heading.top).toBeGreaterThanOrEqual(0);
 expect(r.cta.bottom).toBeLessThanOrEqual(800);
 expect(r.sculpture.top).toBeLessThan(800);
});