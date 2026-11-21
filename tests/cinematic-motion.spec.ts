import { test, expect } from '@playwright/test';

test('Spanish and English clearly state web development in the first screen', async ({page}) => {
  for (const [lang, title] of [['es', /Páginas web/], ['en', /Websites/]] as const) {
    await page.goto('/' + lang);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toContainText(title);
    await expect(page.locator('.aw-hero-actions a').first()).toHaveAttribute('href', /mailto:/);
    await expect(page.locator('.aw-service-card')).toHaveCount(3);
    await expect(page.locator('.aw-browser-front')).toBeVisible();
  }
});

test('interactive visual lab switches concepts and appearance', async ({page}) => {
  await page.goto('/es');
  const preview = page.locator('.aw-lab-stage');
  await expect(preview).toHaveClass(/aw-lab-stage--brand/);
  await page.getByRole('button', {name:/Tienda/}).click();
  await expect(preview).toHaveClass(/aw-lab-stage--shop/);
  await expect(page.locator('.aw-concept-shop')).toBeVisible();
  await page.getByRole('button', {name:/Oscuro/}).click();
  await expect(preview).toHaveClass(/aw-lab-stage--dark/);
  await page.getByRole('button', {name:/Sistema/}).click();
  await expect(page.locator('.aw-concept-system')).toBeVisible();
  await expect(page.locator('.aw-lab-caption a')).toHaveAttribute('href', '/es/servicios/aplicaciones-a-medida');
  await page.getByRole('button', {name:/Claro/}).click();
  await expect(preview).toHaveClass(/aw-lab-stage--light/);
});

test('mobile navigation works and layout avoids horizontal overflow', async ({page}) => {
  for (const width of [320, 375, 390, 768]) {
    await page.setViewportSize({width, height:844});
    await page.goto('/es');
    const dimensions = await page.evaluate(() => ({viewport:window.innerWidth,body:document.body.scrollWidth,root:document.documentElement.scrollWidth}));
    expect(dimensions.body, 'body width at '+width).toBeLessThanOrEqual(dimensions.viewport + 1);
    expect(dimensions.root, 'document width at '+width).toBeLessThanOrEqual(dimensions.viewport + 1);
    await page.getByRole('button', {name:'Menú'}).click();
    await expect(page.locator('.aw-mobile-nav')).toBeVisible();
    await page.locator('.aw-mobile-nav a[href="/es#services"]').click();
    await expect(page.locator('.aw-mobile-nav')).toHaveCount(0);
    await expect(page).toHaveURL(/#services$/);
  }
});

test('reduced motion stays readable and avoids scroll hijacking', async ({page}) => {
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('/es');
  await expect(page.locator('.aw-hero h1')).toBeVisible();
  for (const selector of ['.aw-browser-front','.aw-art-star','.aw-ticker-inner','.aw-process-signet span:last-child']) {
    const name = await page.locator(selector).evaluate(el => getComputedStyle(el).animationName);
    expect(name, selector).toBe('none');
  }
  await expect(page.locator('canvas,video')).toHaveCount(0);
  const documentHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  expect(documentHeight).toBeGreaterThan(1500);
});
