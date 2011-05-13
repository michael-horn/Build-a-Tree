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
   
   this.draw = function(g) { }
   
   this.action = function() { }

   this.isDown = function() {
      return this.down;
   }
   
   this.isOver = function() {
      return this.containsTouch(this.touch);
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
         this.action();
      }
      this.down = false;
      this.touch = null;
   }
}

