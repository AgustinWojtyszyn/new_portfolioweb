import {test,expect} from '@playwright/test';
for(const lang of ['es','en'] as const){
 test('premium service rows stay readable at phone and tablet widths ('+lang+')',async({page})=>{
  await page.goto('/'+lang);
  for(const width of [320,360,390,430,600,768,800,900]){
   await page.setViewportSize({width,height:844});
   const rows=await page.locator('.vx-service').evaluateAll(nodes=>nodes.map(el=>{
    const r=el.getBoundingClientRect(),title=el.querySelector('.vx-service-name')!.getBoundingClientRect();
    return {width:r.width,text:title.width,left:title.left,right:title.right,screen:innerWidth};
   }));
   expect(rows).toHaveLength(3);
   for(const r of rows){
    expect(r.text,'text at '+width).toBeGreaterThan(145);
    expect(r.right,'right at '+width).toBeLessThanOrEqual(r.screen+1);
    expect(r.left,'left at '+width).toBeGreaterThanOrEqual(-1);
   }
  }
 });
}
test('service detail pages remain navigable and maintain functional links',async({page})=>{
 await page.goto('/es/servicios/paginas-web');
 await expect(page.locator('h1')).toContainText('páginas web en San Juan');
 await expect(page.getByRole('link',{name:'Solicitar presupuesto'})).toHaveAttribute('href','/es#contact');
 await expect(page.locator('a[href^="mailto:"]')).toHaveCount(1);
});