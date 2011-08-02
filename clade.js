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

var CLADE_ID  =  1000;  // unique ID generator



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



   this.clone = function() {
      var copy = new Clade(this.getID());
      this.copyNode(copy);
      copy.trait = this.trait;
      return copy;
   }


   this.setTrait = function(trait) {
      this.trait = trait;
   }
   
   this.getTrait = function() {
      return this.trait;
   }
   
   this.hasTrait = function() {
      return (this.trait && this.trait.length > 0);
   }
   
   this.move = function(dx, dy) {
      this.cx += dx;
      this.cy += dy;
      for (var i=0; i<this.children.length; i++) {
         this.children[i].move(dx, dy);
      }
   }
   
   this.computeDepth = function() {
      this.depth = 0;
      for (var i=0; i<this.children.length; i++) {
         this.depth = Math.max(this.depth, this.children[i].getDepth() + 1);
      }
   }
   
   this.addChild = function(child) {
      if (child) {
         this.children.push(child);
         child.parent = this;
         this.computeDepth();
      }
   }
   
   this.replaceChild = function(oldChild, newChild) {
      for (var i=0; i<this.children.length; i++) {
         if (this.children[i] == oldChild) {
            this.children[i] = newChild;
            newChild.parent = this;
            this.computeDepth();
            break;
         }
      }
   }
   
   
//----------------------------------------------------------------------
// Remove a child from the list of children and collapse singleton trees
//----------------------------------------------------------------------
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
      
      this.computeDepth();
   }
   
   
//----------------------------------------------------------------------
// Break apart tree and all supertrees
//----------------------------------------------------------------------
   this.breakTree = function() {
      log("breaking", this.getTreeString());
      for (var i=0; i<this.children.length; i++) {
         this.children[i].parent = null;
      }
      if (this.hasParent()) {
         this.getParent().breakTree();
      }
      tree.remove(this);
      removeTouchable(this);
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
   
   this.getChildByTag = function(tag) {
      for (var i=0; i<this.children.length; i++) {
         var child = this.children[i];
         if (child.hasTag() && child.getTag() == tag) {
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
   
//--------------------------------------------------------------
// find the shallowest parent intersecting the given x-coord
//--------------------------------------------------------------
   this.findParentByX = function(x) {
      var tips = [];
      this.getTips(tips);
      if (tips.length == 0) return null;
      
      var minX = tips[0].getCenterX();
      var maxX = tips[0].getCenterX();
      
      for (var i=1; i<tips.length; i++) {
         minX = Math.min(tips[i].getCenterX(), minX);
         maxX = Math.max(tips[i].getCenterX(), maxX);
      }
      
      if (x < minX || x > maxX) return null;

      for (var i=0; i<this.children.length; i++) {
         var c = this.children[i].findParentByX(x);
         if (c != null) {
            return c;
         }
      }
      return this;
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
   
   this.getTreeString = function() {
      var s = "( ";
      for (var i=0; i<this.children.length; i++) {
         s += this.children[i].getTreeString() + " ";
      }
      return (s + ")");
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


   this.invalidate = function() {   
      this.setCorrect(false);
      for (var i=0; i<this.children.length; i++) {
         this.children[i].invalidate();
      }
   }
   
   
//----------------------------------------------------------------------
// Is this subtree correct compared to the solution tree?
//----------------------------------------------------------------------
   this.validate = function(solution) {
      
      this.setCorrect(false);
      if (!this.hasChildren()) return;
      
      
      // try to find corresponding node in parent tree
      var s;
      if (!this.hasTag()) {
         var c = this.getFirstChild();
         var sc = solution.findTaxonByID(c.getID());
         if (sc) {
            s = sc.getParent();
         }
      } else {
         s = solution.findTaxonByID(this.getID());
      }
      
      // Make sure corresponding node exists in solution tree
      if (s && s.hasChildren()) {
      
         // Make sure child counts are the same
         if (s.getChildCount() == this.getChildCount()) {

            // Make sure child subtress are valid      
            for (var i=0; i<this.children.length; i++) {
               var child = this.children[i];
               if (!child.isCorrect()) return;
               if (s.getChildByID(child.getID()) == null) return;
            }
               
            // Correct!
            this.setID(s.getID());
            this.setTag(s.getTag());
            this.setName(s.getName());
            this.setTrait(s.getTrait());
            this.setCorrect(true);
         }
      }
   }
   
   
//----------------------------------------------------------------------
// animate
//----------------------------------------------------------------------
   this.animate = function() {
      if (this.isDragging() && this.hasParent()) {
         var p = this.getParent();
         var ty = this.getWaterline();
         if ((ty - this.cy) > 100) {
            tree.breakTree(this);
         }
      }
   }
   
   
//----------------------------------------------------------------------
// Draws oval around all tips with the name of the clade above
//----------------------------------------------------------------------
   this.drawHighlight = function(g) {
      var tips = [];
      this.getTips(tips);
      g.beginPath();
      x0 = tips[0].getCenterX();
      y0 = tips[0].getCenterY();
      g.moveTo(x0, y0);
      for (var i=1; i<tips.length; i++) {
         x1 = tips[i].getCenterX();
         y1 = tips[i].getCenterY();
         g.lineTo(x1, y1);
      }
      g.strokeStyle = "rgba(255, 255, 255, 0.3)";
      g.lineWidth = 68;
      g.lineCap = "round";
      g.stroke();
      g.fillStyle = "white";
      g.textAlign = "center";
      g.textBaseline = "bottom";
      g.font = "14pt Tahoma, Arial, sans-serif";
      g.beginPath();
      g.fillText(this.name, (x0 + x1) / 2, (y0 + y1) / 2 - 43);
   }

   
//----------------------------------------------------------------------
// Draws the clade
//----------------------------------------------------------------------
   this.draw = function(g) {
      if (!this.hasChildren()) return;
      
      var x0 = -1;
      var x1 = -1;
      
      g.strokeStyle = this.isCorrect()? "white" : "#6AB7DC";
      g.lineCap = "round";
      g.lineWidth = 8;
      
      x0 = this.getFirstChild().getCenterX();
      x1 = this.getLastChild().getCenterX();

      // Horizontal joining line
      g.beginPath();
      g.moveTo(x0, this.cy);
      g.lineTo(x1, this.cy);
      g.stroke();
         
      // Line to parent
      g.beginPath();
      if (this.hasParent()) {
         var wl = this.getWaterline();
         var lt = 8;  // default line thickness
         if (this.isDragging() && wl > this.cy) {
            lt = Math.max(8 - (8 * (wl - this.cy) / 100), 1);
         }
         g.lineWidth = lt;
         
         g.moveTo(this.getCenterX(), this.getCenterY() + 2);
         g.lineTo(this.getCenterX(), this.getParent().getCenterY());
      } else {
         g.moveTo(this.getCenterX(), this.getCenterY() + 2);
         g.lineTo(this.getCenterX(), this.getCenterY() + 40);
      }
      g.stroke();

      // Oval around tips
      if (this.isHighlighted()) {
         this.drawHighlight(g);
      }
      
      // Trait markers
      if (this.isCorrect() && this.hasTrait()) {
         if (!this.snap || !this.snap.isAnimating()) {
            var ty = this.getCenterY() + 22;
            if (this.hasParent()) {
               ty = (this.getCenterY() + this.parent.getCenterY()) / 2;
            }
            g.lineCap = "round";
            g.lineWidth = 4;
            g.beginPath();
            g.moveTo(this.cx - 10, ty);
            g.lineTo(this.cx + 10, ty);
            g.strokeStyle = "white";
            g.stroke();
            g.fillStyle = "rgba(255, 255, 255, 0.7)";
            g.textAlign = "left";
            g.textBaseline = "middle";
            g.font = "11pt Arial, sans-serif";
            g.beginPath();
            g.fillText(this.trait, this.cx + 15, ty);
         }
      }
      
      // Draw snap text
      //if (this.snap) {
      //   this.snap.setCenter(this.cx, this.cy + 60);
      //}
      
      // Draw cut button
      // this.drawCutButton(g);  // SCISSORS
   }
   
   
//----------------------------------------------------------------------
// Recursively determine the highlight 
//----------------------------------------------------------------------
   this.determineHighlight = function(free) {

      // if this clade is being dragged and the ancestor is not...      
      this.setHighlight(this.isDragging() && free);
      
      var subdrag = false;
      for (var i=0; i<this.children.length; i++) {
         var child = this.children[i];
         var h = child.determineHighlight(! this.isDragging() );
         if (h) subdrag = true;
      }
      
      if (!subdrag && this.isCorrect()) {
         if (this.isRoot() || ! this.getParent().isCorrect()) {
            this.setHighlight(true);
         }
      }
      
      return this.isHighlighted() || subdrag;
   }
   
//----------------------------------------------------------------------
//----------------------------------------------------------------------
   this.computePosition = function() {
      var x = 0;
      var y = 0;
      
      // recursively compute position of children and depth
      this.depth = 0;
      for (var i=0; i<this.children.length; i++) {
         var child = this.children[i];
         if (child.hasChildren()) {
            child.computePosition();
         }
         this.depth = Math.max(this.depth, child.getDepth() + 1);
      }
      
      // compute x-coordinate and y-coordinate
      var count = 0;
      var tips = [];

      this.getTips(tips);
      for (var i=0; i<tips.length; i++) {
         var tip = tips[i];
         if (tip.isVisible()) {
            x += tip.getCenterX();
            y = Math.max(tip.getCenterY(), y);
            count++;
         }
      }
      this.setVisible(count > 0);

      if (count > 0) {
         this.cx = x / count;
         this.cy = y + 65 * this.depth;
      }
   }
}
