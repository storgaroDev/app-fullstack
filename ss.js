gsap.timeline({ repeat:-1, repeatDelay:0, yoyo:true})
    .to('.m', {duration:(i)=>[0.8,1.3][i], y:-10266, ease:'steps(29)', stagger:-0.3}, 0)
    .to('.frog', {duration:2, scale:1.1, transformOrigin:'50% 50%', ease:'power2', onComplete:swapMask}, 0)

let currentMask = 1;
function swapMask(){
  if (currentMask==3) currentMask = 1;
  else currentMask++;
  gsap.set('.m', {attr:{'xlink:href':'https://assets.codepen.io/721952/liquidMask'+currentMask+'.svg'}})
}