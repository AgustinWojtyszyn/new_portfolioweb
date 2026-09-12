import { test, expect } from '@playwright/test';

test('atlas interaction, progress, reveal and reduced-motion fallback',async({page})=>{
 await page.setViewportSize({width:1440,height:1000});
 await page.goto('/es');
 const atlas=page.locator('.system-map');
 await expect(atlas).toHaveClass(/motion-active/);
 await atlas.getByRole('link',{name:/Analytics/}).hover();
 await expect(atlas.getByRole('link',{name:/Analytics/})).toHaveClass(/active/);
 await expect(page.locator('.hero-top')).toContainText('AGUSTÍN FERNANDO WOJTYSZYN');
 await expect(page.locator('.hero-bottom')).toContainText('26 años');
 await page.locator('#contact').scrollIntoViewIfNeeded();
 await expect(page.locator('.contact-bottom')).toHaveAttribute('data-reveal','visible');
 await expect(atlas).not.toHaveClass(/motion-active/);
 expect(await page.locator('.scroll-progress').evaluate(el=>Number((el as HTMLElement).style.getPropertyValue('--progress')))).toBeGreaterThan(.8);
 await page.emulateMedia({reducedMotion:'reduce'});
 await expect(page.locator('[data-reveal=pending]')).toHaveCount(0);
 await expect(page.locator('.scroll-progress')).toBeHidden();
 await page.locator('#midnight').scrollIntoViewIfNeeded();
 await expect(page.getByRole('button',{name:'Animar escena',exact:true})).toBeVisible();
 await expect(page.locator('.road-scene')).not.toHaveClass(/road-running/);
 await page.emulateMedia({reducedMotion:'no-preference'});
 await expect(page.getByRole('button',{name:'Pausar escena',exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Pausar escena',exact:true}).click();
 await expect(page.locator('.road-scene')).not.toHaveClass(/road-running/);
});

test('content and diagrams remain available without JavaScript',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
 const page=await context.newPage();await page.goto('http://127.0.0.1:3100/es');
 await expect(page.locator('h1')).toContainText('mundo real');
 await expect(page.locator('.atlas-connection')).toHaveCount(5);
 await expect(page.locator('.contact-bottom')).toBeVisible();
 await expect(page.locator('img')).toHaveCount(0);
 await context.close();
});
