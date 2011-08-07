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

// id, parent-id, name, depth, image,    
const LEVELS = [
{
   name : "Level 1", 
   
   taxa : [
      { id : 0, parent_id : null, name : "Eukaryotes", depth : 2, tag : "eukaryotes", trait : "complex cellular structure" },
      { id : 1, parent_id : 0, name : "Animals", depth : 1, tag : "animals", trait : null },
      { id : 2, parent_id : 0, name : "Plants", depth : 0, tag : "plant" },
      { id : 3, parent_id : 1, name : "Birds", depth : 0, tag : "bird" },
      { id : 4, parent_id : 1, name : "Lizards", depth : 0, tag : "lizard" }
   ]   
},

{
   name : "Level 2", 
   
   taxa : [
      { id : 0, parent_id : null, name : "Vertebrates", depth : 2, tag : "vertebrates", trait : "internal skeleton" },
      { id : 1, parent_id : 0, name : "Mammals", depth : 1, tag : "mammals", trait : "hair" },
      { id : 2, parent_id : 1, name : "Humans", depth : 0, tag : "human" },
      { id : 3, parent_id : 0, name : "Birds", depth : 0, tag : "bird" },
      { id : 4, parent_id : 1, name : "Bats", depth : 0, tag : "bat" }
   ]   
},

{
   name : "Level 3", 
   
   taxa : [
      { id : 0, parent_id : null, name : "Eukaryotes", depth : 2, tag : "eukaryotes", trait : "complex cellular structure" },
      { id : 1, parent_id : 0, name : "Animals and Fungi", depth : 1, tag : "a+f", trait : null },
      { id : 2, parent_id : 0, name : "Plants", depth : 0, tag : "plant" },
      { id : 3, parent_id : 1, name : "Fungi", depth : 0, tag : "fungus" },
      { id : 4, parent_id : 1, name : "Humans", depth : 0, tag : "human" }
   ]   
},

{
   name : "Level 4", 
   
   taxa : [
      { id : 0, parent_id : null, name : "Arthropods", depth : 2, tag : "arthropods", trait : "exoskeleton" },
      { id : 1, parent_id : 0, name : "Arachnids", depth : 1, tag : "arachnids", trait : "eight legs" },
      { id : 2, parent_id : 1, name : "Scorpions", depth : 0, tag : "scorpion" },
      { id : 3, parent_id : 1, name : "Spiders", depth : 0, tag : "spider" },
      { id : 4, parent_id : 0, name : "Insects", depth : 0, tag : "butterfly" }
   ]   
},

{
   name : "Level 5",
   
   taxa : [
      { id : 0, parent_id : null, name : "Animals", depth : 3, tag : "animals", trait : null },
      { id : 1, parent_id : 0, name : "Vertebrates", depth : 2, tag : "vertebrates", trait : "internal skeleton" },
      { id : 2, parent_id : 0, name : "Arthropods", depth : 1, tag : "arthropods", trait : "exoskeleton" },
      { id : 3, parent_id : 1, name : "Mammals", depth : 1, tag : "mammals", trait : "hair" },
      { id : 4, parent_id : 1, name : "Theropods", depth : 1, tag : "dinobirds", trait : "wishbone" },
      { id : 5, parent_id : 4, name : "Birds", depth : 0, tag : "bird" },
      { id : 6, parent_id : 4, name : "T. Rex", depth : 0, tag : "trex" },
      { id : 7, parent_id : 3, name : "Giraffes", depth : 0, tag : "giraffe" },
      { id : 8, parent_id : 3, name : "Bats", depth : 0, tag : "bat" },
      { id : 9, parent_id : 2, name : "Spiders", depth : 0, tag : "spider" },
      { id : 10, parent_id : 2, name : "Insects", depth : 0, tag : "butterfly" },
   ]
},

{
   name : "Level 6",
   
   taxa : [
      { id : 0, parent_id : null, name : "Animals", depth : 4, tag : "animals", trait : null },
      { id : 1, parent_id : 0, name : "Vertebrates", depth : 3, tag : "vertebrates", trait : "internal skeleton" },
      { id : 2, parent_id : 0, name : "Arthropods", depth : 1, tag : "arthropods", trait : "exoskeleton" },
      { id : 3, parent_id : 1, name : "Amniotes", depth : 2, tag : "amniotes", trait : "amniotic egg" },
      { id : 4, parent_id : 3, name : "Diapsids", depth : 1, tag : "diapsids", trait : "long lower arm bone" },
      { id : 5, parent_id : 1, name : "Frogs", depth : 0, tag : "frog", hint : "Frogs are a type of <i>amphibian</i>. Amphibians belong to a group of animals called vertebrates." },
      { id : 6, parent_id : 3, name : "Bats", depth : 0, tag : "bat", hint: "Bats are a type of mammal. Mammals belong to a group of animals called <i>diapsids</i> that also includes birds and lizards."  },
      { id : 7, parent_id : 4, name : "Birds", depth : 0, tag : "bird", hint : "Birds and lizards belong to a group of animals called <i>diapsids</i>. Crocodiles and dinosaurs are also diapsids." },
      { id : 8, parent_id : 4, name : "Lizards", depth : 0, tag : "lizard", hint : "Lizards and Birds belong to a group of animals called <i>diapsids</i>. Crocodiles and dinosaurs are also diapsids." },
      { id : 9, parent_id : 2, name : "Crabs", depth : 0, tag : "crab", hint : "Crabs and spiders both belong to a group of animals called <i>arthropods</i>. Arthropods are invertibrate animals with exoskeletons."  },
      { id : 10, parent_id : 2, name : "Spiders", depth : 0, tag : "spider", hint : "Spiders and crabs both belong to a group of animals called <i>arthropods</i>. Arthropods are invertibrate animals with exoskeletons."  }
   ]
},

{
   name : "Bonus Level 7",
   
   taxa : [
      { id : 0, parent_id : null, name : "Animals", depth : 5, tag : "animals", trait : null },
      { id : 1, parent_id : 0, name : "Vertebrates", depth : 4, tag : "vertebrates", trait : "internal skeleton" },
      { id : 2, parent_id : 0, name : "Arthropods", depth : 2, tag : "arthropods", trait : "exoskeleton" },
      { id : 3, parent_id : 2, name : "Arachnids", depth : 1, tag : "arachnids", trait : "eight legs" },
      { id : 4, parent_id : 1, name : "Amniotes", depth : 3, tag : "amniotes", trait : "amniotic egg" },
      { id : 5, parent_id : 4, name : "Mammals", depth : 1, tag : "mammals", trait : "hair" },
      { id : 6, parent_id : 4, name : "Diapsids", depth : 2, tag : "diapsids", trait : "long lower arm bone" },
      { id : 7, parent_id : 6, name : "Theropods", depth : 1, tag : "dinobirds", trait : "wishbone" },
      { id : 8, parent_id : 1, name : "Frogs", depth : 0, tag : "frog" },
      { id : 9, parent_id : 6, name : "Lizards", depth : 0, tag : "lizard" },
      { id : 10, parent_id : 7, name : "Birds", depth : 0, tag : "bird" },
      { id : 11, parent_id : 7, name : "T. Rex", depth : 0, tag : "trex" },
      { id : 12, parent_id : 5, name : "Giraffes", depth : 0, tag : "giraffe" },
      { id : 13, parent_id : 5, name : "Bats", depth : 0, tag : "bat" },
      { id : 14, parent_id : 2, name : "Crabs", depth : 0, tag : "crab" },
      { id : 15, parent_id : 3, name : "Spiders", depth : 0, tag : "spider" },
      { id : 16, parent_id : 3, name : "Scorpions", depth : 0, tag : "scorpion" },
   ]
}
];


//===================================================================
// Dialog control functions
//===================================================================

function hideDialog(name) {
   var d = document.getElementById(name);
   if (d) d.style.visibility = "hidden";
}

function hideAllDialogs() {
   hideDialog("dialog-help");
   hideDialog("dialog-dyk");
   hideDialog("dialog-dyk");
   hideDialog("dialog-solution");
   hideDialog("dialog-levels");
}

function showDialog(name, width) {
   hideAllDialogs();
   var d = document.getElementById(name);
   if (d) {
      d.style.left = window.innerWidth/2 - width/2 + "px";
      d.style.visibility = "visible";
   }
}

function showHelp() {
   showDialog("dialog-help", 464);
}

function hideHelp() {
   hideDialog("dialog-help");
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

function showDYK() {
   showDialog("dialog-dyk", 564);
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
   console.log(l);   
   for (var i=1; i<=LEVELS.length; i++) {
      var line = document.getElementById("levels-line-" + i);
      if (line) {
         var stars = line.getElementsByTagName("img");
         for (var j=0; j<stars.length; j++) {
            if (i <= l) {
               stars[j].src = "images/star.png";
            } else {
               stars[j].src = "images/star_blank.png";
            }
         }
         
         var a = line.getElementsByTagName("a");
         if (a && a.length > 0) {
            a[0].className = (i <= l+1) ? "enabled" : "disabled";
         }
      }
   }
}


//===================================================================
// Game Level Control Functions
//===================================================================

function getCurrentLevel() {
   var s = gup("level");
   if (s.length > 0) {
      return Math.floor(s) - 1;
   } else {
      return 0;
   }
}


function gotoLevel(level) {
   var l = getMaxLevel();
   if (level <= l + 1) {
      window.location = "game.html?level=" + level;
   }
   return false;
}


function nextLevel() {
   return gotoLevel(getCurrentLevel() + 2);
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