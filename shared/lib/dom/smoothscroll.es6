'use strict';
import {bindEvent,unbindEvent,prefixedStyle,tap,click,momentum} from "../dom.es6";
import {isAndroid} from "./browserDetector.es6";
import rAF from "./rAF";
import timingfunction from "./timingfunction"

const eventType = {
    touchstart: 1,
    touchmove: 1,
    touchend: 1,

    mousedown: 2,
    mousemove: 2,
    mouseup: 2,

    pointerdown: 3,
    pointermove: 3,
    pointerup: 3,

    MSPointerDown: 3,
    MSPointerMove: 3,
    MSPointerUp: 3
}

function isPreventDefaultException(el,exceptions){
    for(var i in exceptions){
        if(exceptions[i].test(el[i])){
            return true
        }
    }
    return false
}

function SmoothScroll(el,options){
    this.container = typeof el === "string"?document.querySelector(el):el
    this.scroller = this.container.children[0]
    this.scrollerStyle = this.scroller.style
    this.options = {
        startX:0,
        startY:0,
        directionLockThreshold:5,
        hasHorizontalScroll:false,
        hasVerticalScroll:true,
        useTransition:true,
        momentum:true,
        bounce: true,
        bounceTime: 600,
        preventDefault:true,
        preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/ },
        probeType:2,
        HWCompositing:true,
    }
    this.style = {
        transform:prefixedStyle("transform"),
        transitionTimingFunction:prefixedStyle("transitionTimingFunction"),
        transitionDuration:prefixedStyle("transitionDuration"),
        transitionDelay:prefixedStyle('transitionDelay'),
        transformOrigin:prefixedStyle("transformOrigin")
    }
    this.options = Object.assign({},this.options,options)
    this.translateZ = this.options.HWCompositing?' translateZ(0)':""
    if (this.options.probeType == 3) {
        this.options.useTransition = false; 
    }

    this.x = 0
    this.y = 0
    this._events = {}

    this._init()
    this.refresh()
    this.scrollTo(this.options.startX,this.options.startY)
    this.enable()
}

SmoothScroll.prototype = {
    _init(){
        this.toggleEvents()
    },
    _transitionEnd(e){
        if(e.target !== this.scroller || !this.isInTransition){
            return
        }
        this._transitionTime()
        if(!this.resetPosition(this.options.bounceTime)){
            this.isInTransition = false
            this._triggerEvent("scrollEnd")
        }
    },
    _move(e){
        if(!this.enable || eventType[e.type] !== this.initiated){
            return
        }
        if(this.options.preventDefault){
            e.preventDefault()
        }
        const point = e.touches?e.touches[0]:e.pos
        let deltaX = point.pageX - this.pointX
        let deltaY = point.pageY - this.pointY
        this.pointX = point.pageX
        this.pointY = point.pageY
        this.distX += deltaX
        this.distY += deltaY
        const absDistX = Math.abs(this.distX)
        const absDistY = Math.abs(this.distY)
        const timestamp = Date.now()
        if(timestamp - this.endTime > 300 && (absDistY < 10 && absDistX < 10)){
            return
        }
        if(this.directionLocked == 0){
            if(absDistX > absDistY + this.options.directionLockThreshold){
                this.directionLocked = "h"
            }else if(absDistY > absDistX + this.options.directionLockThreshold){
                this.directionLocked = "v"
            }else{
                this.directionLocked = "n"
            }
        }
        // console.log('directionLocked',this.directionLocked)
        if(this.directionLocked == "h"){
            if(this.options.hasHorizontalScroll){
                // this.initiated = false
                // return
            }else if(this.options.hasVerticalScroll){
                e.preventDefault()
            }
            deltaY = 0
        }else if(this.directionLocked == "v"){
            if(this.options.hasVerticalScroll){
                // this.initiated = false
                // return
            }else if(this.options.hasHorizontalScroll){
                e.preventDefault()
            }
            deltaX = 0
        }
        deltaX = this.hasHorizontalScroll?deltaX:0
        deltaY = this.hasVerticalScroll?deltaY:0

        var newX = this.x + deltaX
        var newY = this.y + deltaY
        if(newX > 0 || newX < this.maxScrollX){
            newX = this.options.bounce?this.x + deltaX / 3:newX > 0?0:this.maxScrollX
        }
        if(newY > 0 || newY < this.maxScrollY){
            newY = this.options.bounce?this.y + deltaY / 3:newY > 0?0:this.maxScrollY 
        }
        if(!this.moved){
            this._triggerEvent("scrollStart")
        }
        this.moved = true
        this._translate(newX,newY)
        this.directionLocked = 0
        if(timestamp - this.startTime > 300){
            this.startTime = timestamp
            this.startX = this.x
            this.startY = this.y
            if ( this.options.probeType == 1 ) {
                this._triggerEvent('scroll',this.getComputedPosition());
            }
        }
        if ( this.options.probeType > 1 ) {
            this._triggerEvent('scroll',this.getComputedPosition());
        }
    },
    _start(e){
        if(!this.enable || (this.initiated && eventType[e.type] !== this.initiated)){
            return
        }
        if(this.options.preventDefault && !isAndroid() && !isPreventDefaultException(e.target,this.options.preventDefaultException)){
            e.preventDefault()
        }
        const point = e.touches?e.touches[0]:e
        this.initiated = eventType[e.type]
        this.moved = false
        this.distX = 0;
        this.distY = 0;
        this.directionLocked = 0
        this.startTime = Date.now()
        if(this.isInTransition && this.options.useTransition){
            this._transitionTime()
            this.isInTransition = false
            let pos = this.getComputedPosition()
            this._translate(Math.round(pos.x),Math.round(pos.y))
            this._triggerEvent("scrollEnd")
        }else if(!this.options.useTransition && this.isAnimating){
            this.isAnimating = false
            this._triggerEvent("scrollEnd")
        }
        this.pointX = point.pageX
        this.pointY = point.pageY
        this.startX = this.x
        this.startY = this.y
        this._triggerEvent("beforeScrollStart")
    },
    _end(e){
        if(!this.enable || eventType[e.type] !== this.initiated){
            return
        }

        if(this.options.preventDefault && !isPreventDefaultException(e.target,this.options.preventDefaultException)){
            e.preventDefault()
        }
        const point = e.touches?e.touches[0]:e
        let newX = Math.round(this.x)
        let newY = Math.round(this.y)
        this.isInTransition = 0
        this.initiated = 0
        this.endTime = Date.now()
        if(this.resetPosition(this.options.bounceTime)){
            return
        }

        this.scrollTo(newX,newY)
        if(!this.moved){
            tap(e,"tap")
            click(e)
            this._triggerEvent("scrollCancel")
            return
        }
        let time = 0
        let duration = this.endTime - this.startTime
        if(this.options.momentum && duration < 300){
            let momentumX = this.hasHorizontalScroll?momentum(this.x,this.startX,duration,this.maxScrollX,
                this.options.bounce ? this.containerWidth : 0, this.options.deceleration):{ destination: newX, duration: 0 }
            let momentumY = this.hasVerticalScroll?momentum(this.y,this.startY,duration,this.maxScrollY,
                this.options.bounce ? this.containerHeight : 0, this.options.deceleration):{ destination: newX, duration: 0 }
            newX = momentumX.destination;
            newY = momentumY.destination;
            time = Math.max(momentumX.duration, momentumY.duration);
            this.isInTransition = 1
        }
        if(newX != this.x || newY != this.y){
            let easing = ""
            if ( newX > 0 || newX < this.maxScrollX || newY > 0 || newY < this.maxScrollY ) {
                easing = timingfunction.quadratic;
            }
            this.scrollTo(newX,newY,time,easing)
            return
        }
        this._triggerEvent("scrollEnd")
    },
    resetPosition(time = 0){
        let x = this.x;let y = this.y
        if(!this.hasHorizontalScroll || this.x > 0){
            x = 0
        }else if(this.x < this.maxScrollX){
            x = this.maxScrollX
        }
        if(!this.hasVerticalScroll || this.y > 0){
            y = 0
        }else if(this.y < this.maxScrollY){
            y = this.maxScrollY
        }
        if(x == this.x && y == this.y){
            return false
        }
        this.scrollTo(x,y,time)
        return true
    },
    enable(){
        this.enable = true
    },
    disable(){
        this.enable = false
    },
    scrollTo(x,y,time,easing){
        easing = easing || timingfunction.circular
        this.isInTransition = this.options.useTransition && time > 0
        if(!time || this.options.useTransition){
            const transitionType = this.options.useTransition && easing.style
            if(transitionType){
                this.scrollerStyle[prefixedStyle("transitionTimingFunction")] = easing.style
                this._transitionTime(time)
            }
            this._translate(x,y)
        }else{
            this._animate(x,y,time,easing.fn)
        }
    },
    scrollBy(x,y,time = 0){
        x = this.x + x
        y = this.y + y
        this.scrollTo(x,y,time)
    },
    getComputedPosition(){
        var matrix = window.getComputedStyle(this.scroller, null),
            x, y;

        matrix = matrix[prefixedStyle("transform")].split(')')[0].split(', ');
        x = +(matrix[12] || matrix[4]);
        y = +(matrix[13] || matrix[5]);

        return { x: x, y: y };
    },
    _transitionTime(time = 0){
        let transitionDuration = this.style.transitionDuration
        this.scrollerStyle[transitionDuration] = `${time}ms`
        if(!time && isAndroid()){
            this.scrollerStyle[transitionDuration] = "0.0001ms"
            var self = this
            rAF(function(){
                if(self.scrollerStyle[transitionDuration] === '0.0001ms') {
                    self.scrollerStyle[transitionDuration] = '0s';
                }
            })
        }
    },
    _translate(x,y){
        this.scrollerStyle[this.style.transform] = `translate(${x}px,${y}px)${this.translateZ}`
        this.x = x
        this.y = y
    },
    _animate(destX,destY,duration,easingFn){
        const self = this
        const startX = this.x;const startY = this.y
        const startTime = Date.now();const endTime = startTime + duration
        function step(){
            let now = Date.now()
            var newX,newY
            if(now >= endTime){
                self.isAnimating = false
                self._translate(destX,destY)
                if (!self.resetPosition(self.options.bounceTime)){
                    self._triggerEvent("scrollEnd")
                }
                return
            }
            now = (now - startTime) / duration
            const easing = easingFn(now)
            newX = startX + (destX - startX) * easing
            newY = startY + (destY - startY) * easing
            self._translate(newX,newY)
            if(self.isAnimating){
                rAF(step)
            }
        }
        this.isAnimating = true
        step()
    },
    _resize(){
        clearTimeout(this.resizeTimer)
        this.resizeTimer = setTimeout(()=>{
            this.refresh
        },60)
    },
    refresh(){
        var rf = this.container.offsetHeight
        this.containerHeight = this.container.clientHeight
        this.containerWidth = this.container.clientWidth
        this.scrollerHeight = this.scroller.offsetHeight
        this.scrollerWidth = this.scroller.offsetWidth
        this.maxScrollX = this.containerWidth - this.scrollerWidth
        this.maxScrollY = this.containerHeight - this.scrollerHeight

        this.hasHorizontalScroll = this.options.hasHorizontalScroll && this.maxScrollX < 0;
        this.hasVerticalScroll = this.options.hasVerticalScroll && this.maxScrollY < 0
        if(!this.hasHorizontalScroll){
            this.maxScrollX = 0
            this.scrollerWidth = this.containerWidth
        }else if(!this.hasVerticalScroll){
            this.maxScrollY = 0
            this.scrollHeight = this.containerHeight
        }
        this.endTime = 0
        this._triggerEvent("refresh")
        // this.resetPosition()
    },
    destory(){
        this.toggleEvents(true)
        clearTimeout(this.resizeTimer)
        this.resizeTimer = null
        this._triggerEvent("destory")
    },    
    toggleEvents(remove = false){
        let toggler = remove?unbindEvent:bindEvent
        let target = this.container
        toggler(target,"touchstart",this._start.bind(this))
        toggler(target,"touchmove",this._move.bind(this))
        toggler(target,"touchend",this._end.bind(this))
        toggler(this.scroller,"transitionend",this._transitionEnd.bind(this))
        toggler(this.scroller,"webkitTransitionEnd",this._transitionEnd.bind(this))
        toggler(window,"orientationchange",this._resize.bind(this))
        toggler(window,"resize",this._resize.bind(this))
        toggler(target,"click",()=>{
            if ( this.enabled && !e._constructed ) {
                e.preventDefault();
                e.stopPropagation();
            }
        })
    },
    on(type,callback){
        if(!this._events[type]){
            this._events[type] = []
        }
        this._events[type].push(callback)
    },
    off(type,callback){
        if(!this._events[type]){
            return
        }
        var index = this._events[type].indexOf(callback)
        if(index > -1){
            this._events[type].splice(index,1)
        }
    },
    _triggerEvent(type){
        if(!this._events[type]){
            return
        }
        const length = this._events[type].length
        if(length == 0){
            return
        }
        for(var i = 0;i< length;i++){
            this._events[type][i].apply(this,Array.prototype.slice.call(arguments,1))
        }
    }
}

export default SmoothScroll;