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

// Fancy in-game help messages
function FancyHelp(src) {
   
   this.cx = 100;
   this.cy = 100;
   this.deltaX = 0;
   this.deltaY = 0;
   this.tween = new Tween();
   this.tween.setDuration(1000);
   this.image = document.createElement("img");
   this.image.src = "images/" + src + ".png";
   this.visible = false;
   
   var fhelp = this;
   this.tween.setEndCallback(function() { fhelp.tweenDone(); });
   this.tween.setStartCallback(function() { fhelp.tweenStart(); });
   addVisual(this);
   
   this.isForeground = function() {
      return false;
   }

   this.setCenter = function(cx, cy) {
      this.cx = cx;
      this.cy = cy;
   }
   
   this.setLeft = function(x) {
      var iw = this.image.width;
      this.cx = x + iw / 2;
   }
   
   this.setTop = function(y) {
      var ih = this.image.height;
      this.cy = y + ih / 2;
   }
   
   this.setCenterX = function(cx) {
      this.cx = cx;
   }
   
   this.setCenterY = function(cy) {
      this.cy = cy;
   }
   
   this.setDuration = function(ms) {
      this.tween.setDuration(ms);
   }
   
   this.setDelay = function(ms) {
      this.tween.setDelay(ms);
   }
   
   this.isAnimating = function() {
      return this.tween.isTweening();
   }
   
   this.startAnimation = function() {
      this.tween.clearControlPoints();
      this.tween.addControlPoint(0, 0);
      this.tween.addControlPoint(Math.PI * 2, 1);
      this.tween.setFunction(TWEEN_LINEAR);
      this.tween.setRepeat(4);
      this.tween.setDuration(2000);
      var fhelp = this;
      this.tween.setActionCallback(function(val) { fhelp.tweenVal(val); });
      this.tween.play();
   }
   
   this.tweenStart = function() {
      this.visible = true;
   }
   
   this.tweenVal = function(val) {
      this.deltaX = Math.sin(val) * 8;
      this.deltaY = Math.cos(val) * 10;
   }
   
   this.tweenDone = function() {
      this.visible = false;
      removeVisual(this);
   }
   

   this.draw = function(g) {
      if (this.visible) {
         var iw = this.image.width;
         var ih = this.image.height;
         g.drawImage(this.image, this.cx - iw/2 + this.deltaX, this.cy - ih/2 + this.deltaY);
      }
   }
}