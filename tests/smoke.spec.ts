import { test,expect } from '@playwright/test';
test('bilingual home, cases and mobile navigation',async({page})=>{
 const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));
 await page.goto('/es');await expect(page.locator('html')).toHaveAttribute('lang','es');await expect(page.locator('h1')).toContainText('mundo real');
 for(const width of [1440,768,390]){await page.setViewportSize({width,height:900});await expect(page.locator('#contact')).toBeAttached();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();}
 await page.getByRole('button',{name:'Abrir navegación'}).click();await page.locator('#main-navigation').getByRole('link',{name:'Proyectos',exact:true}).click();await expect(page.getByRole('button',{name:'Abrir navegación'})).toHaveAttribute('aria-expanded','false');
 await page.goto('/es/work/servifood-orders');await expect(page.locator('h1')).toContainText('solo el principio');await page.getByRole('link',{name:'EN',exact:true}).click();await expect(page).toHaveURL(/\/en\/work\/servifood-orders/);await expect(page.locator('html')).toHaveAttribute('lang','en');
 await page.goto('/en');await expect(page.locator('h1')).toContainText('real world');
 await page.emulateMedia({reducedMotion:'reduce'});await page.locator('#midnight').scrollIntoViewIfNeeded();await expect(page.getByRole('button',{name:'Animate scene',exact:true})).toBeVisible();
 expect(errors).toEqual([]);
});
