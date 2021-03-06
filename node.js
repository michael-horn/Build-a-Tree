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
// Abstract node class
//===================================================================
function Node(id) {
   this.id        = id;        // unique ID for this level
   this.name      = "";        // name of the node
   this.tag       = "";        // short name for node
   this.depth     = 0;         // depth in the tree
   this.cx        = 0;         // center x
   this.cy        = 0;         // center y
   this.w         = 75;        // width of the taxon on screen
   this.correct   = false;     // is this tree correct (according to solution)?
   this.parent    = null;      // parent node
   this.dragging  = false;     // is being dragged on screen
   this.visible   = true;
   this.delta     = { x : 0, y : 0 };
   this.pinned    = false;     // node is pinned to the mat and can't move
   this.highlight = false;
   this.token     = false;     // tangible token on table for this node?
   
   
   this.copyNode = function(node) {
      node.id        = this.id;
      node.name      = this.name;
      node.tag       = this.tag;
      node.depth     = this.depth;
      node.cx        = this.cx;
      node.cy        = this.cy;
      node.w         = this.w;
      node.correct   = this.correct;
      node.parent    = null;
      node.dragging  = this.dragging;
      node.delta     = { x : this.delta.x, y : this.delta.y };
   }

   this.setID = function(id) {
      this.id = id;
   }
   
   this.getID = function() {
      return this.id;
   }

   this.setName = function(name) {
      this.name = name;
   }
   
   this.getName = function() {
      return this.name;
   }
   
   this.setTag = function(tag) {
      this.tag = tag;
   }
   
   this.getTag = function() {
      return this.tag;
   }
   
   this.hasTag = function() {
      return (this.tag != null && this.tag.length > 0);
   }
   
   this.getDepth = function() {
      return this.depth;
   }
   
   this.setDepth = function(depth) {
      this.depth = depth;
   }
   
   this.setCenter = function(cx, cy) {
      this.cx = cx;
      this.cy = cy;
   }
   
   this.getX = function() {
      return this.cx - this.w/2;
   }
   
   this.getY = function() {
      return this.cy - this.w/2;
   }
   
   this.getCenterX = function() {
      return this.cx;
   }
   
   this.getCenterY = function() {
      return this.cy;
   }
   
   this.getWidth = function() {
      return this.w;
   }
   
   this.move = function(dx, dy) {
      this.cx += dx;
      this.cy += dy;
   }      
   
   this.isCorrect = function() {
      return this.correct;
   }
   
   this.setCorrect = function(correct) {
      this.correct = correct;
   }
   
   this.setParent = function(parent) {
      this.parent = parent;
   }
   
   this.getParent = function() {
      return this.parent;
   }
   
   this.hasParent = function() {
      return this.parent != null;
   }
   
   this.isRoot = function() {
      return this.parent == null;
   }
   
   this.getRoot = function() {
      var p = this.parent;
      if (p == null) return this;
      while (p.parent != null) {
         p = p.parent;
      }
      return p;
   }
   
   this.isDescendantOf = function(node) {
      var p = this;
      while (p != null) {
         if (p == node) {
            return true;
         } else {
            p = p.parent;
         }
      }
      return false; 
   }
   
   this.isDragging = function() {
      return this.dragging;
   }
   
   this.isAncestorDragging = function() {
      var p = this;
      while (p) {
         if (p.isDragging()) return true;
         p = p.getParent();
      }
      return false;
   }
   
   this.isIdentical = function(tree) {
      if (tree) {
         return tree.getID() == this.getID();
      } else {
         return false;
      }
   }
   
   this.isVisible = function() {
      return this.visible;
   }
   
   this.setVisible = function(v) {
      this.visible = v;
   }
   
   this.isPinned = function() {
      return this.pinned;
   }
   
   this.setPinned = function(pinned) {
      this.pinned = pinned;
   }
   
   this.isHighlighted = function() {
      return this.highlight;
   }
   
   this.setHighlight = function(h) {
      this.highlight = h;
   }
   
   this.hasToken = function() {
      return this.token;
   }
   
   this.setToken = function(token) {
      this.token = token;
   }
   
//----------------------------------------------------------------------
// Location of this node in relation to parent
//----------------------------------------------------------------------
   this.getWaterline = function() {
      if (this.hasParent()) {
         var p = this.getParent();
         var dd = p.getDepth() - this.getDepth();
         return p.getCenterY() - (SPRING_LENGTH * dd);
      } else {
         return this.getCenterY();
      }
   }
   

//----------------------------------------------------------------------
// VIRTUAL FUNCTIONS 
//----------------------------------------------------------------------
   this.isTip = function() { return false; }
   
   this.hasChildren = function() { return false; }
   
   this.draw = function(g) { }
   
   this.drawHighlight = function(g) { }
   
   this.animate = function() { }
   
   this.sortChildren = function() { }
   
   this.validate = function(solution) {
      this.setCorrect(true);
   }
   
   this.findParentByX = function(x) { return null; }
   
   this.clone = function() { return null; }

   this.invalidate = function() { return; }

   this.getTreeString = function() { return ""; }
   
   this.isDocked = function() { return false; }
   
   this.computeDepth = function() { }
   
//----------------------------------------------------------------------
// TOUCH FUNCTIONS
//----------------------------------------------------------------------
   
   this.containsTouch = function(tp) {
      
      // don't allow touch for tokens on the table
      if (this.hasToken()) return false;
      
      var x = this.getX();
      var y = this.getY();
      var w = this.w;
      var h = this.w;
      if (tp.x >= x && tp.y >= y && tp.x <= x + w && tp.y <= y + h) {
         return true;
      }
      if (this.hasParent()) {
         x = this.getCenterX() - 6;
         y = this.getCenterY();
         var py = this.parent.getCenterY();
         return (tp.x >= x && tp.x <= x + 12 && tp.y >= y && tp.y <= py + 10);
      }
      return false;
   }
   
   this.touchDown = function(tp) {
      this.dragging = true;
      this.delta = { x : tp.x - this.cx, y : tp.y - this.cy };
      this.getRoot().setPinned(true);
      log("drag", this.getTreeString());
   }
   
   this.touchUp = function() {
      this.delta = { x : 0, y : 0 };
      buildTree();
      this.dragging = false;
      var t = this;
      //ctimer = setTimeout( function() { t.hideCutButton(); }, 3000 ); // SCISSORS
      this.getRoot().setPinned(false);
   }
   
   this.touchDrag = function(tp) {
      this.docked = false;
      var dx = tp.x - this.cx - this.delta.x;
      var dy = tp.y - this.cy - this.delta.y;
      if (Math.abs(dx) >= 1 || Math.abs(dy) >= 1) {
         this.move(dx, dy);
         tree.sort();
         buildPreviewTree();
      }
   }
}
