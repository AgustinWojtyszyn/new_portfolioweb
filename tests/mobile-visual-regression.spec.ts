import { test, expect } from '@playwright/test';

const phoneWidths = [320,360,375,390,393,412,414,430,600,700];

test('critical mobile elements fit without clipping or overlapping', async ({page}) => {
  for(const width of phoneWidths) {
    await page.setViewportSize({width,height:844});
    await page.goto('/es');
    const layout = await page.evaluate(() => {
      const box = (selector:string) => {
        const r = document.querySelector(selector)!.getBoundingClientRect();
        return {left:r.left,right:r.right,top:r.top,bottom:r.bottom,width:r.width};
      };
      return {
        screen:window.innerWidth,
        root:document.documentElement.scrollWidth,
        body:document.body.scrollWidth,
        logo:box('.aw-logo'),
        languages:box('.aw-languages'),
        menu:box('.aw-menu-toggle'),
        heading:box('.aw-hero h1'),
        contact:box('.aw-hero-actions .aw-button'),
        hero:box('.aw-hero'),
        sheet:box('.aw-proof-sheet'),
        phone:box('.aw-proof-mobile')
      };
    });
    expect(layout.root,'document at '+width).toBeLessThanOrEqual(width+1);
    expect(layout.body,'body at '+width).toBeLessThanOrEqual(width+1);
    for(const name of ['logo','languages','menu','heading','contact'] as const) {
      expect(layout[name].left,name+' left at '+width).toBeGreaterThanOrEqual(-1);
      expect(layout[name].right,name+' right at '+width).toBeLessThanOrEqual(width+1);
    }
    expect(layout.logo.right,'logo/language collision at '+width).toBeLessThanOrEqual(layout.languages.left+1);
    expect(layout.languages.right,'language/menu collision at '+width).toBeLessThanOrEqual(layout.menu.left+1);
    expect(layout.contact.bottom,'contact appears without scrolling at '+width).toBeLessThanOrEqual(844);
    expect(layout.heading.width,'hero title has room at '+width).toBeGreaterThan(170);
    await expect(page.locator('.aw-nav-cta')).toBeHidden();
    await expect(page.locator('.aw-menu-toggle')).toBeVisible();
  }
});

test('desktop keeps visible navigation and the first-screen service offer',async({page})=>{
  for(const width of [1024,1280,1440,1920]){
    await page.setViewportSize({width,height:900});
    await page.goto('/es');
    await expect(page.locator('.aw-nav')).toBeVisible();
    await expect(page.locator('.aw-nav-cta')).toBeVisible();
    await expect(page.locator('.aw-hero h1')).toContainText('Páginas web');
    await expect(page.locator('.aw-proof-sheet')).toBeVisible();
    const dimensions=await page.evaluate(()=>({screen:innerWidth,scroll:document.documentElement.scrollWidth}));
    expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.screen+1);
  }
});
