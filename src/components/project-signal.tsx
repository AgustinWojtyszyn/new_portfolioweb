/** Compact, decorative signals; illustrations rather than measured operational data. */
export function ProjectSignal({slug}:{slug:string}) {
 return <svg className={`project-signal signal-${slug}`} viewBox="0 0 150 42" aria-hidden="true">
  {slug==='servifood-tracking'?<><path className="signal-track" pathLength="1" d="M6 29H44L69 12H104L139 29"/><path className="signal-tracer" pathLength="1" d="M6 29H44L69 12H104L139 29"/>{[[6,29],[69,12],[139,29]].map(([x,y],i)=><circle key={x} style={{animationDelay:`${i*200}ms`}} cx={x} cy={y} r="3"/>)}</>
  :slug==='servifood-analytics'?<><path className="signal-grid" d="M6 6V36H145M6 22H145"/><path className="signal-track signal-chart" pathLength="1" d="M7 31C25 30 25 16 44 22S66 9 84 16 116 7 143 9"/><path className="signal-tracer" pathLength="1" d="M7 31C25 30 25 16 44 22S66 9 84 16 116 7 143 9"/></>
  :<><path className="signal-track" d="M27 21H67M84 21H122"/>{[9,65,121].map((x,i)=><g className="signal-document" key={x} style={{animationDelay:`${i*240}ms`}}><rect x={x} y="8" width="19" height="27" rx="2"/><path d={`M${x+5} 15h9m-9 5h9m-9 5h5`}/></g>)}<path className="signal-check" pathLength="1" d="m119 28 5 4 12-12"/></>}
 </svg>;
}
