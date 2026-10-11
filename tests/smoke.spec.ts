import { test,expect } from '@playwright/test';

test('commercial homepage: clear offer, case studies, mobile navigation and languages',async({page})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/es');
 await expect(page.locator('html')).toHaveAttribute('lang','es');
 await expect(page.locator('h1')).toContainText('negocio');
 await expect(page.locator('#services .cp-service')).toHaveCount(3);
 await expect(page.locator('#work .cp-case')).toHaveCount(4);
 await expect(page.locator('.game-showcase')).toHaveCount(0);
 for(const width of [1440,768,390]){await page.setViewportSize({width,height:900});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();}
 await page.setViewportSize({width:390,height:850});
 await page.getByRole('button',{name:'Abrir navegación'}).click();
 await page.locator('#main-navigation').getByRole('link',{name:'Servicios'}).click();
 await expect(page.getByRole('button',{name:'Abrir navegación'})).toHaveAttribute('aria-expanded','false');
 await page.getByRole('button',{name:/Pedir presupuesto/}).first().click();
 await expect(page.getByRole('dialog')).toBeVisible();
 await page.getByRole('dialog').getByLabel('Tu nombre').fill('Persona de prueba');
 await page.getByRole('dialog').getByLabel('¿Qué te gustaría hacer?').fill('Quiero una página para mi negocio');
 await expect(page.getByRole('dialog').getByRole('button',{name:/Abrir mi correo/})).toBeEnabled();
 await page.getByRole('dialog').getByRole('button',{name:'Cerrar'}).click();
 await expect(page.getByRole('dialog')).toBeHidden();
 await page.getByRole('link',{name:'EN',exact:true}).click();
 await expect(page).toHaveURL(/\/en$/);
 await expect(page.locator('h1')).toContainText('business');
 await expect(page.locator('#work .cp-case')).toHaveCount(4);
 await page.locator('.cp-case').first().click();
 await expect(page).toHaveURL(/\/en\/work\/servifood-orders/);
 expect(errors).toEqual([]);
});
