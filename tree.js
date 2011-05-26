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


const SPRING_LENGTH = 65;


//==============================================================
// Tree contains a list of taxa that can be organized into a
// tree structure
//==============================================================
function Tree() {
   
   this.taxa = [];   // list of taxa
   this.button = null;   // level done button

   
//--------------------------------------------------------------
// clear -- remove all taxa from the tree
//--------------------------------------------------------------
   this.clear = function() {
      this.taxa = [];
   }
   
   
//--------------------------------------------------------------
// add -- add a taxon to the list
//--------------------------------------------------------------
   this.add = function(taxon) {
      this.taxa.push(taxon);
   }
   
   
//--------------------------------------------------------------
// remove -- remove a taxon from the list
//--------------------------------------------------------------
   this.remove = function(taxon) {
      for (var i=0; i<this.taxa.length; i++) {
         if (this.taxa[i] == taxon) {
            return this.taxa.splice(i, 1);
         }
      }
      return null;
   }
   
   
//--------------------------------------------------------------
// getTaxon -- returns the given taxon
//--------------------------------------------------------------
   this.getTaxon = function(i) {
      if (i >= 0 && i < this.taxa.length) {
         return this.taxa[i];
      }
      return null;
   }
   
   
//--------------------------------------------------------------
// findTaxon -- searches for taxon by id number
//--------------------------------------------------------------
   this.findTaxon = function(id) {
      for (var i=0; i<this.taxa.length; i++) {
         if (this.taxa[i].getID() == id) return this.taxa[i];
      }
      return null;
   }
   
   
//--------------------------------------------------------------
// count -- returns the number of taxa in the list
//--------------------------------------------------------------
   this.count = function() {
      return this.taxa.length;
   }
   
   
//--------------------------------------------------------------
// getRoot -- returns the first root in the list
//--------------------------------------------------------------
   this.getRoot = function() {
      for (var i=0; i<this.taxa.length; i++) {
         if (this.taxa[i].isRoot()) return this.taxa[i];
      }
      return null;
   }
   
   
//--------------------------------------------------------------
// Is there a single root? (return it or null)
//--------------------------------------------------------------
   this.getSingleRoot = function() {
      var root = null;
      for (var i=0; i<this.taxa.length; i++) {
         if (this.taxa[i].isRoot()) {
            if (root != null) {
               return null;
            } else {
               root = this.taxa[i];
            }
         }
      }
      return root;
   }


//--------------------------------------------------------------
// draw
//--------------------------------------------------------------
   this.draw = function(g) {
      for (var i=0; i<this.taxa.length; i++) {
         this.taxa[i].draw(g);
      }

      // Draw next level button      
      var root = this.getSingleRoot();
      if (root) {
         if (!this.button) this.createButton();

         this.button.setCenter(
               root.getCenterX(),
               root.getCenterY() + 60);
         
         this.button.draw(g);
      } else {
         if (this.button) this.removeButton();
      }
   }


//--------------------------------------------------------------
// sorts subtrees by left to right order of tips
//--------------------------------------------------------------
   this.sort = function() {
      for (var i=0; i<this.taxa.length; i++) {
         var t = this.taxa[i];
         if (!t.isTip()) {
            t.sortChildren();
         }
      }
   }

   
//--------------------------------------------------------------
// finds the common ancestor of two taxa
//--------------------------------------------------------------
   this.findCommonAncestor = function(a, b) {
      if (!a || !b) return null;
      if (a.getRoot() != b.getRoot()) return null;
      var c = a;
      while (c != null) {
         if (b.isDescendantOf(c)) {
            return c;
         } else {
            c = c.parent;
         }
      }
      return null;
   }

   
//--------------------------------------------------------------
// animate
//--------------------------------------------------------------
   this.animate = function() {
      
      // magnetic hint force
      for (var i=0; i<this.taxa.length; i++) {
         var t = this.taxa[i];
         
         if (t.isTip()) {
            t.force = { fx : 0, fy : 0, stress : 0 };
         }
         
         if (t.isTip() && hint.intersects(t)) {
            hint.setHighlight(true);
            
            if (!t.isDragging()) {
               hint.showHint(t);
               var dx = hint.getCenterX() - t.getCenterX();
               var dy = hint.getCenterY() - t.getCenterY();
               t.force.fx += (dx * 0.6);
               t.force.fy += (dy * 0.6);
            }
         }
      }
      
      // start by computing forces for the tips
      for (var i=0; i<this.taxa.length; i++) {
         var clade = this.taxa[i];
         
         if (clade.isRoot() && clade.hasChildren()) {
            var a, b, force;
            var tips = [];
            clade.getTips(tips);
   
            // gravity / waterline
            var waterline = (canvas.height / 2) - (65 * clade.getDepth() / 2);

            for (var j=0; j<tips.length; j++) {
               a = tips[j];
               a.force.fy += (waterline - a.cy) * 0.1;
            }
            
            // spring forces
            for (var j=0; j<tips.length - 1; j++) {
               a = tips[j];
               b = tips[j+1];
               force = getForce(a, b, SPRING_LENGTH);
               a.force.fx += force.fx;
               a.force.fy += force.fy;
               a.force.stress = Math.max(force.stress, a.force.stress);
               b.force.fx -= force.fx;
               b.force.fy -= force.fy;
               b.force.stress = Math.max(force.stress, b.force.stress);
               
            }
            
            // this spring pulls the string of nodes apart
            var a = tips[0];
            var b = tips[tips.length - 1];
            force = getForce(a, b, SPRING_LENGTH * tips.length * 1.1);
            a.force.fx += force.fx * 2;
            a.force.fy += force.fy;
            b.force.fx -= force.fx * 2;
            b.force.fx -= force.fy;
         }
      }

      // animate the taxa
      for (var i=0; i<this.taxa.length; i++) {
         this.taxa[i].animate();
      }
   }
   
   
//--------------------------------------------------------------
// Find all overlapping taxa
//--------------------------------------------------------------
   this.findOverlaps = function(taxon) {
      var list = [];
      var a = taxon;
      for (var i=0; i<this.taxa.length; i++) {
         var b = this.taxa[i];
         if (b.isTip() && b != a) {
            var dx = Math.abs(a.cx - b.cx);
            var dy = Math.abs(a.cy - b.cy);
            var r = a.w;
            if ((dx * dx + dy * dy) < (r * r)) {
               list.push(b);
            }
         }
      }
      return list;
   }
   
   
//--------------------------------------------------------------
//  Compare nodes in this tree the solution tree. Mark correct
//  subtrees.
//--------------------------------------------------------------
   this.validateTree = function(solution) {
      var count = 0;
      var t, root;
      
      for (var i=0; i<this.taxa.length; i++) {
         t = this.taxa[i];
         if (t.isRoot()) {
            root = t;
            count++;
            if (t.hasChildren()) {
               t.validate(solution);
               if (t.isCorrect() && !t.snap) {
                  t.startSnap();
               }
            }
         }
      }
   }
   
   
//--------------------------------------------------------------
//--------------------------------------------------------------
   this.breakTree = function(taxon) {
      if (taxon.hasParent()) {
         taxon.parent.removeChild(taxon);
         this.validateTree(solution);
         this.sort();
      }
   }

   
//--------------------------------------------------------------
// Builds a tree by combining overlapping taxa.
// Returns newly added clade (or null if none is created)
//--------------------------------------------------------------
   this.buildTree = function(taxon) {
      var list = this.findOverlaps(taxon);
      if (list.length == 0) return null;

      var root = taxon.getRoot();
      var roots = [];
      roots.push(root);
      
      // Find all unique subtrees to be joined
      for (var i=0; i<list.length; i++) {
         var t = list[i].getRoot();
         if (roots.indexOf(t) < 0) {
            roots.push(t);
         }
      }
   
      // Create a new parent node joining the current taxa with all
      // other overlapping subtrees
      if (roots.length > 1) {
         playSound("thip");
         var clade = new Clade(0);
         for (var id in roots) {
            clade.addChild(roots[id]);
         }
         this.taxa.unshift(clade);
         touchables.push(clade);
         
         this.validateTree(solution);
         this.sort();
         
         return clade;
      }
      return null;
   }

//--------------------------------------------------------------
// drawSmallTree
//--------------------------------------------------------------
   this.drawSmallTree = function(g, x, y, w, h) {
      var root = this.getRoot();
      var tips = [];
      root.getTips(tips);
      if (tips.length < 2) return;
      
      // layout tips
      for (var i=0; i<tips.length; i++) {
         var t = tips[i];
         t.treeY = 0;
         t.treeX = i / (tips.length - 1);
      }
      
      // layout internal nodes
      root.layout(root.getDepth());
      
      g.fillStyle = "white";
      g.fillRect(x, y, w, h);
      
      // draw tree structure
      x += 25;
      y += 25;
      w -= 50;
      h -= 50;
      g.fillStyle = "black";
      g.strokeStyle = "black";
      g.lineWidth = 3;
      g.lineCap = "round";
      g.beginPath();
      this.drawSubtree(g, x, y, w, h, root);
      g.stroke();
      
      g.fillStyle = "white";
      g.fillRect(x - 10, y, w + 20, 25);
      
      // draw tip decorations
      for (var i=0; i<tips.length; i++) {
         var t = tips[i];
         var tx = t.treeX * w + x;
         var ty = y;
         g.drawImage(t.getImage(), tx - 20, ty - 20, 40, 40);
      }
   }
   
   this.drawSubtree = function(g, x, y, w, h, taxon) {
      if (taxon.hasChildren()) {
         var a = taxon.getFirstChild();
         var b = taxon.getLastChild();
         var tx0 = a.treeX * w + x;
         var tx1 = b.treeX * w + x;
         var ty0 = taxon.treeY * h + y;
         var ty1;
         
         g.moveTo(tx0, ty0);
         g.lineTo(tx1, ty0);
         for (var i=0; i<taxon.getChildCount(); i++) {
            a = taxon.getChild(i);
            tx0 = a.treeX * w + x;
            ty1 = a.treeY * h + y;
            g.moveTo(tx0, ty0);
            g.lineTo(tx0, ty1);
            
            this.drawSubtree(g, x, y, w, h, a);
         }
         
         if (taxon.isRoot()) {
            tx0 = taxon.treeX * w + x;
            g.moveTo(tx0, ty0);
            g.lineTo(tx0, ty0 + 20);
         }
      }
   }

   
   this.removeButton = function() {
      if (this.button) {
          removeTouchable(this.button);
          this.button = null;
      }
   }
   
   
   this.createButton = function() {
      this.button = new Button(0, 0, 40, 40);
      this.button.visible = false;
      addTouchable(this.button);
      var t = this;
      setTimeout(
         function() { if (t.button) { t.button.visible = true; }},
         2300);

      this.button.action = function() {
         setTimeout(function() { showSolution(); }, 500);
      }
      this.button.draw = function(g) {
         if (!this.visible) return;
         var cx = this.x + this.w/2;
         var cy = this.y + this.h/2;
         g.save();
         g.shadowOffsetX = 1;
         g.shadowOffsetY = 1;
         g.shadowBlur = 1;
         g.shadowColor = "#333";
         g.strokeStyle = "white";
         //g.fillStyle = "#39C";
         g.fillStyle = (this.isDown() && this.isOver()) ? "green" : "#069";
         g.lineWidth = 4;
         g.beginPath();
         g.arc(cx, cy, 20, 0, Math.PI * 2, true);
         g.fill();
         g.stroke();
         g.fillStyle = "#fc3";
         g.strokeStyle = "#c00";
         g.lineWidth = 1;
         g.beginPath();
         g.moveTo(cx - 8, cy - 10);
         g.lineTo(cx + 12, cy);
         g.lineTo(cx - 8, cy + 10);
         g.closePath();
         g.fill();
         g.stroke();
         g.restore();
      }
   }
   
}

function getForce(a, b, nl) {
   var dx = a.cx - b.cx;
   var dy = a.cy - b.cy;
   var sl = Math.sqrt(dx * dx + dy * dy);
   var m = 1 - sl/nl;
   var fx, fy;
   if (sl != 0) {
      fx = (dx / sl) * m * 10;
      fy = (dy / sl) * m * 10;
   } else {
      fx = Math.random(20) - 10;
      fy = Math.random(20) - 10;
   }
   return { fx : fx, fy : fy, stress : -m };      
}