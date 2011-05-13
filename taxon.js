var WATERLINE = 385;
var CLADE_ID = 0;
var SPRING_LENGTH = 65;


function Clade(id) {
   this.id        = id;
   this.name      = "";
   this.cx        = 0;
   this.cy        = 0;
   this.depth     = 0;
   this.parent    = null;
   this.children  = [];
   this.image     = null;
   this.color     = null;
   this.w         = 75;
   this.dragging  = false;
   this.force     = { fx : 0, fy : 0, stress : 0 };
   this.velocity  = { vx : 0, vy : 0 };
   this.delta     = { x : 0, y : 0 };
   this.docked    = true;
   this.snap      = null;
   this.button    = null;
   this.correct   = false;
   this.hint      = "";
   

   
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
   
   this.setColor = function(color) {
      this.color = color;
   }
   
   this.getColor = function() {
      return this.color;
   }
   
   this.setCenter = function(cx, cy) {
      this.cx = cx;
      this.cy = cy;
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
   
   this.moveTree = function(dx, dy) {
      this.cx += dx;
      this.cy += dy;
      for (var i=0; i<this.children.length; i++) {
         this.children[i].moveTree(dx, dy);
      }
   }
   
   this.getDepth = function() {
      return this.depth;
   }
   
   this.setDepth = function(depth) {
      this.depth = depth;
   }
   
   this.hasParent = function() {
      return this.parent != null;
   }
   
   this.setParent = function(parent) {
      this.parent = parent;
   }
   
   this.getParent = function() {
      return this.parent;
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
   
   this.isTip = function() {
      return (this.image != null && this.children.length == 0);
   }
   
   this.setImage = function(src) {
      if (src) {
        this.image = document.createElement("img");
        this.image.src = "images/" + src + ".png";
      }
   }
   
   this.getImage = function() {
      return this.image;
   }
   
   this.isDragging = function() {
      var p = this;
      while (p) {
         if (p.dragging) return true;
         p = p.getParent();
      }
      return false;
   }
   
   this.setHintText = function(text) {
      this.hint = text;
   }
   
   this.getHintText = function() {
      return this.hint;
   }
   
   this.isCorrect = function() {
      return this.correct;
   }
   
   this.setCorrect = function(correct) {
      this.correct = correct;
   }
   
   this.isDocked = function() {
      return this.docked;
   }
   
   this.setDocked = function(docked) {
      this.docked = docked;
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
   
   this.getFirstChild = function() {
      return this.getChild(0);
   }
   
   this.getLastChild = function() {
      if (this.getChildCount() > 0) {
         return this.children[this.children.length - 1];
      } else {
         return null;
      }
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
   
//----------------------------------------------------------------------
// addChild
//----------------------------------------------------------------------   
   this.addChild = function(child) {
      if (child) {
         this.children.push(child);
         child.parent = this;
         this.computePosition();
      }
   }
   
//----------------------------------------------------------------------
// removeChild
//----------------------------------------------------------------------
   this.removeChild = function(child) {
      child.parent = null;
      
      // remove the child from the list
      for (var i=0; i<this.children.length; i++) {
         if (this.children[i] == child) {
            this.children.splice(i, 1);
            break;
         }
      }

      // invalidate all ancestor taxa
      var p = this;
      while (p != null) {
         p.setCorrect(false);
         p.removeButton();
         p = p.getParent();
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
      }
   }

//----------------------------------------------------------------------
// sortChildren
//----------------------------------------------------------------------
   this.sortChildren = function() {
      for (var i=0; i<this.children.length; i++) {
         this.children[i].sortChildren();
      }
      this.children.sort( function(a, b) { return (a.cx - b.cx); } );
   }
   
   this.getTips = function(list) {
      if (this.isTip()) {
         list.push(this);
      } else {
         for (var i=0; i<this.children.length; i++) {
            this.children[i].getTips(list);
         }
      }
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
   
   this.hasChildren = function() {
      return this.children.length > 0;
   }
   
   this.layout = function(maxDepth) {
      if (this.hasChildren()) {
         this.treeY = this.depth / maxDepth;
         this.treeX = 0;
         for (var i=0; i<this.children.length; i++) {
            var child = this.children[i];
            child.layout(maxDepth);
            this.treeX += this.children[i].treeX;   
         }
         this.treeX /= this.children.length;
      }
   }
   
   this.findChildByID = function(id) {
      for (var i=0; i<this.children.length; i++) {
         var child = this.children[i];
         if (child.getID() == id) {
            return child;
         }
      }
      return null;
   }
   
//----------------------------------------------------------------------
// Compares two trees and returns true iff they contain identical
// sub-structures (based on ID numbers).
//----------------------------------------------------------------------
   this.isIdentical = function(tree) {
      if (this.hasChildren()) {
         for (var i=0; i<this.children.length; i++) {
            var a = this.children[i];
            var b = tree.findChildByID(a.getID());
            if (b) {
               if (!a.isIdentical(b)) {
                  return false;
               }
            } else {
               return false;
            }
         }
         return true;
      } else {
         return (!tree.hasChildren() && tree.getID() == this.getID());
      }
   }
   
   this.drawBubble = function(g) {
    /*
      if (this.getChildCount() > 1) {
         var a = this.getFirstTip();
         var b = this.getLastTip();
         var r = 40 + (this.depth - 1) * 3;
         g.fillStyle = "rgba(255, 255, 255, 0.2)";
         g.beginPath();
         g.arc(a.cx, a.cy, r, -Math.PI/2, Math.PI/2, true);
         g.arc(b.cx, b.cy, r, Math.PI/2, -Math.PI/2, true);
         g.closePath();
         g.fill();
      }
    */
   }
   
   
   this.drawTip = function(g) {
      if (this.isDragging()) {
         g.fillStyle = "white";
         g.textAlign = "center";
         g.textBaseline = "bottom";
         g.font = "16pt Futura, Arial, sans-serif";
         g.beginPath();
         g.fillText(this.name, this.cx, this.cy - this.w/2 - 5);
         /*
         if (this.hasParent()) {
            var dx = this.cx;
            var dy = this.parent.cy;
            g.beginPath();
            g.arc(dx, dy, 12, 0, Math.PI*2, true);
            g.fill();
            g.strokeStyle = "#990000";
            g.beginPath();
            g.lineWidth = 3;
            g.arc(dx, dy, 11, 0, Math.PI*2, true);
            g.stroke();
            g.fillStyle = "#990000";
            g.textBaseline = "middle";
            g.font = "bold 16pt'Comic Sans MS', Arial, sans-serif";
            g.fillText("x", dx, dy);
         }
         */
      }
      if (!this.hasParent()) {
         g.fillStyle = this.color;
         g.beginPath();
         g.arc(this.cx, this.cy, this.w/2 - 1.5, 0, Math.PI*2, true);
         g.fill();
      }
      g.drawImage(this.image, this.cx - this.w/2, this.cy - this.w/2);   
   }
   
   this.draw = function(g) {
      var len = this.children.length;
      if (len > 1) {
         this.drawBubble(g);
         g.strokeStyle = this.isCorrect()? "white" : "rgba(255, 255, 255, 0.3)";
         g.lineCap = "round";
         var x0 = this.children[0].cx;
         var x1 = x0;
         g.beginPath();
         for (var i=0; i<len; i++) {
            var c = this.children[i];
            g.lineWidth = 8;
            g.moveTo(c.cx, c.cy);
            g.lineTo(c.cx, this.cy);
            x0 = Math.min(x0, c.cx);
            x1 = Math.max(x1, c.cx);
         }
         g.lineWidth = 8;
         g.moveTo(x0, this.cy);
         g.lineTo(x1, this.cy);
         if (this.isRoot()) {
            g.moveTo(this.cx, this.cy);
            g.lineTo(this.cx, this.cy + 20);
         }
         g.stroke();
         if (this.button) {
            this.button.setCenter(this.cx, this.cy + 40);
            this.button.draw(g);
         }
         if (this.snap) {
            this.snap.setCenter(this.cx, this.cy + 50);
            this.snap.draw(g);
         }
      }
      else if (this.isTip()) {
         this.drawTip(g);
      }
   }
   
   this.animate = function() {
      if (this.isTip()) {
         this.velocity.vx += this.force.fx;
         this.velocity.vy += this.force.fy;
         this.velocity.vx *= 0.6;
         this.velocity.vy *= 0.6;
         if (this.isDragging()) {
            if (this.parent != null) {
               var dx = Math.abs(this.cx - WATERLINE);
               if (this.force.stress > 2 && dx > 30) {
                  this.parent.removeChild(this);
                  WATERLINE += 42;
               }
            }
         }
         else {
            this.cx += this.velocity.vx;
            this.cy += this.velocity.vy;
         }
         this.force = { fx : 0, fy : 0, stress : 0 };
         if (!this.hasParent() && onHintCircle(this)) {
            highlight_hint = true;
         }
      } else {
         this.computePosition();
         if (this.snap) {
            this.snap.animate();
         }
      }
   }
   
//==========================================================================
// TOUCH FUNCTIONS
//==========================================================================
   this.containsTouch = function(tp) {
      var x = this.cx - this.w / 2;
      var y = this.cy - this.w / 2;
      var w = this.w;
      var h = this.w;
      if (this.hasChildren()) h *= 1.25;
      return (tp.x >= x && tp.y >= y && tp.x <= x + w && tp.y <= y + h);
   }
   
   this.touchDown = function(tp) {
      this.dragging = true;
      this.delta = { x : tp.x - this.cx, y : tp.y - this.cy };
   }
   
   this.touchDrag = function(tp) {
      this.docked = false;
      var dx = tp.x - this.cx - this.delta.x;
      var dy = tp.y - this.cy - this.delta.y;
      this.moveTree(dx, dy);
      if (this.isTip()) {
         tree.sort();
      }
   }
   
   this.touchUp = function() {
      this.dragging = false;
      this.delta = { x : 0, y : 0 };
      var clade = tree.buildTree(this);
      if (clade) clade.checkSolution();
      tree.sort();
   }
   
   this.checkSolution = function() {
      var t = this.getFirstChild();
      var s = solution.findTaxon(t.getID());
      if (s && s.hasParent()) {
         var p = s.getParent();
         if (this.isIdentical(p)) {
            this.setID(p.getID());
            this.setName(p.getName());
            this.setCorrect(true);
            this.snap = new Snap();
            this.snap.setText(this.getName());
            this.snap.setCenter(this.cx, this.cy + 50);
            var e = this.snap;
            setTimeout( function() { e.start(); }, 500);
         }
      }
      
      if (tree.rootCount() == 1) {
         var root = this;
         setTimeout( function() { root.createButton(); }, 2000);
      }
   }
   
   this.computePosition = function() {
      var x = 0;
      var y = 0;
      var tips = [];
      this.getTips(tips);
      for (var i=0; i<tips.length; i++) {
         x += tips[i].cx;
         y = Math.max(tips[i].cy, y);
      }
      this.depth = 0;
      for (var i=0; i<this.children.length; i++) {
         this.depth = Math.max(this.depth, this.children[i].depth + 1);
      }
      this.cx = x / tips.length;
      this.cy = y + 65 * this.depth;
   }
   
   this.removeButton = function() {
      if (this.button) {
          removeTouchable(this.button);
          this.button = null;
      }
   }
   
   this.createButton = function() {
      this.button = new Button(this.cx - 20, this.cy - 20, 40, 40);
      touchables.unshift(this.button);
      this.button.action = function() {
         setTimeout(function() { showSolution(); }, 500);
      }
      this.button.draw = function(g) {
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
