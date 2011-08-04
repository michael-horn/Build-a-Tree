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
   
   this.taxa = [];         // list of taxa
   this.tips = [];         // list of tips
   this.button = null;     // level done button
   this.complete = false;  // all nodes are connected?


//--------------------------------------------------------------
// clone -- deep copy of the tree structure
//--------------------------------------------------------------
   this.clone = function() {
      var copy = new Tree();
      for (var i=0; i<this.taxa.length; i++) {
         copy.add(this.taxa[i].clone());
      }
      
      for (var i=0; i<this.taxa.length; i++) {
         
         // source taxon
         var source = this.taxa[i];
         
         // Copy child links to new tree
         if (source.hasChildren()) {
            var dest = copy.findTaxonByID(source.getID());
            
            for (var j=0; j<source.getChildCount(); j++) {
               var child = source.getChild(j);
               dest.addChild(copy.findTaxonByID(child.getID()));
            }
         }
      }
      return copy;
   }
   
   
//--------------------------------------------------------------
// clear -- remove all taxa from the tree
//--------------------------------------------------------------
   this.clear = function() {
      this.taxa = [];
      this.tips = [];
      this.complete = false;
   }
   
   
//--------------------------------------------------------------
// add -- add a taxon to the list
//--------------------------------------------------------------
   this.add = function(taxon) {
      this.taxa.push(taxon);
      if (taxon.isTip()) this.tips.push(taxon);
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
// findTaxonByID -- searches for taxon by id number
//--------------------------------------------------------------
   this.findTaxonByID = function(id) {
      for (var i=0; i<this.taxa.length; i++) {
         if (this.taxa[i].getID() == id) return this.taxa[i];
      }
      return null;
   }
   
   
//--------------------------------------------------------------
// findTaxonByTag -- searches for taxon by tag name
//--------------------------------------------------------------
   this.findTaxonByTag = function(tag) {
      for (var i=0; i<this.taxa.length; i++) {
         if (this.taxa[i].getTag() == tag) return this.taxa[i];
      }
      return null;
   }
   
   
//--------------------------------------------------------------
// count -- returns the number of taxa in the list
//--------------------------------------------------------------
   this.getTaxaCount = function() {
      return this.taxa.length;
   }

   
//--------------------------------------------------------------
// getTipCount -- returns the number of tips in the tree
//--------------------------------------------------------------
   this.getTipCount = function() {
      return this.tips.length;
   }

   
//--------------------------------------------------------------
// getCorrectCount -- return number of correct internal nodes
//--------------------------------------------------------------
   this.getCorrectCount = function() {
      var count = 0;
      for (var i=0; i<this.taxa.length; i++) {
         if (this.taxa[i].hasChildren() && this.taxa[i].isCorrect()) {
            count++;
         }
      }
      return count;
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
// Is there a single root for the tree?
//--------------------------------------------------------------
   this.isComplete = function() {
      return this.complete;
   }

   
//--------------------------------------------------------------
// setComplete
//--------------------------------------------------------------
   this.setComplete = function(complete) {
      this.complete = complete;
   }


//--------------------------------------------------------------
// draw
//--------------------------------------------------------------
   this.draw = function(g) {
      
      // layout the internal nodes
      for (var i=0; i<this.taxa.length; i++) {
         var clade = this.taxa[i];
         if (clade.isRoot() && clade.hasChildren()) {
            clade.computePosition();
         }
         if (clade.isRoot()) {
            clade.determineHighlight(true);
         }
      }
      
      // draw all nodes
      for (var i=0; i<this.taxa.length; i++) {
         if (this.taxa[i].isVisible()) {
            this.taxa[i].draw(g);
         }
      }
      
      var root = this.getSingleRoot();
      
      // Draw next level button      
      if (root && this.button) {
         this.button.setCenter(
               root.getCenterX(),
               root.getCenterY() + 63);
         
         this.button.draw(g);
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
      if (b.isDescendantOf(a)) return a;
      if (a.isDescendantOf(b)) return b;
      
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
// finds the common ancestor of a list of taxa
//--------------------------------------------------------------
   this.findCommonAncestorList = function(list) {
      if (list.length < 2) return null;
      var ancestor = list[0];
      for (var i=1; i<list.length; i++) {
         ancestor = this.findCommonAncestor(ancestor, list[i]);
         if (ancestor == null) return null;
      }
      return ancestor;
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
            
            if (!t.isAncestorDragging() && !t.hasParent()) {
               hint.showHint(t);
               var dx = hint.getCenterX() - t.getCenterX();
               var dy = hint.getCenterY() - t.getCenterY();
               t.force.fx += (dx * 0.6);
               t.force.fy += (dy * 0.6);
            }
         }
      }
      
      // start by computing forces for the tips
      var count = 0;
      for (var i=0; i<this.taxa.length; i++) {
         var clade = this.taxa[i];
         
         if (clade.isRoot() && clade.hasChildren()) {
            count++;
            var a, b, force;
            var tips = [];
            clade.getTips(tips);
   
            // gravity / waterline
            /*
            var waterline = (canvas.height / 2) - (65 * clade.getDepth() / 2);

            for (var j=0; j<tips.length; j++) {
               a = tips[j];
               a.force.fy += (waterline - a.cy) * 0.1;
            }
            */
            
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
      
      // do we need a next level button?
      if (this.isComplete()) {
         var root = this.getSingleRoot();
         if (root && root.isCorrect()) {
            if (!this.button) this.createNextButton();
         } else {
            if (!this.button) this.createQuestionButton();
         }
      } else {
         if (this.button) this.removeButton();
      }
   }
   
   
//--------------------------------------------------------------
// Find an overlapping tip if there is one
//--------------------------------------------------------------
   this.findOverlap = function() {
      
      for (var i=0; i<this.tips.length; i++) {
         var a = this.tips[i];
         if (a.isAncestorDragging()) {       
            for (var j=0; j<this.tips.length; j++) {
               var b = this.tips[j];
               if (a.overlaps(b)) {
                  
                  // this prevents reverse-order duplicates
                  if (!b.isAncestorDragging() || j > i) {
                     return { a : a, b : b };
                  }
               }
            }
         }
      }
      return null;
   }
   
   
//--------------------------------------------------------------
//  Compare nodes in this tree the solution tree. Mark correct
//  subtrees.
//--------------------------------------------------------------
   this.validateTree = function(solution) {
      
      var depth = 0;
      var count = 0;
      
      do {
         count = 0;
         for (var i=0; i<this.taxa.length; i++) {
            var t = this.taxa[i];
            if (t.getDepth() == depth) {
               count++;
               t.validate(solution);
               if (t.isCorrect() && t.hasChildren()) {
                  //if (!t.snap) t.startSnap();
               }
            }
         }
         depth++;
      } while (count > 0);
   }
   
   
//--------------------------------------------------------------
// Breaks a tree apart starting at taxon and working upward
//--------------------------------------------------------------
   this.breakTree = function(taxon) {
      if (taxon.hasParent()) {
         log("disconnect", taxon.getTreeString());
         taxon.getParent().breakTree();
         this.validateTree(solution);
         this.sort();
         this.complete = false;
      }
   }


//--------------------------------------------------------------
// PRIVATE
// Join two subtrees by creating a new common ancestor for them
//--------------------------------------------------------------
   this.joinSubtrees = function(a, b) {
      if (a == null || b == null) return null;
      a = a.getRoot();
      b = b.getRoot();
      if (a == b) return null;
      
      var clade = new Clade(CLADE_ID++);
      clade.addChild(a);
      clade.addChild(b);
      //clade.invalidate();  // recursively invalidate tree
      this.taxa.unshift(clade);
      this.sort();
      return clade;
   }


//--------------------------------------------------------------
// Graft a tip onto an existing tree
// PARAMS:
//   a - tip to graft on to the tree
//   b - overlapping tip that is part of a subtree
//--------------------------------------------------------------
/*
   this.graftTip = function(a, b) {
      if (a == null || b == null) return null;
      if (!a.isTip() || !b.isTip()) return null;
      
      var root = b.getRoot();
      var parent = root.findParentByX(a.getCenterX());
      var sibling = b;
      while (sibling.getParent() != parent) {
         sibling = sibling.getParent();
      }
      clade = new Clade(CLADE_ID++);
      clade.addChild(a);
      clade.addChild(sibling);
      if (parent != null) {
         parent.replaceChild(sibling, clade);
      }
      root.invalidate();  // recursively invalidate tree
      this.taxa.unshift(clade);
      this.sort();
      return clade;
   }
*/


//--------------------------------------------------------------
// constructTree
//--------------------------------------------------------------
   this.constructTree = function(overlap) {
      
      var t0 = this.findTaxonByID(overlap.a.getID());
      var t1 = this.findTaxonByID(overlap.b.getID());
      
      // this prevents double joining trees
      if (t0.getRoot() == t1.getRoot()) return null;

      var clade = this.joinSubtrees(t0.getRoot(), t1.getRoot());
      
      if (this.getSingleRoot() != null) {
         this.complete = true;
      }
      return clade;
   }


//--------------------------------------------------------------
// layoutSmallTree
//--------------------------------------------------------------
   this.layoutSmallTree = function() {
      var root = this.getRoot();
      var tips = [];
      root.getTips(tips);
      
      // layout tips
      for (var i=0; i<tips.length; i++) {
         var t = tips[i];
         t.treeY = 0;
         t.treeX = i / (tips.length - 1);
      }
      
      // layout internal nodes
      root.layout(root.getDepth());
   }


//--------------------------------------------------------------
// drawSmallTree
//--------------------------------------------------------------
   this.drawSmallTree = function(g, x, y, w, h) {
      var root = this.getRoot();
      var tips = [];
      root.getTips(tips);
      if (tips.length < 2) return;
      
      // draw tree structure
      x += 25;
      y += 25;
      w -= 50;
      h -= 60;
      g.lineWidth = 3;
      g.lineCap = "round";
      g.beginPath();
      this.drawSubtree(g, x, y, w, h, root);
      g.stroke();
      
      // draw tip decorations
      for (var i=0; i<tips.length; i++) {
         var t = tips[i];
         var tx = t.treeX * w + x;
         var ty = y;
         g.beginPath();
         g.arc(tx, ty, 10, 0, Math.PI * 2, true);
         g.fill();
         g.drawImage(t.getImage(), tx - 17, ty - 17, 34, 34);
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
   
   this.createNextButton = function() {
      this.button = new Button(0, 0, 40, 40);
      this.button.visible = false;
      addTouchable(this.button);
      var t = this;
      setTimeout(
         function() { if (t.button) { t.button.visible = true; }},
         2300);

      this.button.action = function() {
         log("press", "Advance Level Button");
         setTimeout(function() { showSolution(); }, 500);
      }
      
      this.button.draw = function(g) {
         if (!this.visible) return;
         var cx = this.x + this.w/2;
         var cy = this.y + this.h/2;
         g.strokeStyle = "white";
         g.fillStyle = (this.isDown() && this.isOver()) ?
            "rgba(255, 255, 255, 0.4)" :
            "rgba(255, 255, 255, 0.2)";
         g.lineWidth = 4;   
         g.beginPath();
         g.arc(cx, cy, 20, 0, Math.PI * 2, true);
         g.fill();
         g.stroke();
         g.beginPath();
         g.moveTo(cx - 8, cy - 10);
         g.lineTo(cx + 12, cy);
         g.lineTo(cx - 8, cy + 10);
         g.closePath();
         g.fillStyle = "white"; 
         g.fill();
      }
   }
   
   
   this.createQuestionButton = function() {
      this.button = new Button(0, 0, 40, 40);
      this.button.visible = false;
      addTouchable(this.button);
      var t = this;
      setTimeout(
         function() { if (t.button) { t.button.visible = true; }},
         500);

      this.button.action = function() {
         log("press", "Question Button");
         setTimeout(function() { showSolutionBox(); }, 500);
      }
      
      this.button.draw = function(g) {
         if (!this.visible) return;
         var cx = this.x + this.w/2;
         var cy = this.y + this.h/2;
         g.strokeStyle = "white";
         g.fillStyle = (this.isDown() && this.isOver()) ?
            "rgba(255, 255, 255, 0.4)" :
            "rgba(255, 255, 255, 0.2)";
         g.lineWidth = 4;   
         g.beginPath();
         g.arc(cx, cy, 20, 0, Math.PI * 2, true);
         g.fill();
         g.stroke();
         g.beginPath();
         g.fillStyle = "white";
         g.textAlign = "center";
         g.textBaseline = "middle";
         g.font = "bold 22pt Tahoma, Arial, sans-serif";
         g.fillText("?", cx + 1, cy);
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
