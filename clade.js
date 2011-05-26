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
// Internal node (clade)
//===================================================================
function Clade(id) {
   
   // call superclass constructor
   this.scnstrctr = Node; 
   this.scnstrctr(id);
   
   this.trait     = "";        // synapomorphy
   this.children  = [];        // list of child nodes
   this.snap      = null;


   this.setTrait = function(trait) {
      this.trait = trait;
   }
   
   this.getTrait = function() {
      return this.trait;
   }
   
   this.hasTrait = function() {
      return (this.trait && this.trait.length > 0);
   }
   
   this.isTip = function() {
      return false;
   }
   
   this.move = function(dx, dy) {
      this.cx += dx;
      this.cy += dy;
      for (var i=0; i<this.children.length; i++) {
         this.children[i].move(dx, dy);
      }
   }
   
   this.addChild = function(child) {
      if (child) {
         this.children.push(child);
         child.parent = this;
      }
   }
   
   this.removeChild = function(child) {
      
      // remove the child from the list
      for (var i=0; i<this.children.length; i++) {
         if (this.children[i] == child) {
            this.children.splice(i, 1);
            child.parent = null;
            break;
         }
      }
      
      // collapse singleton tree
      if (this.getChildCount() == 1) {
         var c = this.getFirstChild();
         c.parent = null;
         if (this.parent) {
            var p = this.parent;
            p.addChild(c);
            p.removeChild(this);
         }
         tree.remove(this);
         removeTouchable(this);
      }
   }

   
   this.getChildCount = function() {
      return this.children.length;
   }
   
   
   this.getChild = function(i) {
      if (i >= 0 && i < this.children.length) {
         return this.children[i];
      } else {
         return null;
      }
   }
   
   this.containsChild = function(child) {
      for (var i=0; i<this.children.length; i++) {
         if (this.children[i] == child) {
            return true;
         }
      }
      return false;
   }
   
   this.hasChildren = function() {
      return this.children.length > 0;
   }
   
   this.getFirstChild = function() {
      return this.getChild(0);
   }
   
   this.getLastChild = function() {
      return this.getChild(this.getChildCount() - 1);
   }
   
   this.getChildByID = function(id) {
      for (var i=0; i<this.children.length; i++) {
         var child = this.children[i];
         if (child.getID() == id) {
            return child;
         }
      }
      return null;
   }
   
   this.getFirstTip = function() {
      var a = this.getFirstChild();
      if (a == null) return null;
      if (a.isTip()) {
         return a;
      } else {
         return a.getFirstTip();
      }
   }
   
   this.getLastTip = function() {
      var a = this.getLastChild();
      if (a == null) return null;
      if (a.isTip()) {
         return a;
      } else {
         return a.getLastTip();
      }
   }
   
   this.sortChildren = function() {
      for (var i=0; i<this.children.length; i++) {
         this.children[i].sortChildren();
      }
      this.children.sort( function(a, b) { return (a.cx - b.cx); } );
   }
   
   this.getTips = function(list) {
      for (var i=0; i<this.children.length; i++) {
         var t = this.children[i];
         if (t.isTip()) {
            list.push(t);
         } else {
            t.getTips(list);
         }
      }
   }


   this.startSnap = function() {
      this.snap = new AnimatedText();
      this.snap.setTextColor(0xff, 0xcc, 0x33);
      this.snap.setText(this.getName());
      this.snap.useOutline(true);
      this.snap.useShadow(true);
      this.snap.setFontWeight("bold");
      this.snap.setCenter(this.getCenterX(), this.getCenterY() + 50);
      this.snap.setDelay(500);
      this.snap.setDuration(1200);
      this.snap.startZoomIn();
   }
   
//----------------------------------------------------------------------
// Deterministic layout algorithm (not force-directed)
//----------------------------------------------------------------------
   this.layout = function(maxDepth) {
      this.treeY = this.depth / maxDepth;
      this.treeX = 0;
      for (var i=0; i<this.children.length; i++) {
         var child = this.children[i];
         if (!child.isTip()) {
            child.layout(maxDepth);
         }
         this.treeX += this.children[i].treeX;   
      }
      this.treeX /= this.children.length;
   }
   
   
//----------------------------------------------------------------------
// Is this subtree correct compared to the solution tree?
//----------------------------------------------------------------------
   this.validate = function(solution) {
      
      this.setCorrect(false);
      if (!this.hasChildren()) return;
      
      
      // try to find corresponding node in parent tree      
      var s;
      if (this.getID() == 0) {
         var c = this.getFirstChild();
         var sc = solution.findTaxon(c.getID());
         if (sc) {
            s = sc.getParent();
         }
      } else {
         s = solution.findTaxon(this.getID());
      }
      
      // Make sure corresponding node exists in solution tree
      if (s && s.hasChildren()) {
      
         // Make sure child counts are the same
         if (s.getChildCount() == this.getChildCount()) {

            // Make sure child subtress are valid      
            for (var i=0; i<this.children.length; i++) {
               var child = this.children[i];
               
               // recursively validate child trees
               if (s.getChildByID(child.getID())) {
                  child.validate(solution);
               } else {
                  return;
               }
         
               // if any child is not valid, the parent is also not valid
               if (!child.isCorrect()) {
                  return;
               }
            }
            
            // Correct!
            this.setID(s.getID());
            this.setName(s.getName());
            this.setTrait(s.getTrait());
            this.setCorrect(true);
         }
      }
   }

   
   this.draw = function(g) {
      if (!this.hasChildren()) return;
      this.computePosition();
      
      var x0 = this.getFirstChild().getCenterX();
      var x1 = x0;
      g.strokeStyle = this.isCorrect()? "white" : "rgba(255, 255, 255, 0.3)";
      g.lineCap = "round";
      g.lineWidth = 8;
      
      g.beginPath();
      
      // Vertical lines to children
      for (var i=0; i<this.children.length; i++) {
         var c = this.children[i];
         g.moveTo(c.getCenterX(), c.getCenterY());
         g.lineTo(c.getCenterX(), this.getCenterY());
         x0 = Math.min(x0, c.getCenterX());
         x1 = Math.max(x1, c.getCenterX());
      }

      // Horizontal joining line
      g.moveTo(x0, this.cy);
      g.lineTo(x1, this.cy);
      
      // Vertical stub for roots
      if (this.isRoot()) {
         g.moveTo(this.getCenterX(), this.getCenterY() + 2);
         g.lineTo(this.getCenterX(), this.getCenterY() + 40);
      }
      g.stroke();
      
      // Trait markers
      if (this.isCorrect() && this.hasTrait() && this.snap && !this.snap.isAnimating()) {
         var ty = this.getCenterY() + 22;
         if (this.hasParent()) {
            ty = (this.getCenterY() + this.parent.getCenterY()) / 2;
         }
         g.lineWidth = 4;
         g.beginPath();
         g.moveTo(this.cx - 10, ty);
         g.lineTo(this.cx + 10, ty);
         g.stroke();
         g.fillStyle = "rgba(255, 255, 255, 0.7)";
         g.textAlign = "left";
         g.textBaseline = "middle";
         g.font = "11pt Arial, sans-serif";
         g.beginPath();
         g.fillText(this.trait, this.cx + 15, ty);
      }       
      
      // Draw snap text
      if (this.snap) {
         this.snap.setCenter(this.cx, this.cy + 60);
      }
   }

   this.computePosition = function() {
      var x = 0;
      var y = 0;
      var tips = [];
      this.getTips(tips);
      for (var i=0; i<tips.length; i++) {
         x += tips[i].getCenterX();
         y = Math.max(tips[i].getCenterY(), y);
      }
      this.depth = 0;
      for (var i=0; i<this.children.length; i++) {
         this.depth = Math.max(this.depth, this.children[i].getDepth() + 1);
      }
      
      this.cx = x / tips.length;
      this.cy = y + 65 * this.depth;
   }   

   
}
