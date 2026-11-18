import { test, expect } from '@playwright/test';

test('cinematic portfolio speaks to visitors without games or private client work',async({page})=>{
 const exceptions:string[]=[];
 page.on('pageerror',e=>exceptions.push(e.message));
 await page.goto('/es');
 await expect(page.locator('html')).toHaveAttribute('lang','es');
 await expect(page.locator('h1')).toContainText('Hagamos algo');
 await expect(page.locator('h1')).toContainText('olvide.');
 await expect(page.locator('.vx-sculpture svg')).toBeVisible();
 await expect(page.locator('.vx-chapter--direction')).toBeVisible();
 await expect(page.locator('.vx-motion-chapter')).toBeVisible();
 await expect(page.locator('.vx-engineering-art')).toBeVisible();
 await expect(page.locator('.vx-services .vx-service')).toHaveCount(3);
 await expect(page.locator('.vx-page a[href^="mailto:"]').first()).toBeVisible();
 await expect(page.locator('.at-type-lab,.at-field,.game-showcase')).toHaveCount(0);
 await expect(page.locator('.vx-page input,.vx-page canvas')).toHaveCount(0);
 await expect(page.locator('.vx-page a[href*="/work/"]')).toHaveCount(0);
 const body=await page.locator('.vx-page').innerText();
 expect(body).not.toMatch(/ServiFood|EPSE|gestiQa|empresas clientes|portfolio-evidence/i);
 await expect(page.locator('.vx-service[href$="/paginas-web"]')).toHaveCount(1);
 await expect(page.locator('.vx-service[href$="/aplicaciones-a-medida"]')).toHaveCount(1);
 await expect(page.locator('.vx-service[href$="/automatizacion"]')).toHaveCount(1);
 await page.getByRole('link',{name:'EN',exact:true}).click();
 await expect(page).toHaveURL(/\/en$/);
 await expect(page.locator('html')).toHaveAttribute('lang','en');
 await expect(page.locator('h1')).toContainText('unforgettable.');
 expect(exceptions).toEqual([]);
});

test('readable and overflow-free from narrow phones to widescreen',async({page})=>{
 await page.goto('/es');
 for(const width of [320,360,375,390,430,600,768,800,900,1024,1280,1440,1920]){
  await page.setViewportSize({width,height:850});
  const dims=await page.evaluate(()=>{
   const wrap=document.querySelector('.vx-container')!.getBoundingClientRect();
   const header=document.querySelector('.vx-header-shell')!.getBoundingClientRect();
   return {scroll:document.documentElement.scrollWidth,body:document.body.scrollWidth,wrapRight:wrap.right,headerRight:header.right,viewport:innerWidth};
  });
  expect(dims.scroll,'document '+width).toBeLessThanOrEqual(width+1);
  expect(dims.body,'body '+width).toBeLessThanOrEqual(width+1);
  expect(dims.wrapRight,'container '+width).toBeLessThanOrEqual(width+1);
  expect(dims.headerRight,'header '+width).toBeLessThanOrEqual(width+1);
 }
});
