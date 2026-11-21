import { test, expect } from '@playwright/test';

test('commercial content remains visible without JavaScript',async({browser})=>{
  const context = await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3100/es');
  await expect(page.locator('h1')).toContainText('Páginas web');
  await expect(page.locator('.aw-service-card')).toHaveCount(3);
  await expect(page.locator('.aw-contact a[href^="mailto:"]').first()).toBeVisible();
  await context.close();
});

test('reduced motion disables animated decoration and preserves content',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('/es');
  for(const selector of ['.aw-browser-front','.aw-art-star','.aw-ticker-inner']){
    const animation = await page.locator(selector).evaluate(el=>getComputedStyle(el).animationName);
    expect(animation,selector).toBe('none');
  }
  await expect(page.locator('.aw-hero h1')).toBeVisible();
  await expect(page.locator('.aw-showcase h2')).toBeVisible();
});

test('site intentionally combines dark and light editorial surfaces',async({page})=>{
  await page.goto('/es');
  const lightness = await page.evaluate(()=>{
    const brightness = (selector:string) => {
      const color = getComputedStyle(document.querySelector(selector)!).backgroundColor;
      const channels = color.match(/[\d.]+/g)?.slice(0,3).map(Number) ?? [];
      return channels.reduce((sum,value)=>sum+value,0)/3;
    };
    return {hero:brightness('.aw-hero'),manifesto:brightness('.aw-philosophy'),gallery:brightness('.aw-showcase'),services:brightness('.aw-services'),contact:brightness('.aw-contact')};
  });
  expect(lightness.hero).toBeLessThan(50);
  expect(lightness.manifesto).toBeGreaterThan(180);
  expect(lightness.gallery).toBeLessThan(50);
  expect(lightness.services).toBeGreaterThan(180);
  expect(lightness.contact).toBeGreaterThan(140);
});
