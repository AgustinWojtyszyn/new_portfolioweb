import { test,expect } from '@playwright/test';
test('keyboard operation, FAQ and reduced motion',async({page})=>{
 await page.goto('/es');await page.emulateMedia({reducedMotion:'reduce'});
 await expect(page.locator('.game-showcase')).toHaveCount(0);
 await page.getByRole('button',{name:/Contame tu proyecto/}).first().click();
 await expect(page.getByRole('dialog')).toBeVisible();
 await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).toBeHidden();
 const faq=page.locator('.studio-faq details').first();
 await faq.locator('summary').click();await expect(faq).toHaveAttribute('open','');
});
test('important content loads without JavaScript',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
 const page=await context.newPage();await page.goto('http://127.0.0.1:3100/es');
 await expect(page.locator('h1')).toContainText('Páginas web y apps');
 await expect(page.locator('.studio-service')).toHaveCount(3);
 await expect(page.locator('.studio-project')).toHaveCount(3);
 await context.close();
});
