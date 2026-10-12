import { test,expect } from '@playwright/test';
test('keyboard operation, FAQ and reduced motion',async({page})=>{
 await page.goto('/es');await page.emulateMedia({reducedMotion:'reduce'});
 await expect(page.locator('.game-showcase')).toHaveCount(0);
 await expect(page.locator('.aw-evidence-hero')).toBeVisible();
 await expect(page.locator('.aw-service-visual')).toHaveCount(3);
 await page.getByRole('button',{name:/Contame tu proyecto/}).first().click();
 await expect(page.getByRole('dialog')).toBeVisible();
 await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).toBeHidden();
 const faq=page.locator('.studio-faq details').first();
 await faq.locator('summary').click();await expect(faq).toHaveAttribute('open','');
});
test('important content loads without JavaScript',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
 const page=await context.newPage();await page.goto('http://127.0.0.1:3100/es');
 await expect(page.locator('h1')).toContainText('Hago webs');
 await expect(page.locator('.studio-service')).toHaveCount(3);
 await expect(page.locator('.studio-project')).toHaveCount(3);
 await context.close();
});

test('site uses consistent dark backgrounds without dazzling light sections',async({page})=>{
 await page.goto('/es');
 const actual=await page.evaluate(()=>{
   const background=(query:string)=>getComputedStyle(document.querySelector(query)!).backgroundColor;
   return {body:background('body'),main:background('.studio-page'),header:background('.studio-header'),work:background('.studio-work-section'),contact:background('.studio-contact'),footer:background('.studio-footer'),dialog:background('.studio-dialog-inner')};
 });
 // Every major area stays in a comfortable dark range.
 for(const [section,color] of Object.entries(actual)){
   const nums=color.match(/[\d.]+/g)?.slice(0,3).map(Number)||[];
   expect(nums.length,section).toBe(3);
   expect(Math.max(...nums),section+' '+color).toBeLessThan(120);
 }
 await page.goto('/en/work/servifood-orders');
 const projectBg=await page.locator('main').evaluate(el=>getComputedStyle(el).backgroundColor);
 expect(projectBg).not.toBe('rgb(246, 245, 240)');
});
