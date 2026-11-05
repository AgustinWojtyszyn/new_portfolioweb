import { test, expect } from '@playwright/test';

test('production allows indexing, exposes canonical domain and multilingual sitemap', async ({ page }) => {
  const robots = await page.request.get('/robots.txt');
  expect(robots.status()).toBe(200);
  const robotsText = await robots.text();
  expect(robotsText).toContain('Allow: /');
  expect(robotsText).not.toContain('Disallow: /');
  expect(robotsText).toContain('https://agustinwojtyszyn.com/sitemap.xml');

  const sitemap = await page.request.get('/sitemap.xml');
  expect(sitemap.status()).toBe(200);
  const xml = await sitemap.text();
  for (const path of ['/es','/en','/es/servicios/paginas-web','/en/servicios/aplicaciones-a-medida','/es/servicios/automatizacion']) {
    expect(xml).toContain('https://agustinwojtyszyn.com' + path);
  }
  expect(xml).not.toContain('localhost:3000');
});

test('commercial pages expose indexable metadata, structured data and contact', async ({ page }) => {
  await page.goto('/es');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://agustinwojtyszyn.com/es');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /San Juan/);
  expect(await page.locator('meta[name="robots"]').getAttribute('content')).not.toContain('noindex');
  expect(await page.locator('h1').count()).toBe(1);
  await expect(page.locator('.seo-service-links a')).toHaveCount(3);
  const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
  expect(schemas.some(schema => schema.includes('https://schema.org') && schema.includes('Person'))).toBeTruthy();

  await page.goto('/es/servicios/paginas-web');
  await expect(page.locator('h1')).toContainText('páginas web en San Juan');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://agustinwojtyszyn.com/es/servicios/paginas-web');
  expect(await page.locator('script[type="application/ld+json"]').count()).toBeGreaterThanOrEqual(2);
  await expect(page.getByRole('link', { name: 'Solicitar presupuesto' })).toBeVisible();
  await page.goto('/en/servicios/aplicaciones-a-medida');
  await expect(page.locator('html')).toHaveAttribute('lang','en');
  await expect(page.locator('h1')).toContainText('Custom web applications');
});
