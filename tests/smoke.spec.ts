import { test, expect } from '@playwright/test';

test('bilingual interactive portfolio keeps real controls and direct contact', async ({ page }) => {
 const errors: string[] = [];
 page.on('pageerror',error => errors.push(error.message));
 await page.goto('/es');
 await expect(page.locator('html')).toHaveAttribute('lang','es');
 await expect(page.locator('h1')).toContainText('No otra página.');
 await expect(page.locator('h1')).toContainText('Una experiencia.');
 await expect(page.locator('.at-field canvas')).toBeVisible();
 await expect(page.locator('.at-field-modes button')).toHaveCount(3);
 await page.locator('.at-field-modes button').nth(1).click();
 await expect(page.locator('.at-field-modes button').nth(1)).toHaveAttribute('aria-pressed','true');
 await page.getByRole('button',{name:'Pausar movimiento'}).click();
 await expect(page.getByRole('button',{name:'Reanudar movimiento'})).toBeVisible();

 await expect(page.locator('#services .at-service-row')).toHaveCount(3);
 await expect(page.locator('#services .at-service-link')).toHaveCount(3);
 await expect(page.locator('a[href*="/work/"]')).toHaveCount(0);
 const text = await page.locator('.at-page').innerText();
 expect(text).not.toMatch(/ServiFood|gestiQa|EPSE|Clientes reales|client projects/i);

 await page.getByLabel('Nombre o palabra de tu marca').fill('Vórtice');
 await expect(page.locator('.at-type-word')).toContainText('Vórtice');
 await page.getByRole('button',{name:'Editorial',exact:true}).click();
 await expect(page.locator('.at-type-preview')).toHaveClass(/at-type-preview--editorial/);
 await page.getByLabel('Escala visual').fill('105');
 await expect(page.locator('.at-type-range-label output')).toContainText('105%');
 await page.getByRole('button',{name:'Restablecer'}).click();
 await expect(page.locator('.at-type-word')).toContainText('TU MARCA');

 await page.setViewportSize({width:390,height:844});
 await page.getByRole('button',{name:'Abrir menú'}).click();
 await expect(page.locator('#at-navigation')).toBeVisible();
 await page.locator('#at-navigation').getByRole('link',{name:'Servicios'}).click();
 await expect(page.getByRole('button',{name:'Abrir menú'})).toHaveAttribute('aria-expanded','false');

 await page.getByRole('button',{name:'Quiero una web así'}).click();
 const dialog = page.getByRole('dialog');
 await expect(dialog).toBeVisible();
 await dialog.getByLabel('Tu nombre').fill('Visitante de prueba');
 await dialog.getByLabel('Contame de tu proyecto').fill('Quiero un sitio que destaque');
 await expect(dialog.getByRole('button',{name:'Abrir mi correo'})).toBeEnabled();
 await dialog.getByRole('button',{name:'Cerrar'}).click();
 await expect(dialog).toBeHidden();

 await page.getByRole('link',{name:'EN',exact:true}).click();
 await expect(page).toHaveURL(/\/en$/);
 await expect(page.locator('html')).toHaveAttribute('lang','en');
 await expect(page.locator('h1')).toContainText('Not another website.');
 await expect(page.locator('.at-type-word')).toContainText('YOUR BRAND');
 await expect(page.locator('#services .at-service-row')).toHaveCount(3);
 expect(errors).toEqual([]);
});

test('no horizontal overflow on mobile, tablet, and desktop', async ({ page }) => {
 await page.goto('/es');
 for (const width of [320,360,375,390,430,600,700,768,800,960,1024,1280,1440,1920]) {
  await page.setViewportSize({width,height:850});
  await page.evaluate(() => document.fonts.ready);
  const dimensions = await page.evaluate(() => ({
   doc: document.documentElement.scrollWidth,
   body: document.body.scrollWidth,
   viewport: innerWidth,
   hero: document.querySelector('.at-hero')!.getBoundingClientRect().right,
   lab: document.querySelector('.at-type-lab')!.getBoundingClientRect().right
  }));
  expect(dimensions.doc, width+' document overflow').toBeLessThanOrEqual(width+1);
  expect(dimensions.body, width+' body overflow').toBeLessThanOrEqual(width+1);
  expect(dimensions.hero, width+' hero overflow').toBeLessThanOrEqual(width+1);
  expect(dimensions.lab, width+' lab overflow').toBeLessThanOrEqual(width+1);
 }
});
