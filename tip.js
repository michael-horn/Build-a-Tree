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


//===================================================================
// Tip of a cladogram ( extends Node)
//===================================================================
function Tip(id) {
   
   // call superclass constructor
   this.scnstrctr = Node; 
   this.scnstrctr(id);
   
   this.image     = document.createElement("img");
   this.color     = null;
   this.force     = { fx : 0, fy : 0, stress : 0 };
   this.velocity  = { vx : 0, vy : 0 };
   this.docked    = true;
   this.tag       = "";
   this.hint      = "";
   
   
   this.setTag = function(tag) {
      this.tag = tag;
      this.image.src = "images/" + tag + ".png";
   }
   
   this.getTag = function() {
      return this.tag;
   }
   
   this.getImage = function() {
      return this.image;
   }
   
   this.setColor = function(color) {
      this.color = color;
   }
   
   this.getColor = function() {
      return this.color;
   }
   
   this.isDocked = function() {
      return this.docked;
   }
   
   this.setDocked = function(docked) {
      this.docked = docked;
   }
   
   this.setHintText = function(text) {
      this.hint = text;
   }
   
   this.getHintText = function() {
      return this.hint;
   }
   
   this.isTip = function() {
      return true;
   }
   
   this.draw = function(g) {
      if (this.isDragging()) {
         g.fillStyle = "white";
         g.textAlign = "center";
         g.textBaseline = "bottom";
         g.font = "14pt Tahoma, Arial, sans-serif";
         g.beginPath();
         g.fillText(this.name, this.cx, this.cy - this.w/2 - 5);
      }
      if (!this.hasParent()) {
         g.fillStyle = this.color;
         g.beginPath();
         g.arc(this.cx, this.cy, this.w/2 - 1.5, 0, Math.PI*2, true);
         g.fill();
      }
      g.drawImage(this.image, this.cx - this.w/2, this.cy - this.w/2);   
   }

   
   this.touchDown = function(tp) {
      this.dragging = true;
      this.delta = { x : tp.x - this.cx, y : tp.y - this.cy };
   }
   
   this.touchUp = function() {
      this.dragging = false;
      this.delta = { x : 0, y : 0 };
      tree.buildTree(this);
   }
   
   
   this.touchDrag = function(tp) {
      this.docked = false;
      var dx = tp.x - this.cx - this.delta.x;
      var dy = tp.y - this.cy - this.delta.y;
      this.move(dx, dy);
   }

   
   this.animate = function() {
      this.velocity.vx += this.force.fx;
      this.velocity.vy += this.force.fy;
      this.velocity.vx *= 0.6;
      this.velocity.vy *= 0.6;
      if (!this.isDragging()) {
         this.cx += this.velocity.vx;
         this.cy += this.velocity.vy;
      }
      else if (this.force.stress > 2.5) {
         tree.breakTree(this);
      }
   }
}
