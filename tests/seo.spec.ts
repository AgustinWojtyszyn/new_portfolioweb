import { test, expect } from '@playwright/test';
test('robots, canonical, bilingual sitemap without client projects',async({page})=>{
 const robots=await page.request.get('/robots.txt');
 expect(robots.status()).toBe(200);
 expect(await robots.text()).toContain('Allow: /');
 const sitemap=await page.request.get('/sitemap.xml');
 const xml=await sitemap.text();
 for(const path of ['/es','/en','/es/servicios/paginas-web','/en/servicios/aplicaciones-a-medida','/es/servicios/automatizacion'])expect(xml).toContain('https://agustinwojtyszyn.com'+path);
 expect(xml).not.toContain('/work/servifood-');
 await page.goto('/es');
 await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href','https://agustinwojtyszyn.com/es');
 await expect(page.locator('meta[name="description"]')).toHaveAttribute('content',/San Juan/);
 await expect(page.locator('h1')).toHaveCount(1);
 const schema=await page.locator('script[type="application/ld+json"]').allTextContents();
 expect(schema.some(value=>value.includes('https://schema.org')&&value.includes('Person'))).toBeTruthy();
});
test('service detail metadata and contact remain functional',async({page})=>{
 await page.goto('/es/servicios/paginas-web');
 await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href','https://agustinwojtyszyn.com/es/servicios/paginas-web');
 expect(await page.locator('script[type="application/ld+json"]').count()).toBeGreaterThanOrEqual(2);
 await page.goto('/en/servicios/aplicaciones-a-medida');
 await expect(page.locator('html')).toHaveAttribute('lang','en');
 await expect(page.locator('h1')).toContainText('Custom web applications');
});