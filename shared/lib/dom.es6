'use strict'
import rAF from "./dom/requestAnimationFrame";

let dom = {
      bindEvent(el,event,listener){
        if(el.addEventListener){
            el.addEventListener(event,listener,false);
        }else if(el.attachEvent){
            el.attachEvent("on${event}",(e)=>{
                listener.call(el,e||window.event);
            });
        }
      },
      unbindEvent(el,event,listener){
        if(el.removeEventListener){
            el.removeEventListener(event,listener,false);
        }else if(el.detachEvent){
            el.detachEvent("on${event}",listener);
        }
      },
      offset(element,dynamic = false) {
        if (!element) {
          return null;
        } 
        var top = 0, left = 0;  
        if ("getBoundingClientRect" in document.documentElement && !dynamic) {
          var rect = element.getBoundingClientRect();
          var doc = element.ownerDocument;
          var body = doc.body;
          var docEl = doc.documentElement;
          var clientTop = docEl.clientTop || body.clientTop || 0;
          var clientLeft = docEl.clientLeft || body.clientLeft || 0;
          var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
          var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
    
          return {
            top: rect.top + scrollTop - clientTop,
            left: rect.left + scrollLeft - clientLeft
          };
        }else{
          do{  
            top += element.offsetTop || 0;  
            left += element.offsetLeft || 0;  
            element = element.offsetParent;  
          }while(element);  
          return {top,left};
        }
      },
      ownerWindow(element){
        const doc = (element && element.ownerDocument) || document;
        return doc.defaultView || doc.parentWindow || window;
      },
      inViewport(element,container = window,diffInViewport = 0){
        if(container === window){
          let top = element.offsetTop;
          let left = element.offsetLeft;
          let width = element.offsetWidth;
          let height = element.offsetHeight;
          while(element.offsetParent){
            element = element.offsetParent;
            top += element.offsetTop;
            left += element.offsetLeft;
          }
          return (
            top < (window.pageYOffset + window.innerHeight) &&
            left < (window.pageXOffset + window.innerWidth) &&
            (top + height) > window.pageYOffset &&
            (left + width) > window.pageXOffset
          )
        }else{
          let top = dom.offset(element).top;
          let containerTop = dom.scrollTop(container);
          let containerPaddingTop = dom.offset(container.firstChild).top;

        return (containerTop + containerPaddingTop) < (top + element.offsetHeight) &&
                (top - diffInViewport) < (containerTop + container.offsetHeight)
        }
      },
      scrollNode(element){
        let scrollNode = element;
        while(scrollNode !== window){
          scrollNode = scrollNode.parentNode;
          if(scrollNode && scrollNode.scrollHeight > scrollNode.clientHeight){
            break;
          }
        }
        return scrollNode;
      },
      closet(element,className){
        let destNode = element
        while(destNode !== window){
          destNode = destNode.parentNode
          if(destNode && dom.hasClass(destNode,className)){
            break
          }
        }
        return destNode
      },
      scrollInView(element,container = window,callback = ()=>{},axis = "y"){
        let top = dom.offset(element).top - dom.offset(container.firstChild).top;
        let left = dom.offset(element).left - dom.offset(container.firstChild).left;
        let step = 15;
        const cancelScroll = ()=>{
            abort()
        };
        function abort(){
            dom.unbindEvent(element,"touchstart",cancelScroll);
        }
        dom.bindEvent(element,"touchstart",cancelScroll);

        // rAF(function smoothScroll(){
        setTimeout(function smoothScroll(){
          let scrollTop = dom.scrollTop(container);
          let scrollLeft = dom.scrollLeft(container);
          if(axis === "y"){
            if(top > scrollTop && (scrollTop + container.offsetHeight) !== container.scrollHeight){
                scrollTop = (scrollTop + step) >= top ? top: scrollTop + step;
                dom.scrollTop(container,scrollTop)
                setTimeout(smoothScroll,10)
                // rAF(smoothScroll)
            }else if(top < scrollTop && scrollTop >= 0){
                scrollTop  = (scrollTop - step) <= top ? top: scrollTop - step;
                dom.scrollTop(container,scrollTop)
                setTimeout(smoothScroll,10)
                // rAF(smoothScroll)
            }else{
                abort()
                callback()
            }
          }else if(axis === "x"){
            if(left > scrollLeft && (scrollLeft + container.offsetWidth) !== container.scrollWidth){
            //console.log("scroll right")
              scrollLeft = (scrollLeft + step) >= left ? left: scrollLeft + step;
              dom.scrollLeft(container,scrollLeft)
              // rAF(smoothScroll())
              setTimeout(smoothScroll,10)
            }else if(left < scrollLeft && scrollLeft >= 0){
            //console.log("scroll left")
              scrollLeft = (scrollLeft - step) <= left ? left: scrollLeft - step;
              dom.scrollLeft(container,scrollLeft)
              // rAF(smoothScroll())
              setTimeout(smoothScroll,10)
            }else{
              abort()
              callback()
            }
          }
        },10)
      },
      scrollPosition(element){
        let isCSS1Compat = (document.compatMode === 'CSS1Compat');
        let supportPageOffset = window.pageYOffset !== undefined;
        let scrollTop,scrollLeft;
        if(element === window){
          scrollTop = supportPageOffset ? window.pageYOffset : 
                          isCSS1Compat? document.documentElement.scrollTop:
                          document.body.scrollTop;
          scrollLeft = supportPageOffset ? window.pageXOffset : 
                        isCSS1Compat? document.documentElement.scrollLeft:
                        document.body.scrollLeft;
        }else{
          scrollTop = element.scrollTop;
          scrollLeft = element.scrollLeft;
        }
        return {
          scrollLeft,scrollTop
        }
      },
      scrollTop(element,value){
        const {scrollTop,scrollLeft} = dom.scrollPosition(element)
        if(value !== undefined){
            if(element === window){
              window.scrollTo(scrollLeft,value);
            }else{
              element.scrollTop = value;
            }
        }
        return scrollTop;
      },
      scrollLeft(element,value){
        const {scrollTop,scrollLeft} = dom.scrollPosition(element)
        if(value !== undefined){
          if(element === window){
            window.scrollTo(value,scrollTop)
          }else{
            element.scrollLeft = value
          }
        }
        return scrollLeft;
      },
      smoothScroll(element = window,position = {},axis = "y"){
        const targetY = position.top && parseInt(position.top,10) || 0;
        const targetX = position.left && parseInt(position.left,10) || 0;
        const initialY = dom.scrollTop(element);
        const initialX = dom.scrollLeft(element)
        var lastY = initialY;
        var lastX = initialX;
        var delta = axis === "y" ? targetY - initialY : targetX - initialX;
        const speed = Math.min(750,Math.min(1500,Math.abs(delta)));
        // var scrollInProgress = true;
        if(delta === 0 ){
            return;
        }
        function smooth(pos){
            if ((pos /= 0.5) < 1) {
                return 0.5 * Math.pow(pos, 5);
            }
            return 0.5 * (Math.pow((pos - 2), 5) + 2);
        }
        const cancelScroll = ()=>{
            abort()
        };
        function abort(){
            dom.unbindEvent(element,"touchstart",cancelScroll);
            // scrollInProgress = false;
        }
        dom.bindEvent(element,"touchstart",cancelScroll);

        var start,t,y,x;
        // var rAF = window.requestAnimationFrame
        rAF(function render(){
            // if(!scrollInProgress){
            //     return;
            // }
            // scrollInProgress = true;
            const now = Date.now();
            if(!start){
                start = now;
            }
            // calculate t, position of animation in [0..1]
            t = Math.min(1, Math.max((now - start) / speed, 0));
            if(axis === "y"){
              y = Math.round(initialY + delta * smooth(t));
              if(delta < 0 && y < targetY){
                  y = targetY;
              }
              if(delta >0 && y > targetY){
                  y = targetY;
              }
              if(lastY !== y){
                  dom.scrollTop(element,y);
              }
              // refresh current position Y
              lastY = y;
              if(y !== targetY){
                  rAF(render);
              }else{
                  abort();
              }
            }else if(axis === "x"){
              x = Math.round(initialX + delta * smooth(t));
              if(delta < 0 && x < targetX){
                  x = targetX;
              }
              if(delta >0 && x > targetX){
                  x = targetX;
              }
              if(lastX !== x){
                  dom.scrollLeft(element,x);
              }
              // refresh current position Y
              lastX = x;
              if(x !== targetX){
                  rAF(render);
              }else{
                  abort();
              }
            }
        });
      },
      hasClass(element,className){
        if (element.classList) {
          return !!className && element.classList.contains(className);
        }
        return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
      },
      addClass(element,className){
        if (element) {
          if (element.classList) {
            element.classList.add(className);
          } else if (!dom.hasClass(element, className)) {
            element.className = element.className + ' ' + className;
          }
        }
        return element;
      },
      removeClass(element,className){
        if (element && element.classList) {
            element.classList.remove(className);
        } else if (dom.hasClass(element, className)) {
            element.className = element.className
              .replace(new RegExp('(^|\\s)' + className + '(?:\\s|$)', 'g'), '$1')
              .replace(/\s+/g, ' ') // multiple spaces to one
              .replace(/^\s*|\s*$/g, ''); // trim the ends
          }
      },
      hasNode(node,parent){
        while(node){
          if(node === parent){
            return true;
          }
          node = node.parentNode;
        }
        return false;
      },
      inTouchableRegion(x,y,element){
        const offset = dom.offset(element);
        const minY = offset.top;
        const maxY = offset.top + element.offsetHeight;
        const minX = offset.left;
        const maxX = offset.left + element.offsetWidth;
        const isXValid = (x >= minX && x <= maxX);
        const isYValid = (y >= minY && y <= maxY);
        if(isXValid && isYValid){
            return true;
        }
        return false;
      },
      registerPullDownEvent(callback) {
        var self 
        this.bindEvent(window,'scroll',()=>{
            var scrollTop = this.scrollTop(window);
            if (document.documentElement.clientHeight + scrollTop >= document.documentElement.scrollHeight) {
                callback();
            }
        });
      },
      prefixedStyle(name){
        var _elementStyle = document.createElement('div').style;
        var _vendor = (function () {
          var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
            transform;

          for ( var i =0; i < vendors.length; i++ ) {
            transform = vendors[i] + 'ransform';
            if ( transform in _elementStyle ) return vendors[i].substr(0, vendors[i].length-1);
          }

          return false;
        })();

        function _prefixStyle (style) {
          if ( _vendor === false ) return false;
          if ( _vendor === '' ) return style;
          return _vendor + style.charAt(0).toUpperCase() + style.substr(1);
        }
        return _prefixStyle(name)
      },
      tap(e, eventName) {
        var ev = document.createEvent('Event');
        ev.initEvent(eventName, true, true);
        ev.pageX = e.changedTouches[0].pageX;
        ev.pageY = e.changedTouches[0].pageY;
        e.target.dispatchEvent(ev);
      },
      click(e) {
        var target = e.target,
          ev;

        if ( !(/(SELECT|INPUT|TEXTAREA)/i).test(target.tagName) ) {
          ev = document.createEvent('MouseEvents');
          ev.initMouseEvent('click', true, true, e.view, 1,
            target.screenX, target.screenY, target.clientX, target.clientY,
            e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
            0, null);

          ev._constructed = true;
          target.dispatchEvent(ev);
        }
      },
      momentum(current, start, time, lowerMargin, wrapperSize, deceleration){
        var distance = current - start,
          speed = Math.abs(distance) / time,
          destination,
          duration;

        deceleration = deceleration === undefined ? 0.0006 : deceleration;

        destination = current + ( speed * speed ) / ( 2 * deceleration ) * ( distance < 0 ? -1 : 1 );
        duration = speed / deceleration;

        if ( destination < lowerMargin ) {
          destination = wrapperSize ? lowerMargin - ( wrapperSize / 2.5 * ( speed / 8 ) ) : lowerMargin;
          distance = Math.abs(destination - current);
          duration = distance / speed;
        } else if ( destination > 0 ) {
          destination = wrapperSize ? wrapperSize / 2.5 * ( speed / 8 ) : 0;
          distance = Math.abs(current) + destination;
          duration = distance / speed;
        }

        return {
          destination: Math.round(destination),
          duration: duration
        };
      }
}

export default dom;