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

//==============================================================
// A solution box with the scientist tree
//==============================================================
function SolutionBox(solution) {
   
   this.solution = solution;
   this.open = false;
   this.down = false;
   
   this.tween = new Tween();
   
   this.delta = { x : 0, y : 0 };
   this.tw = 55 + 30 * solution.getTipCount();
   this.th = 75 + solution.getRoot().getDepth() * 17;
   this.w = Math.max(350, this.tw);
   this.h = 80 + this.th;
   this.x = canvas.width / 2 - this.w / 2;
   this.y = 30 - this.h;
   
   var s = this;
   this.tween.setActionCallback(function(val) { s._taction(val) });
   this.tween.setEndCallback(function() { s._tdone(); } );
   this.tween.setDuration(300);
   this.tween.setFunction(TWEEN_DECAY);
   
   
   this.draw = function(g) {
      var sx = this.x;
      var sy = this.y;
      var sw = this.w;
      var sh = this.h;
      var tx = sx + (sw - this.tw) / 2;
      var ty = sy + 55;
      
      var r = 15;
      
      g.beginPath();
      g.moveTo(sx, sy);
      g.arc(sx + r, sy + sh - r, r, Math.PI, Math.PI/2, true);
      g.arc(sx + sw - r, sy + sh - r, r, Math.PI/2, 0, true);
      g.lineTo(sx + sw, sy);
      g.closePath();
      
      
      if (this.down) {
         g.fillStyle = "#64B7E4"; 
      } else {
         g.fillStyle = "#5AADDA";
      }
      g.lineWidth = 4;
      g.strokeStyle = "white";
      g.stroke();
      g.fill();
      g.fillStyle = "white";
      solution.drawSmallTree(g, tx, ty, this.tw, this.th);
      g.fillStyle = "white";
      g.textAlign = "center";
      g.textBaseline = "bottom";
      g.font = "12pt Tahoma, Arial, sans-serif";
      g.beginPath(); 
      g.fillText("Scientist Tree", sx + sw/2, sy + sh - 5);
      
      g.font = "11pt Tahoma, Arial, sans-serif";
      g.beginPath(); 
      g.textBaseline = "top";
      g.fillText("Here's what scientists think. Can you build your", sx + sw/2, sy + 2);
      g.fillText("tree to show the same relationships?", sx + sw/2, sy + 23);
      
      // Arrow
      var tx = sx + sw - 35;
      var ty = sy + sh - 14;
      var dy = this.open? 5 : -5;
      g.beginPath();
      g.fillStyle = "white";
      g.moveTo(tx, ty - dy);
      g.lineTo(tx - 6, ty + dy);
      g.lineTo(tx + 6, ty + dy);
      g.closePath();
      g.fill();
   }
   
   this.animate = function() {
      
   }
   
   this.toggleBox = function() {
      if (this.open) {
         this.closeBox();
      } else {
         this.openBox();
      }
   }
   
   this.openBox = function() {
      if (!this.open) {
         this.tween.clearControlPoints();
         this.tween.setStart(this.y);
         this.tween.setEnd(0);
         this.open = true;
         this.tween.play();
         log("show", "Solution");
      }
   }
   
   this.closeBox = function() {
      if (this.open) {
         this.tween.clearControlPoints();
         this.tween.setStart(this.y);
         this.tween.setEnd(30 - this.h);
         this.open = false;
         this.tween.play();
         log("hide", "Solution");
      }
   }

   
//----------------------------------------------------------------------
// TOUCH FUNCTIONS
//----------------------------------------------------------------------
   this.containsTouch = function(tp) {
      return (tp.x >= this.x && 
              tp.y >= this.y &&
              tp.x <= this.x + this.w &&
              tp.y <= this.y + this.h);
   }
   
   this.touchDown = function(tp) {
      this.down = true;
      this.delta = { x : tp.x - this.x, y : tp.y - this.y };
   }
   
   this.touchUp = function() {
      this.delta = { x : 0, y : 0 };
      if (this.open) {
         this.closeBox();
      } else {
         this.openBox();
      }
      this.down = false;
   }
   
   this.touchDrag = function(tp) {
      var ny = tp.y - this.delta.y;
      var min = 30 - this.h;
      this.y = Math.max(min, Math.min(0, ny));
   }
   
   this._taction = function(value) {
      this.y = value;
   }
   
   this._tdone = function() {
   }
   
}