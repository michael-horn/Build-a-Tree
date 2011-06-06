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
var canvas; 
var context;
var tree;

var visuals = [];  // array of non-touchable visible objects to draw


function startup() {
   canvas = document.getElementById("world");
   context = canvas.getContext('2d');
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   
   window.onresize = resize;
   
   tree = new Tree();
   
   restart();
   setInterval(tick, 30);
   defineEventHandlers(canvas);
}


function restart() {
   var w = canvas.width;
   var h = canvas.height;
   
   tree.clear();
   touchables = [];
   
   var clade;
   var level = LEVELS[6];
   
   for (var i=0; i<level.taxa.length; i++) {
      var t = level.taxa[i];

      // only add tips to the list of taxa
      if (t.depth == 0) {
         clade = new Tip(t.id);
         clade.setImageSrc(t.tag);
         clade.setHintText(t.hint);
         clade.setDocked(false);
         clade.setCenter(Math.random() * w, Math.random() * h);
         addTouchable(clade);
      } else {
         clade = new Clade(t.id);
         clade.setTrait(t.trait);
      }
      clade.setCorrect(true);
      clade.setTag(t.tag);
      clade.setName(t.name);
      clade.setDepth(t.depth);
    
      clade.touchDown = function(tp) {  
         this.dragging = true;
         this.delta = { x : tp.x - this.cx, y : tp.y - this.cy };
      }
   
      clade.touchUp = function() {
         this.delta = { x : 0, y : 0 };
         this.dragging = false;
      }
      
      clade.touchDrag = function(tp) {
         this.docked = false;
         var dx = tp.x - this.cx - this.delta.x;
         var dy = tp.y - this.cy - this.delta.y;
         if (Math.abs(dx) >= 1 || Math.abs(dy) >= 1) {
            this.move(dx, dy);
         }
      }      
      tree.add(clade);
      
      var parent = tree.findTaxonByID(t.parent_id);
      if (parent) parent.addChild(clade);
   }
}

function playSound(name) {
   var audio = document.getElementById("sound-" + name);
   if (audio) {
      audio.play();
   }
}

function resize(evt) {
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
}


function tick() {
   animate();
   draw();
}


function animate() {
   for (var i=0; i<tree.count(); i++) {
      var t = tree.getTaxon(i);
      if (t.isTip()) {
         t.setVisible(t.getCenterX() > 100);
      }
   }
}

function draw() {
   var g = context;
   var w = canvas.width;
   var h = canvas.height;
   
   g.clearRect(0, 0, w, h);
   
   tree.draw(g);
   
   // Draw extra visuals
   for (var i=0; i<visuals.length; i++) {
      visuals[i].draw(g);
   }
}

function addVisual(visual) {
   visuals.push(visual);
}

function removeVisual(visual) {
   for (var i=0; i<visuals.length; i++) {
      if (visuals[i] == visual) {
         visuals.splice(i, 1);
         return;
      }
   }
}

