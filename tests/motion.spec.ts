import { test,expect } from '@playwright/test';

test('keyboard, disclosure, reduced motion and absence of RPG animation',async({page})=>{
 await page.goto('/es');
 await page.emulateMedia({reducedMotion:'reduce'});
 await expect(page.locator('.game-showcase')).toHaveCount(0);
 await expect(page.locator('#services')).toBeVisible();
 await page.getByRole('button',{name:/Pedir presupuesto/}).first().click();
 await expect(page.getByRole('dialog')).toBeVisible();
 await page.keyboard.press('Escape');
 await expect(page.getByRole('dialog')).toBeHidden();
 await page.locator('.cp-faq details').first().locator('summary').click();
 await expect(page.locator('.cp-faq details').first()).toHaveAttribute('open','');
});

test('commercial content remains visible without JavaScript',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
 const page=await context.newPage();await page.goto('http://127.0.0.1:3100/es');
 await expect(page.locator('h1')).toContainText('negocio');
 await expect(page.locator('#services .cp-service')).toHaveCount(3);
 await expect(page.locator('#work .cp-case')).toHaveCount(4);
 await expect(page.locator('.game-showcase')).toHaveCount(0);
 await context.close();
});
