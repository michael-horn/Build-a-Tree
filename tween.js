/*
 * Build-a-Tree
 * Life on Earth Project (http://sdr.seas.harvard.edu/content/life-earth)
 *
 * Michael S. Horn
 * Northwestern University
 * michael-horn@northwestern.edu
 * Copyright 2011, Michael S. Horn
 *
 * This project was funded by the National Science Foundation (grant 1010889).
 * Any opinions, findings and conclusions or recommendations expressed in this
 * material are those of the author(s) and do not necessarily reflect the views
 * of the National Science Foundation (NSF).
 */

const TWEEN_LINEAR = 0;
const TWEEN_SINE2  = 1;
const TWEEN_DECAY  = 2;

const REPEAT_FOREVER = -1;


function Tween() {
   
   this.segments = [];           // array of interpolation points
   this.delay    = 0;            // delay time in ticks (30ms)
   this.duration = 0;            // duration of tween in ticks (30ms)
   this.count    = 0;            // current tick count
   this.func     = TWEEN_LINEAR; // interpolation function
   this.running  = true;         // paused or not
   this.repeat   = 1;            // repeat count
   
   this.ontick   = function(value) { };  // action callback
   this.onend    = function() { };       // tween complete callback
   this.onstart  = function() { };

   
   this.play = function() {
      this.count = 0;
      this.running = true;
      this.animate();
   }

   this.stop = function() {
      this.running = false;
      this.count = 1;
      this.repeat = 0;
   }
   
   this.isRunning = function() {
      return this.running;
   }

   this.isTweening = function() {
      if (this.repeat == REPEAT_FOREVER) {
         return true;
      } else {
         return this.count <= (this.duration * this.repeat) + this.delay;
      }
   }
   
   this.isDelaying = function() {
      return this.count < this.delay;
   }
   
   this.getTime = function() {
      var t = (this.count - this.delay) / this.duration;
      if (t < 0) {
         return 0;
      } else if (t > 1 && this.repeat != 1) {
         return t - Math.floor(t);
      } else {
         return t;
      }
   }

   this.getY = function(time) {
      var x;
      switch (this.func) {
         case TWEEN_LINEAR:
            return time;
         case TWEEN_SINE2:
            x = time * Math.PI * 0.5;
            return Math.sin(x) * Math.sin(x);
         case TWEEN_DECAY:
            return 1 - Math.exp(time * -5);
         default:
            return time;
      }
   }
   
   this.getDuration = function() {
      return this.duration * 30;
   }
   
   this.setDuration = function(ms) {
      this.duration = Math.round(ms / 30);
   }

   this.getDelay = function() {
      return this.delay * 30;
   }

   this.setDelay = function(ms) {
      this.delay = Math.round(ms / 30);
   }

   this.getFunction = function() {
      return this.func;
   }

   this.setFunction = function(func) {
      this.func = func;
   }
   
   this.clearControlPoints = function() {
      this.segments = [];
   }
   
   //-----------------------------------------------------------------
   // Defines a point that the tween will interpolate between
   // value - float value to interpolate between
   // time - [0 - 1] when tween will reach the indicated value
   //-----------------------------------------------------------------
   this.addControlPoint = function(value, time) {
      this.segments.push( { value : value, time : time });
      this.segments.sort( function(a, b) { return a.time - b.time });
   }
   
   this.getValue = function() {
      var t = this.getTime();
      var len = this.segments.length;
      if (len == 0) return 0;
      if (len == 1) return this.getStart();
      var prev = this.segments[0];
      var next = this.segments[len-1];

      for (var i=1; i<len-1; i++) {
         curr = this.segments[i];
         if (curr.time <= t) {
            prev = curr;
         } else {
            next = curr;
            break;
         }
      }
      
      if (prev.time >= next.time) {
         return next.value;
      }
      
      t = (t - prev.time) / (next.time - prev.time);
      t = Math.min(1, Math.max(t, 0));
      
      var y = this.getY(t);
      var a = prev.value;
      var b = next.value;
      return ( y * (b - a) + a );
   }   

   
   this.getStart = function() {
      if (this.segments.length > 0) {
         return this.segments[0].value;
      } else {
         return 0;
      }
   }

   this.setStart = function(value) {
      this.addControlPoint(value, 0);
   }
   
   this.getEnd = function() {
      var len = this.segments.length;
      if (len > 0) {
         return this.segments[len - 1].value;
      } else {
         return 0;
      }
   }

   this.setEnd = function(value) {
      this.addControlPoint(value, 1);
   }

   this.getRepeat = function() {
      return this.repeat;
   }

   this.setRepeat = function(repeat) {
      this.repeat = repeat;
   }
   
   this.setActionCallback = function(callback) {
      this.ontick = callback;
   }
   
   this.setStartCallback = function(callback) {
      this.onstart = callback;
   }
   
   this.setEndCallback = function(callback) {
      this.onend = callback;
   }

   this.animate = function() {
      if (!this.running) return;
      
      if (this.isTweening()) {
         
         if (this.delay == 0 && this.count == 0) {
            this.onstart();
         } 
         this.count++;
         
         if (this.delay == this.count) {
            this.onstart();
         }
         
         if (this.isTweening() && !this.isDelaying()) {
            this.ontick(this.getValue());
         }
         
         if (!this.isTweening()) {
            this.onend();
         } else {
            var tween = this;
            setTimeout(function () { tween.animate(); }, 30);
         }
      }         
   }
}
