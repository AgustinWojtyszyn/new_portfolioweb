import { test, expect } from '@playwright/test';

test('the three-act cinematic sequence transforms when the visitor scrolls', async ({page}) => {
  await page.setViewportSize({width:390,height:844});
  await page.goto('/es');
  const section=page.locator('.vx-film');
  await expect(section).toHaveCount(1);
  await expect(section.locator('.vx-film-act')).toHaveCount(3);
  const y=await section.evaluate(el=>el.getBoundingClientRect().top+window.scrollY);
  await page.evaluate(value=>window.scrollTo(0,value),y);
  await expect(section).toHaveClass(/is-playing/);
  const state1=await section.evaluate(el=>({
    progress:parseFloat(el.style.getPropertyValue('--vx-fp')),
    sculpture:getComputedStyle(el.querySelector('.vx-film-sculpture')!).transform,
    sceneOne:getComputedStyle(el.querySelector('.vx-film-act--0')!).opacity
  }));
  await page.evaluate(value=>window.scrollTo(0,value+window.innerHeight*1.4),y);
  await expect.poll(async()=>section.evaluate(el=>parseFloat(el.style.getPropertyValue('--vx-fp')))).toBeGreaterThan(.60);
  const state2=await section.evaluate(el=>({
    progress:parseFloat(el.style.getPropertyValue('--vx-fp')),
    sculpture:getComputedStyle(el.querySelector('.vx-film-sculpture')!).transform,
    sceneThree:getComputedStyle(el.querySelector('.vx-film-act--2')!).opacity
  }));
  expect(state1.progress).toBeLessThan(.1);
  expect(state1.sceneOne).toBe('1');
  expect(state2.progress).toBeGreaterThan(state1.progress+.5);
  expect(state2.sculpture).not.toBe(state1.sculpture);
  expect(Number(state2.sceneThree)).toBeGreaterThan(0);
});

test('mobile hero, optical letter, orbit and modular sculpture have real motion',async({page})=>{
 await page.goto('/es');
 for(const selector of ['.vx-hero-art .vx-sculpture','.vx-typeplate-glyph--core','.vx-motionstudy-orb','.vx-build-architecture','.vx-kinetic-band-track']){
  const name=await page.locator(selector).evaluate(el=>getComputedStyle(el).animationName);
  expect(name,selector).not.toBe('none');
 }
 await expect(page.locator('.vx-page input,.vx-page canvas')).toHaveCount(0);
});

test('reduced-motion visitors get static, readable chapters without scroll hijacking',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/es');
 await expect(page.locator('.vx-film')).not.toHaveClass(/is-playing/);
 await expect(page.locator('.vx-film-act')).toHaveCount(3);
 await expect(page.locator('.vx-film-act h2')).toHaveCount(3);
 for(const selector of ['.vx-kinetic-band-track','.vx-motionstudy-orb','.vx-build-architecture','.vx-typeplate-glyph--core']){
  expect(await page.locator(selector).evaluate(el=>getComputedStyle(el).animationName),selector).toBe('none');
 }
});
