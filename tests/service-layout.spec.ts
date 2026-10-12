import { test,expect } from '@playwright/test';

// Regression: Instagram's in-app browser showed a four-column desktop layout
// at phone widths, leaving service descriptions only a few characters wide.
// Check *actual rendered geometry*, not only document.scrollWidth: the main
// viewport has overflow clipping and can mask collapsed grid columns.
for (const lang of ['es','en'] as const) {
 test(`service cards keep readable widths in mobile browsers (${lang})`,async({page})=>{
   await page.goto('/'+lang);
   await page.evaluate(()=>document.fonts.ready);
   for (const width of [320,360,375,390,412,430,480,600,700]) {
     await page.setViewportSize({width,height:844});
     const cards=await page.locator('#services .studio-service').evaluateAll(nodes=>nodes.map(node=>{
       const card=node as HTMLElement;
       const box=(selector:string)=>card.querySelector<HTMLElement>(selector)!.getBoundingClientRect();
       const cardBox=card.getBoundingClientRect();
       const icon=box('.studio-service-icon');
       const copy=box('.studio-service-main');
       const visual=box('.aw-service-visual');
       const action=box('.studio-service-side');
       return {
         tracks:getComputedStyle(card).gridTemplateColumns.split(/\s+/).length,
         parentWidth:cardBox.width,
         left:cardBox.left,right:cardBox.right,
         copyWidth:copy.width,
         copyStartsBesideIcon:copy.left>=icon.right-2,
         visualIsBelowCopy:visual.top>=copy.bottom-2,
         actionIsBelowVisual:action.top>=visual.bottom-2,
         visualWidth:visual.width,actionWidth:action.width,
         childrenInside:[icon,copy,visual,action].every(el=>el.left>=cardBox.left-2&&el.right<=cardBox.right+2)
       };
     }));
     expect(cards).toHaveLength(3);
     for(const [i,card] of cards.entries()){
       const id=`${lang}, ${width}px, service ${i+1}`;
       expect(card.tracks,id).toBe(2);
       expect(card.copyWidth,id).toBeGreaterThan(160);
       expect(card.copyWidth/card.parentWidth,id).toBeGreaterThan(0.69);
       expect(card.copyStartsBesideIcon,id).toBeTruthy();
       expect(card.visualIsBelowCopy,id).toBeTruthy();
       expect(card.actionIsBelowVisual,id).toBeTruthy();
       expect(card.visualWidth,id).toBeGreaterThan(210);
       expect(card.actionWidth/card.parentWidth,id).toBeGreaterThan(0.90);
       expect(card.childrenInside,id).toBeTruthy();
     }
     const horizontalOverflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
     expect(horizontalOverflow,`${lang} ${width}px document overflow`).toBeFalsy();
     const work=await page.locator('.studio-featured').evaluate(el=>getComputedStyle(el).gridTemplateColumns.split(/\s+/).length);
     expect(work,`${lang} ${width}px featured project`).toBe(1);
   }
 });
}
test('desktop services preserve their intended multi-column layout',async({page})=>{
 await page.goto('/es');
 await page.evaluate(()=>document.fonts.ready);
 for (const width of [701,768,960,1024,1280,1440]) {
   await page.setViewportSize({width,height:900});
   const card=await page.locator('#services .studio-service').first().evaluate(el=>{
     const node=el as HTMLElement;
     const text=node.querySelector<HTMLElement>('.studio-service-main')!.getBoundingClientRect();
     return {tracks:getComputedStyle(node).gridTemplateColumns.split(/\s+/).length,textWidth:text.width};
   });
   expect(card.tracks,`${width}px grid tracks`).toBe(width>1240?4:3);
   expect(card.textWidth,`${width}px text width`).toBeGreaterThan(170);
 }
});
