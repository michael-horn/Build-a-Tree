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
var solution;
var hint;

var visuals = [];  // array of non-touchable visible objects to draw

var GREEN = "#33CC33";
var PURPLE = "#993399";
var ORANGE = "#FF6633";

var GREEN_DOCK = document.createElement("img");
var PURPLE_DOCK = document.createElement("img");
var ORANGE_DOCK = document.createElement("img");


function startup() {
   canvas = document.getElementById("world");
   context = canvas.getContext('2d');
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   
   window.onresize = resize;
   
   tree = new Tree();
   solution = new Tree();
   hint = new Hint();
   
   GREEN_DOCK.src  = "images/green-dock.png";
   PURPLE_DOCK.src = "images/purple-dock.png";
   ORANGE_DOCK.src = "images/orange-dock.png";
   
   restart();

   setInterval(tick, 30);
   defineEventHandlers(canvas);
   
}


function restart() {
   var w = canvas.width;
   var h = canvas.height;
   var l = getCurrentLevel();
   
   var level = LEVELS[l];
   
   tree.clear();
   solution.clear();
   
   touchables = [];
   addTouchable(hint);
   
   var clade;
   var count = 0;

   for (var i=0; i<level.taxa.length; i++) {
      var t = level.taxa[i];

      // only add tips to the list of taxa
      if (t.image) {
         clade = new Tip(t.id);
         clade.setTag(t.image);
         clade.setName(t.name);
         clade.setHintText(t.hint);
         moveToDock(clade, count++);
         tree.add(clade);
         addTouchable(clade);
      }
      
      // add everything to the solution tree
      if (t.image) {
         clade = new Tip(t.id);
         clade.setTag(t.image);
      } else {
         clade = new Clade(t.id);
         clade.setTrait(t.trait);
      }
      clade.setName(t.name);
      clade.setDepth(t.depth);
      solution.add(clade);
      var parent = solution.findTaxon(t.parent_id);
      if (parent) {
         parent.addChild(clade);
      }
   }
   if (l == 0) {
      var howto = new AnimatedText();
      howto.setText("Drag circles together to form a tree...");
      howto.setDelay(1000);
      howto.setDuration(3000);
      howto.setCenter(w/2, 300);
      howto.setFontSize(20);
      howto.setTextColor(255, 255, 255);
      howto.startFadeIn();
   }
}

function playSound(name) {
   var audio = document.getElementById("sound-" + name);
   if (audio) {
      audio.play();
   }
}

function moveToDock(clade, index) {
   var cx, cy;
   var w = canvas.width;
   var h = canvas.height;
   var i = index % 3;
   var d = Math.floor(index / 3);
   var off = 0;
   if (d == 1) {
      off = 100;
   } else if (d == 2) {
      off = -100;
   }
   clade.setDocked(true);
   
   // PURPLE
   if (i == 0) {
      clade.setCenter(w - 40, h/2 + off);
      clade.setColor(PURPLE);
   }
   
   // GREEN
   else if (i == 1) {
      clade.setCenter(40, h/2 + off);
      clade.setColor(GREEN);
   }
   
   // ORANGE
   else {
      clade.setCenter(w/2 + off, h - 40);
      clade.setColor(ORANGE);
   }
}

function resize(evt) {
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   var count = 0;
   for (var i=0; i<tree.count(); i++) {
      var t = tree.getTaxon(i);
      if (t.isTip()) {
         if (t.isDocked()) {
            moveToDock(t, count);
         }
         count++;
      }
   }
}

function tick() {
   animate();
   draw();
}

function animate() {
   var h = hint.getHighlight();
   hint.setHighlight(false);
   tree.animate();
   if (h && !hint.getHighlight()) {
      hint.hideHint();
   }
}

function draw() {
   var g = context;
   var w = canvas.width;
   var h = canvas.height;
   var r = 15;
   var l = getCurrentLevel();
   var level = LEVELS[l];
   
   g.clearRect(0, 0, w, h);
   
   // Current level
   g.font = "bold 20px Arial, sans-serif";
   g.textAlign = "center";
   g.textBaseline = "bottom";
   g.strokeStyle = "rgb(196, 72, 35)";
   g.fillStyle = "white"; //"#fc3";
   g.lineWidth = 2;
   g.beginPath();
   g.strokeText(level.name, w - 46, 30);
   g.fillText(level.name, w - 46, 30);
   
   // Docks
   g.drawImage(GREEN_DOCK, 0, h/2 - 152, 87, 304);
   g.drawImage(PURPLE_DOCK, w - 87, h/2 - 152, 87, 304);
   g.drawImage(ORANGE_DOCK, w/2 - 152, h - 87, 304, 87);
   
   hint.draw(g);   
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

