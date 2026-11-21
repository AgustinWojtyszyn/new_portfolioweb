import { test, expect } from '@playwright/test';

for (const lang of ['es','en'] as const) {
  test('service cards remain readable at phone and tablet widths ('+lang+')',async({page})=>{
    await page.goto('/'+lang);
    for(const width of [320,360,390,430,600,768,800,900]){
      await page.setViewportSize({width,height:844});
      const cards = await page.locator('.aw-service-card').evaluateAll(nodes => nodes.map(el => {
        const card=el.getBoundingClientRect();
        const title=el.querySelector('h3')!.getBoundingClientRect();
        return {width:card.width,text:title.width,left:title.left,right:title.right,screen:innerWidth};
      }));
      expect(cards).toHaveLength(3);
      for(const card of cards){
        expect(card.text,'title at '+width).toBeGreaterThan(145);
        expect(card.right,'right at '+width).toBeLessThanOrEqual(card.screen+1);
        expect(card.left,'left at '+width).toBeGreaterThanOrEqual(-1);
      }
    }
  });
}

test('service detail pages preserve information and contact links',async({page})=>{
  await page.goto('/es/servicios/paginas-web');
  await expect(page.locator('h1')).toContainText('páginas web en San Juan');
  await expect(page.getByRole('link',{name:'Solicitar presupuesto'})).toHaveAttribute('href','/es#contact');
  await expect(page.locator('a[href^="mailto:"]')).toHaveCount(1);
  await expect(page.locator('.at-detail-faq-list details')).not.toHaveCount(0);
});
