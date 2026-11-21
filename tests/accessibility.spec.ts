import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('no serious or critical WCAG violations on mobile and desktop', async ({page}) => {
  for (const width of [390,1280]) {
    await page.setViewportSize({width,height:850});
    await page.goto('/es');
    const report = await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
    const violations = report.violations
      .filter(item => item.impact === 'serious' || item.impact === 'critical')
      .map(item => ({id:item.id,impact:item.impact,targets:item.nodes.map(node => node.target.join(' ')).slice(0,4)}));
    expect(violations, 'width ' + width + ': ' + JSON.stringify(violations)).toEqual([]);
  }
});

test('the web offer and the inquiry action fit the desktop fold',async({page})=>{
  await page.setViewportSize({width:1280,height:800});
  await page.goto('/es');
  const result = await page.evaluate(() => {
    const rect = (selector:string) => document.querySelector(selector)!.getBoundingClientRect();
    return {title:rect('.aw-hero h1'),cta:rect('.aw-hero-actions .aw-button'),art:rect('.aw-proof-sheet')};
  });
  expect(result.title.top).toBeGreaterThanOrEqual(0);
  expect(result.cta.bottom).toBeLessThanOrEqual(800);
  expect(result.art.top).toBeLessThan(800);
});
