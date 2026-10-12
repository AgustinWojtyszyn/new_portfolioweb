import { test,expect } from '@playwright/test';
test('editorial bilingual homepage and accessible contact',async({page})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/es');
 await expect(page.locator('html')).toHaveAttribute('lang','es');
 await expect(page.locator('h1')).toContainText('Hago webs');
 await expect(page.locator('#services .studio-service')).toHaveCount(3);
 await expect(page.locator('.studio-project')).toHaveCount(3);
 await expect(page.locator('.studio-featured')).toBeVisible();
 await expect(page.locator('.aw-evidence-hero')).toBeVisible();
 await expect(page.locator('.aw-evidence-choices button')).toHaveCount(4);
 await expect(page.locator('.aw-evidence-shot img')).toHaveCount(1);
 await page.locator('.aw-evidence-choices button').nth(1).click();
 await expect(page.locator('.aw-evidence-choices button').nth(1)).toHaveAttribute('aria-pressed','true');
 await page.locator('.aw-evidence-shot').click();
 await expect(page.getByRole('dialog',{name:'Ampliar captura'})).toBeVisible();
 await page.keyboard.press('Escape');
 await expect(page.getByRole('dialog',{name:'Ampliar captura'})).toHaveCount(0);
 await expect(page.locator('.aw-service-visual')).toHaveCount(3);
 await expect(page.locator('.aw-work-small')).toHaveCount(3);
 await expect(page.locator('.aw-featured-evidence')).toBeVisible();
 await expect(page.locator('.aw-evidence-main-frame')).toBeVisible();
 await expect(page.locator('.game-showcase')).toHaveCount(0);
 expect((await page.request.get('/iconoir/web-window.svg')).ok()).toBeTruthy();
 for(const width of [1440,768,390]){await page.setViewportSize({width,height:850});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();}
 await page.setViewportSize({width:390,height:850});
 await page.getByRole('button',{name:'Abrir menú'}).click();
 await expect(page.locator('#main-navigation')).toBeVisible();
 await page.locator('#main-navigation').getByRole('link',{name:'Servicios'}).click();
 await expect(page.getByRole('button',{name:'Abrir menú'})).toHaveAttribute('aria-expanded','false');
 await page.getByRole('button',{name:/Contame tu proyecto/}).first().click();
 await expect(page.getByRole('dialog')).toBeVisible();
 await page.getByRole('dialog').getByLabel('Tu nombre').fill('Persona de prueba');
 await page.getByRole('dialog').getByLabel('¿Qué necesitás?').fill('Necesito una web para mi negocio');
 await expect(page.getByRole('dialog').getByRole('button',{name:/Continuar por correo/})).toBeEnabled();
 await page.getByRole('dialog').getByRole('button',{name:'Cerrar'}).click();
 await expect(page.getByRole('dialog')).toBeHidden();
 await page.getByRole('link',{name:'EN',exact:true}).click();
 await expect(page).toHaveURL(/\/en$/);
 await expect(page.locator('html')).toHaveAttribute('lang','en');
 await expect(page.locator('h1')).toContainText('Websites with');
 await expect(page.locator('.studio-service-index').first()).toContainText('SERVICE');
 await expect(page.locator('.aw-evidence-hero')).toBeVisible();
 await page.locator('.studio-featured').click();
 await expect(page).toHaveURL(/\/en\/work\/servifood-analytics/);
 await expect(page.locator('.aw-case-evidence')).toBeVisible();
 expect(errors).toEqual([]);
});


test('service cards keep readable widths across mobile and tablet breakpoints',async({page})=>{
  await page.goto('/es');
  for(const width of [320,360,390,430,600,700,768,900,1024,1280]){
    await page.setViewportSize({width,height:840});
    const metrics=await page.locator('#services .studio-service').evaluateAll(cards=>
      cards.map(card=>{
        const rect=card.getBoundingClientRect();
        const main=card.querySelector('.studio-service-main')!.getBoundingClientRect();
        const visual=card.querySelector('.aw-service-visual')!.getBoundingClientRect();
        const action=card.querySelector('.studio-service-side')!.getBoundingClientRect();
        const copy=card.querySelector('.studio-service-lead')!.getBoundingClientRect();
        return {cardWidth:rect.width,mainWidth:main.width,copyWidth:copy.width,
          visualWidth:visual.width,visualTop:visual.top,mainBottom:main.bottom,
          actionTop:action.top,visualBottom:visual.bottom,
          overflow:Math.max(rect.right,visual.right,action.right)-innerWidth};
      })
    );
    expect(metrics).toHaveLength(3);
    for(const m of metrics){
      expect(m.overflow).toBeLessThanOrEqual(1);
      if(width<=700){
        expect(m.mainWidth/m.cardWidth).toBeGreaterThan(.7);
        expect(m.copyWidth).toBeGreaterThan(185);
        expect(m.visualWidth/m.cardWidth).toBeGreaterThan(.95);
        expect(m.visualTop).toBeGreaterThanOrEqual(m.mainBottom-1);
        expect(m.actionTop).toBeGreaterThanOrEqual(m.visualBottom-1);
      }else if(width<=1024){
        expect(m.mainWidth/m.cardWidth).toBeGreaterThan(.42);
      }
    }
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
  }
});
