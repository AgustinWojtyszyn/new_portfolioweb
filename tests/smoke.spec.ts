import { test, expect } from '@playwright/test';

test('portfolio states its web offer and avoids private client exposure',async({page})=>{
  const errors:string[]=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.goto('/es');
  await expect(page.locator('html')).toHaveAttribute('lang','es');
  await expect(page.locator('h1')).toContainText('Páginas web');
  await expect(page.locator('h1')).toContainText('huella.');
  await expect(page.locator('.aw-browser-front')).toBeVisible();
  await expect(page.locator('.aw-philosophy')).toBeVisible();
  await expect(page.locator('.aw-showcase')).toBeVisible();
  await expect(page.locator('.aw-process')).toBeVisible();
  await expect(page.locator('.aw-services .aw-service-card')).toHaveCount(3);
  await expect(page.locator('.aw-site a[href^="mailto:"]').first()).toHaveAttribute('href',/^mailto:/);
  await expect(page.locator('.at-type-lab,.at-field,.game-showcase')).toHaveCount(0);
  await expect(page.locator('.aw-site input,.aw-site canvas')).toHaveCount(0);
  await expect(page.locator('.aw-site a[href*="/work/"]')).toHaveCount(0);
  const content=await page.locator('.aw-site').innerText();
  expect(content).not.toMatch(/ServiFood|EPSE|gestiQa|empresas clientes|portfolio-evidence/i);
  for(const slug of ['paginas-web','aplicaciones-a-medida','automatizacion']){
    await expect(page.locator('.aw-service-card a[href$="/'+slug+'"]')).toHaveCount(1);
  }
  await page.getByRole('link',{name:'EN',exact:true}).click();
  await expect(page).toHaveURL(/\/en$/);
  await expect(page.locator('html')).toHaveAttribute('lang','en');
  await expect(page.locator('h1')).toContainText('Websites');
  await expect(page.locator('h1')).toContainText('stand out.');
  expect(errors).toEqual([]);
});

test('homepage and header stay inside the viewport from 320px to 1920px',async({page})=>{
  await page.goto('/es');
  for(const width of [320,360,375,390,430,600,768,800,900,1024,1280,1440,1920]){
    await page.setViewportSize({width,height:850});
    const dims=await page.evaluate(()=>{
      const wrap=document.querySelector('.aw-hero .aw-wrap')!.getBoundingClientRect();
      const header=document.querySelector('.aw-header-inner')!.getBoundingClientRect();
      return {scroll:document.documentElement.scrollWidth,body:document.body.scrollWidth,wrapRight:wrap.right,headerRight:header.right,viewport:innerWidth};
    });
    expect(dims.scroll,'document '+width).toBeLessThanOrEqual(width+1);
    expect(dims.body,'body '+width).toBeLessThanOrEqual(width+1);
    expect(dims.wrapRight,'container '+width).toBeLessThanOrEqual(width+1);
    expect(dims.headerRight,'header '+width).toBeLessThanOrEqual(width+1);
  }
});
