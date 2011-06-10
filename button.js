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
function Button(x, y, w, h) {

   this.x = x;
   this.y = y;
   this.w = w;
   this.h = h;
   
   this.down = false;
   this.touch = null;
   this.visible = false;
   
   this.setCenter = function(cx, cy) {
      this.x = cx - this.w/2;
      this.y = cy - this.h/2;
   }
   
   this.setPosition = function(x, y) {
      this.x = x;
      this.y = y;
   }
   
   this.getCenterX = function() {
      return this.x + this.w/2;
   }
   
   this.getCenterY = function() {
      return this.y + this.h/2;
   }
   
   this.getWidth = function() {
      return this.w;
   }
   
   this.getHeight = function() {
      return this.h;
   }
   
   this.draw = function(g) { }
   
   this.action = function() { }

   this.isDown = function() {
      return this.down;
   }
   
   this.isOver = function() {
      return this.containsTouch(this.touch);
   }
   
   this.isVisible = function() {
      return this.visible;
   }
   
   this.setVisible = function(v) {
      this.visible = v;
   }
   
//==========================================================================
// TOUCH FUNCTIONS
//==========================================================================
   this.containsTouch = function(tp) {
      if (!tp) return false;
      return (tp.x >= this.x && tp.y >= this.y &&
              tp.x <= this.x + this.w && tp.y <= this.y + this.h);
   }
   
   this.touchDown = function(tp) {
      this.down = true;
      this.touch = tp;
   }
   
   this.touchDrag = function(tp) {
      this.touch = tp;
   }
   
   this.touchUp = function() {
      if (this.isDown() && this.containsTouch(this.touch)) {
         this.down = false;  // in case action logic depends on down state
         this.action();
      }
      this.down = false;
      this.touch = null;
   }
}

