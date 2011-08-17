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
var solution_box;
var preview;
var hint;

var visuals = [];  // array of non-touchable visible objects to draw

var GREEN = "#33CC33";
var PURPLE = "#993399";
var ORANGE = "#FF6633";

var GREEN_DOCK = document.createElement("img");
var PURPLE_DOCK = document.createElement("img");
var ORANGE_DOCK = document.createElement("img");


function startup() {
   initLogDatabase();
   canvas = document.getElementById("world");
   context = canvas.getContext('2d');
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   
   window.onresize = resize;
   
   tree = new Tree();
   solution = new Tree();
   preview = null;
   hint = new Hint();
   
   GREEN_DOCK.src  = "images/green-dock.png";
   PURPLE_DOCK.src = "images/purple-dock.png";
   ORANGE_DOCK.src = "images/orange-dock.png";
   
   restart();

   setInterval(tick, 30);
   defineEventHandlers(canvas);
   resetMasterTimer();
}


function restart() {
   var w = canvas.width;
   var h = canvas.height;
   var level = LEVELS[getCurrentLevel()];
   
   log("start", level.name);
   hideSolution();
   
   tree.clear();
   solution.clear();
   preview = null;
   
   touchables = [];
   addTouchable(hint);
   
   var clade;
   var count = 0;

   for (var i=0; i<level.taxa.length; i++) {
      var t = level.taxa[i];

      // only add tips to the list of taxa
      if (t.tip) {
         clade = new Tip(t.id);
         clade.setTag(t.tag);
         clade.setImageSrc(t.tag);
         clade.setName(t.name);
         clade.setHintText(t.hint);
         moveToDock(clade, count++);
         tree.add(clade);
         addTouchable(clade);
      }
      
      // add everything to the solution tree
      if (t.tip) {
         clade = new Tip(t.id);
         clade.setImageSrc(t.tag);
      } else {
         clade = new Clade(t.id);
         clade.setTrait(t.trait);
      }
      clade.setTag(t.tag);
      clade.setName(t.name);
      solution.add(clade);
      var parent = solution.findTaxonByID(t.parent_id);
      if (parent) {
         parent.addChild(clade);
      }
   }

   solution.layoutSmallTree();
   solution_box = new SolutionBox(solution);
   addTouchable(solution_box);
   
   var lname = new AnimatedText();
   lname.setText(level.name);
   lname.useShadow(true);
   lname.setDelay(200);
   lname.setDuration(2000);
   lname.setCenter(w/2, h/2 - 40);
   lname.setFontSize(60);
   lname.setFontWeight("bold");
   lname.setTextColor(255, 255, 255);
   lname.startFadeIn();
   
   if (level.subtitle) {
      lname = new AnimatedText();
      lname.setText(level.subtitle);
      lname.useShadow(true);
      lname.setDelay(200);
      lname.setDuration(2000);
      lname.setCenter(w/2, h/2 + 10);
      lname.setFontSize("24");
      lname.setFontWeight("bold");
      lname.setTextColor(255, 255, 255);
      lname.startFadeIn();
   }
   
   if (level.help) {
      var help = new AnimatedText();
      help.setText(level.help);
      help.setDelay(2300);
      help.setDuration(20000);
      help.setCenter(w/2, h - 150);
      help.setFontSize(24);
      help.setTextColor(255, 255, 255);
      help.startFadeIn();
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
   clade.dock_index = index;
   
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
   for (var i=0; i<tree.getTaxaCount(); i++) {
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
   updateTokens();
   
   if (h && !hint.getHighlight()) {
      hint.hideHint();
   }
}


//--------------------------------------------------------------------
// This gets called from Node.touchDrag to show users a preview of
// what their tree will look like when they let go...
//--------------------------------------------------------------------
function buildPreviewTree() {
   preview = null;
   var overlap = tree.findOverlap();
   if (overlap) {
      
      // Create a clone of the master tree
      preview = tree.clone();
      
      // Construct the tree by adding the new overlap
      preview.constructTree(overlap);
   }
}


//--------------------------------------------------------------------
// This gets called from Node.touchUp to build the master tree
//--------------------------------------------------------------------
function buildTree() {
   preview = null;
   var overlap = tree.findOverlap();
   if (overlap) {
      var clade = tree.constructTree(overlap);
      if (clade) {
         log("connect", clade.getTreeString());
         addTouchable(clade);
         tree.validateTree(solution);
         if (clade.isCorrect()) {
            var scount = tree.getCorrectCount() - 1;
            setTimeout(function() {
               var star = new Star(clade.getCenterX(), clade.getCenterY() + 50);
               addVisual(star);
               star.animateTo(33 + 35 * scount, 67);
            }, 800);
         }
      }
   }
}


function draw() {
   var g = context;
   var w = canvas.width;
   var h = canvas.height;
   var r = 15;
   var level = LEVELS[getCurrentLevel()];
   
   g.clearRect(0, 0, w, h);
   
   // Draw background visuals
   for (var i=0; i<visuals.length; i++) {
      if (!visuals[i].isForeground()) {
         visuals[i].draw(g);
      }
   }
   
   // Current level
   g.font = "bold 20px Arial, sans-serif";
   g.textAlign = "right";
   g.textBaseline = "bottom";
   g.strokeStyle = "rgb(196, 72, 35)";
   g.fillStyle = "white"; //"#fc3";
   g.lineWidth = 2;
   g.beginPath();
   g.strokeText(level.name, w - 6, 30);
   g.fillText(level.name, w - 6, 30);
   
   // Docks
   g.drawImage(GREEN_DOCK, 0, h/2 - 152, 87, 304);
   g.drawImage(PURPLE_DOCK, w - 87, h/2 - 152, 87, 304);
   g.drawImage(ORANGE_DOCK, w/2 - 152, h - 87, 304, 87);
   
   // Draw stars
   var scount = tree.getTipCount() - 1;
   var ccount = tree.getCorrectCount();
   var sx = 16;
   var sy = 50;
   for (var i=0; i<scount; i++) {
      if (i < ccount) {
         g.drawImage(STAR, sx, sy, 33, 33);
      } else {
         g.drawImage(STAR_BLANK, sx, sy, 33, 33);
      }
      sx += 35;
   }

   hint.draw(g);
   if (preview != null) {
      preview.draw(g);
   } else {
      tree.draw(g);
   }
   
   // Draw foreground visuals
   for (var i=0; i<visuals.length; i++) {
      if (visuals[i].isForeground()) {
         visuals[i].draw(g);
      }
   }
   
   // Solution box
   solution_box.draw(g);

   
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


//===================================================================
// Dialog control functions
//===================================================================
function isDialogOpen(name) {
   var d = document.getElementById(name);
   if (d) {
      return d.style.visibility == "visible";
   } else {
      return false;
   }
}

function hideDialog(name) {
   var d = document.getElementById(name);
   if (d) d.style.visibility = "hidden";
}

function hideAllDialogs() {
   hideDialog("dialog-help1");
   hideDialog("dialog-help2");
   hideDialog("dialog-dyk");
   hideDialog("dialog-dyk");
   hideDialog("dialog-solution");
   hideDialog("dialog-levels");
   hideDialog("dialog-credits");
   hideDialog("dialog-instructions");
}

function showDialog(name, width) {
   hideAllDialogs();
   var d = document.getElementById(name);
   if (d) {
      d.style.left = window.innerWidth/2 - width/2 + "px";
      d.style.visibility = "visible";
   }
}

function showHelp(n) {
   showDialog("dialog-help" + n, 464);
}

function hideHelp() {
   hideDialog("dialog-help1");
   hideDialog("dialog-help2");
}

function toggleHelp() {
   if (isDialogOpen("dialog-help1") || isDialogOpen("dialog-help2")) {
      hideHelp();
   } else {
      showHelp(1);
   }
}

function showCredits() {
   showDialog("dialog-credits", 564);
}

function hideCredits() {
   hideDialog("dialog-credits");
}

function showInstructions() {
   showDialog("dialog-instructions", 464);
}

function hideInstructions() {
   hideDialog("dialog-instructions");
}

function showInstructions() {
   showDialog("dialog-instructions", 464);
}

function hideInstructions() {
   hideDialog("dialog-instructions");
}

function showDYK() {
   var level = LEVELS[getCurrentLevel()];
   var div = document.getElementById("dyk-text");
   if (div && level && level.dyk) {
      div.innerHTML = level.dyk;
      showDialog("dialog-dyk", 564);
   } else {
      nextLevel();
   }
}

function hideDYK() {
   hideDialog("dialog-dyk");
}

function showLevels() {
   adjustLevelStars();
   showDialog("dialog-levels", 364);
}

function hideLevels() {
   hideDialog("dialog-levels");
}

function toggleLevels() {
   if (isDialogOpen("dialog-levels")) {
      hideLevels();
   } else {
      showLevels();
   }
}

function showSolution() {
   setMaxLevel(getCurrentLevel() + 1);
   
   // draw the solution tree
   var c = document.getElementById("science-tree");
   var g = c.getContext('2d');
   g.fillStyle = "white";
   g.strokeStyle = "white";
   solution.drawSmallTree(g, 0, 0, c.width, c.height);
   
   // draw the players' tree
   c = document.getElementById("your-tree");
   g = c.getContext('2d');
   g.fillStyle = "white";
   g.strokeStyle = "white";
   tree.layoutSmallTree();
   tree.drawSmallTree(g, 0, 0, c.width, c.height);

   // show the dialog
   showDialog("dialog-solution", 624);
}

function hideSolution() {
   hideDialog("dialog-solution");
}

function adjustLevelStars() {
   var l = getMaxLevel();
   for (var i=0; i<LEVELS.length; i++) {
      var line = document.getElementById("levels-line-" + i);
      if (line) {
         var stars = line.getElementsByTagName("img");
         for (var j=0; j<stars.length; j++) {
            if (i < l) {
               stars[j].src = "images/star.png";
            } else {
               stars[j].src = "images/star_blank.png";
            }
         }
         
         var a = line.getElementsByTagName("a");
         if (a && a.length > 0) {
            a[0].className = (i <= l) ? "enabled" : "disabled";
         }
      }
   }
}

function showSolutionBox() {
   solution_box.openBox();
}

function toggleSolutionBox() {
   solution_box.toggleBox();
}


//===================================================================
// Game Level Control Functions
//===================================================================

function getCurrentLevel() {
   var s = gup("level");
   if (s.length > 0) {
      return Math.floor(s);
   } else {
      return 0;
   }
}


function gotoLevel(level) {
   if (level >= LEVELS.length) {
      window.location = "finish.html";
   }
   else if (level <= getMaxLevel()) {
      window.location = "game.html?level=" + level;
   }
   return false;
}


function nextLevel() {
   return gotoLevel(getCurrentLevel() + 1);
}


function getMaxLevel() {
   if (supportsSessionStorage()) {
      return Math.floor(sessionStorage.getItem("max-level"));
   } else {
      return getCurrentLevel();
   }
}


function setMaxLevel(l) {
   if (supportsSessionStorage()) {
      if (l > getMaxLevel()) {
         sessionStorage.setItem("max-level", l);
      }
   }
}


function resetMaxLevel() {
   if (supportsSessionStorage()) {
      sessionStorage.setItem("max-level", 0); 
   }
}


function gup(name)
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}