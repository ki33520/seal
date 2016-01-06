'use strict';

let startY = 0;
let enabled = false;

let handleTouchmove = (e)=>{
  let el = e.target
  while(el !== document.body){
    const style = window.getComputedStyle(el);
    if(!style){
      break;
    }
    const scrolling = style.getPropertyValue('-webkit-overflow-scrolling');
    const overflowY = style.getPropertyValue('overflow-y');
    const height = parseInt(style.getPropertyValue('height'), 10);
    const isScrollable = scrolling === 'touch' && (overflowY === 'auto' || overflowY === 'scroll');
    const canScroll = el.scrollHeight > el.offsetHeight;
    if(isScrollable && canScroll){
      const currentY = e.touches ? e.touches[0].screenY:e.screenY;
      const isAtTop = (startY <= currentY && el.scrollTop === 0);
      const isAtBottom = (startY >= currentY && el.scrollHeight - el.scrollTop === height)
      if(isAtTop || isAtBottom){
        e.preventDefault()
      }
      return
    }
    el = el.parentNode
  }
  // e.preventDefault()
}

let handleTouchstart = function(e) {
    startY = e.touches ? e.touches[0].screenY : e.screenY;
};

function enable() {
    // Listen to a couple key touch events
    document.body.addEventListener('touchstart', handleTouchstart, false);
    document.body.addEventListener('touchmove', handleTouchmove, false);
    enabled = true;
};
function disable() {
    // Stop listening
    document.body.removeEventListener('touchstart', handleTouchstart, false);
    document.body.removeEventListener('touchmove', handleTouchmove, false);
    enabled = false;
};

function isEnabled() {
    return enabled;
};

// if(undefined !== window){
//   var testDiv = document.createElement('div');
//   document.documentElement.appendChild(testDiv);
//   testDiv.style.WebkitOverflowScrolling = 'touch';
//   var scrollSupport = 'getComputedStyle' in window && window.getComputedStyle(testDiv)['-webkit-overflow-scrolling'] === 'touch';
//   document.documentElement.removeChild(testDiv);

//   if (scrollSupport) {
//       enable();
//   }
// }

export default {
  enable,disable,isEnabled
}