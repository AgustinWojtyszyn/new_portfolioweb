import { test, expect } from '@playwright/test';

// Responsive regression for real text: check layout geometry rather than
// relying only on document overflow clipping.
for (const lang of ['es','en'] as const) {
 test('services remain readable and actionable at phone widths ('+lang+')', async ({page}) => {
  await page.goto('/'+lang);
  await page.evaluate(() => document.fonts.ready);
  for (const width of [320,360,375,390,412,430,480,600,700]) {
   await page.setViewportSize({width,height:844});
   const rows = await page.locator('.at-service-row').evaluateAll(nodes => nodes.map(node => {
    const row = node.getBoundingClientRect();
    const title = node.querySelector('h3')!.getBoundingClientRect();
    const copy = node.querySelector('p')!.getBoundingClientRect();
    const link = node.querySelector('a')!.getBoundingClientRect();
    return { width:row.width,titleWidth:title.width,copyWidth:copy.width,
      childrenInside:[title,copy,link].every(el=>el.left>=row.left-1&&el.right<=row.right+1),
      linkReadable:link.width>80,
      titleInViewport:title.left>=0&&title.right<=innerWidth+1 };
   }));
   expect(rows).toHaveLength(3);
   for (const [index,row] of rows.entries()) {
    const info=lang+', width '+width+', item '+index;
    expect(row.titleWidth,info).toBeGreaterThan(175);
    expect(row.copyWidth,info).toBeGreaterThan(175);
    expect(row.linkReadable,info).toBeTruthy();
    expect(row.childrenInside,info).toBeTruthy();
    expect(row.titleInViewport,info).toBeTruthy();
   }
  }
 });
}
test('desktop service section has wide reading columns', async ({page}) => {
 await page.goto('/es');
 for (const width of [800,960,1024,1280,1440]) {
  await page.setViewportSize({width,height:900});
  const rows=await page.locator('.at-service-row').evaluateAll(nodes=>nodes.map(node=>{
   const title=node.querySelector('h3')!.getBoundingClientRect();
   return {width:title.width,lines:getComputedStyle(node).gridTemplateColumns.split(/\s+/).length};
  }));
  for (const row of rows) {
   expect(row.lines).toBe(3);
   expect(row.width).toBeGreaterThan(280);
  }
 }
});
