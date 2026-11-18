import { test, expect } from '@playwright/test';

test('keyboard interaction, reduced motion and the contact dialog', async ({page}) => {
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/es');
 await expect(page.locator('.at-field canvas')).toBeVisible();
 await expect(page.locator('.at-field-modes button')).toHaveCount(3);
 await page.locator('.at-field-modes button').nth(2).focus();
 await page.keyboard.press('Enter');
 await expect(page.locator('.at-field-modes button').nth(2)).toHaveAttribute('aria-pressed','true');
 await page.getByRole('button',{name:'Quiero una web así'}).click();
 await expect(page.getByRole('dialog')).toBeVisible();
 await page.keyboard.press('Escape');
 await expect(page.getByRole('dialog')).toBeHidden();
});

test('core commercial content is visible without JavaScript', async ({browser}) => {
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
 const page=await context.newPage();
 await page.goto('http://127.0.0.1:3100/es');
 await expect(page.locator('h1')).toContainText('No otra página.');
 await expect(page.locator('.at-service-row')).toHaveCount(3);
 await expect(page.locator('.at-type-word')).toContainText('TU MARCA');
 await context.close();
});

test('homepage uses consistently dark surfaces, never a pastel or light panel',async({page})=>{
 await page.goto('/es');
 const backgrounds=await page.evaluate(()=>{
  const get=(selector:string)=>getComputedStyle(document.querySelector(selector)!).backgroundColor;
  return {body:get('body'),main:get('.at-page'),header:get('.at-header'),playground:get('.at-type-lab'),services:get('.at-services'),contact:get('.at-contact'),footer:get('.at-footer'),modal:get('.at-dialog')};
 });
 for(const [name,color] of Object.entries(backgrounds)) {
  const nums=color.match(/[\d.]+/g)?.slice(0,3).map(Number) || [];
  expect(nums.length,name).toBe(3);
  expect(Math.max(...nums),name+' '+color).toBeLessThan(95);
 }
});
