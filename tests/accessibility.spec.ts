import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('commercial homepage has no serious accessibility issues at mobile and desktop', async ({page}) => {
 for (const width of [390,1280]) {
  await page.setViewportSize({width,height:850});
  await page.goto('/es');
  const results = await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
  const problems = results.violations.filter(item=>item.impact==='critical' || item.impact==='serious').map(item=>({
   id:item.id, impact:item.impact, description:item.help, nodes:item.nodes.map(node=>node.target.join(' ')).slice(0,5)
  }));
  expect(problems,JSON.stringify({width,problems},null,2)).toEqual([]);
 }
});

test('hero action and its demo occupy a usable first screen on desktop', async ({page}) => {
 await page.setViewportSize({width:1280,height:800});
 await page.goto('/es');
 const hero = await page.evaluate(()=>{
  const rect=(selector:string)=>document.querySelector(selector)!.getBoundingClientRect();
  const headline=rect('.at-hero h1'),action=rect('.at-hero .at-action--primary'),canvas=rect('.at-field-canvas');
  return {headline:headline.top,action:action.bottom,canvasTop:canvas.top,canvasBottom:canvas.bottom};
 });
 expect(hero.headline).toBeGreaterThanOrEqual(0);
 expect(hero.action).toBeLessThan(800);
 expect(hero.canvasTop).toBeLessThan(800);
 expect(hero.canvasBottom).toBeLessThanOrEqual(820);
});
