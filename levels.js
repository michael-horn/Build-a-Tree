
// id, parent-id, name, depth, image,    
const LEVELS = [
{
   name : "Level 1", 
   
   taxa : [
      { id : 0, parent_id : null, name : "Eukaryotes", depth : 2, image : null, trait : "complex cellular structure" },
      { id : 1, parent_id : 0, name : "Animals", depth : 1, image : null, trait : "animals" },
      { id : 2, parent_id : 0, name : "Plants", depth : 0, image : "plant" },
      { id : 3, parent_id : 1, name : "Birds", depth : 0, image : "bird" },
      { id : 4, parent_id : 1, name : "Lizards", depth : 0, image : "lizard" }
   ]   
},

{
   name : "Level 2", 
   
   taxa : [
      { id : 0, parent_id : null, name : "Vertebrates", depth : 2, image : null, trait : "animals with backbones" },
      { id : 1, parent_id : 0, name : "Mammals", depth : 1, image : null, trait : "mammals" },
      { id : 2, parent_id : 1, name : "Humans", depth : 0, image : "human" },
      { id : 3, parent_id : 0, name : "Birds", depth : 0, image : "bird" },
      { id : 4, parent_id : 1, name : "Bats", depth : 0, image : "bat" }
   ]   
},

{
   name : "Level 3", 
   
   taxa : [
      { id : 0, parent_id : null, name : "Eukaryotes", depth : 2, image : null, trait : "complex cellular structure" },
      { id : 1, parent_id : 0, name : "Animals and Fungi", depth : 1, image : null, trait : null },
      { id : 2, parent_id : 0, name : "Plants", depth : 0, image : "plant" },
      { id : 3, parent_id : 1, name : "Fungi", depth : 0, image : "fungus" },
      { id : 4, parent_id : 1, name : "Humans", depth : 0, image : "human" }
   ]   
},

{
   name : "Level 4", 
   
   taxa : [
      { id : 0, parent_id : null, name : "Arthropods", depth : 2, image : null, trait : "exoskeletons" },
      { id : 1, parent_id : 0, name : "Arachnids", depth : 1, image : null, trait : "eight legs" },
      { id : 2, parent_id : 1, name : "Scorpions", depth : 0, image : "scorpion" },
      { id : 3, parent_id : 1, name : "Spiders", depth : 0, image : "spider" },
      { id : 4, parent_id : 0, name : "Insects", depth : 0, image : "butterfly" }
   ]   
},

{
   name : "Level 5",
   
   taxa : [
      { id : 0, parent_id : null, name : "Animals", depth : 3, image : null, trait : "animals" },
      { id : 1, parent_id : 0, name : "Vertebrates", depth : 2, image : null, trait : "animals with backbones" },
      { id : 2, parent_id : 0, name : "Arthropods", depth : 1, image : null, trait : "exoskeletons" },
      { id : 3, parent_id : 1, name : "Mammals", depth : 1, image : null, trait : "mammals" },
      { id : 4, parent_id : 1, name : "Dinosaurs and Birds", depth : 1, image : null, trait : "wishbones" },
      { id : 5, parent_id : 4, name : "Birds", depth : 0, image : "bird" },
      { id : 6, parent_id : 4, name : "T. Rex", depth : 0, image : "trex" },
      { id : 7, parent_id : 3, name : "Giraffes", depth : 0, image : "giraffe" },
      { id : 8, parent_id : 3, name : "Bats", depth : 0, image : "bat" },
      { id : 9, parent_id : 2, name : "Spiders", depth : 0, image : "spider" },
      { id : 10, parent_id : 2, name : "Insects", depth : 0, image : "butterfly" },
   ]
},

{
   name : "Level 6",
   
   taxa : [
      { id : 0, parent_id : null, name : "Animals", depth : 4, image : null, trait : "animals" },
      { id : 1, parent_id : 0, name : "Vertebrates", depth : 3, image : null, trait : "animals with backbones" },
      { id : 2, parent_id : 0, name : "Arthropods", depth : 1, image : null, trait : "exoskeleton" },
      { id : 3, parent_id : 1, name : "Amniotes", depth : 2, image : null, trait : "amniotic egg" },
      { id : 4, parent_id : 3, name : "Diapsids", depth : 1, image : null, trait : "" },
      { id : 5, parent_id : 1, name : "Frogs", depth : 0, image : "frog", hint : "Frogs are a type of <i>amphibian</i>. Amphibians belong to a group of animals called vertebrates." },
      { id : 6, parent_id : 3, name : "Bats", depth : 0, image : "bat", hint: "Bats are a type of mammal. Mammals belong to a group of animals called <i>diapsids</i> that also includes birds and lizards."  },
      { id : 7, parent_id : 4, name : "Birds", depth : 0, image : "bird", hint : "Birds and lizards belong to a group of animals called <i>diapsids</i>. Crocodiles and dinosaurs are also diapsids." },
      { id : 8, parent_id : 4, name : "Lizards", depth : 0, image : "lizard", hint : "Lizards and Birds belong to a group of animals called <i>diapsids</i>. Crocodiles and dinosaurs are also diapsids." },
      { id : 9, parent_id : 2, name : "Crabs", depth : 0, image : "crab", hint : "Crabs and spiders both belong to a group of animals called <i>arthropods</i>. Arthropods are invertibrate animals with exoskeletons."  },
      { id : 10, parent_id : 2, name : "Spiders", depth : 0, image : "spider", hint : "Spiders and crabs both belong to a group of animals called <i>arthropods</i>. Arthropods are invertibrate animals with exoskeletons."  }
   ]
},

{
   name : "Level 7",
   
   taxa : [
      { id : 0, parent_id : null, name : "Animals", depth : 5, image : null, trait : "animals" },
      { id : 1, parent_id : 0, name : "Vertebrates", depth : 4, image : null, trait : "backbones" },
      { id : 2, parent_id : 0, name : "Arthropods", depth : 2, image : null, trait : "exoskeletons" },
      { id : 3, parent_id : 2, name : "Arachnids", depth : 1, image : null, trait : "eight legs" },
      { id : 4, parent_id : 1, name : "Amniotes", depth : 3, image : null, trait : "amniotic egg" },
      { id : 5, parent_id : 4, name : "Mammals", depth : 1, image : null, trait : "mammals" },
      { id : 6, parent_id : 4, name : "Diapsids", depth : 2, image : null, trait : "diapsids" },
      { id : 7, parent_id : 6, name : "Dinosaurs and Birds", depth : 1, image : null, trait : "wishbones" },
      { id : 8, parent_id : 1, name : "Frogs", depth : 0, image : "frog" },
      { id : 9, parent_id : 6, name : "Lizards", depth : 0, image : "lizard" },
      { id : 10, parent_id : 7, name : "Birds", depth : 0, image : "bird" },
      { id : 11, parent_id : 7, name : "T. Rex", depth : 0, image : "trex" },
      { id : 12, parent_id : 5, name : "Giraffes", depth : 0, image : "giraffe" },
      { id : 13, parent_id : 5, name : "Bats", depth : 0, image : "bat" },
      { id : 14, parent_id : 2, name : "Crabs", depth : 0, image : "crab" },
      { id : 15, parent_id : 3, name : "Spiders", depth : 0, image : "spider" },
      { id : 16, parent_id : 3, name : "Scorpions", depth : 0, image : "scorpion" },
   ]
}
];

function startLevel() {
   var l = getCurrentLevel() + 1;
   window.location = "game.html?level=" + l;
   return false;
}

function nextLevel() {
   var l = getCurrentLevel() + 2;
   window.location = "game.html?level=" + l;
   return false;
}

function prevLevel() {
   var l = Math.max(0, getCurrentLevel());
   window.location = "game.html?level=" + l;
   return false;
}

function showInstructions() {
   var l = getCurrentLevel();
   var level = LEVELS[l];
   var count = 1;
   
   // Fill in the correct level name
   var e = document.getElementById("level-name");
   if (e) {
      e.innerHTML = level.name;
   }
   
   // Show the back button?
   if (l > 0) {
      e = document.getElementById("back-button");
      if (e) {
         e.style.display = "inline";
      }
   }
   
   /*
   // Fix the start button link
   e = document.getElementById("start-button");
   if (e) {
      e.href = "game.html?level=" + (l + 1);
   }
   */
   
   for (var i=0; i<level.taxa.length; i++) {
      var t = level.taxa[i];
      if (t.image) {
         e = document.getElementById("instr-clade" + count);
         if (e) {
            e.innerHTML = t.name;
         }
         e = document.getElementById("img-clade" + count);
         if (e) {
            e.src = "images/" + t.image + ".png";
         }
         count++;
      }
   }
}

function showSolution() {
   var l = getCurrentLevel();
   var level = LEVELS[l];
   
   // Fill in the correct level name
   var e = document.getElementById("level-name");
   if (e) {
      e.innerHTML = level.name;
   }
   
   /*
   // Fix the next button link
   e = document.getElementById("next-button");
   if (e) {
      e.href = "instructions.html?level=" + (l + 2);
   }
   */
   
   // draw the solution tree
   var c = document.getElementById("science-tree");
   var g = c.getContext('2d');
   var w = c.width;
   var h = c.height;
   solution.drawSmallTree(g, 0, 0, w, h);
   
   c = document.getElementById("your-tree");
   g = c.getContext('2d');
   w = c.width;
   h = c.height;
   tree.drawSmallTree(g, 0, 0, w, h);

   
   // show the dialog
   var d = document.getElementById("dialog-solution");
   if (d) {
      w = canvas.width;
      d.style.left = w/2 - 400 + "px";
      d.style.visibility = "visible";
   }
}

function hideSolution() {
   var d = document.getElementById("dialog-solution");
   d.style.visibility = "hidden";
}


function getCurrentLevel() {
   var s = gup("level");
   if (s.length > 0) {
      return Math.floor(s) - 1;
   } else {
      return 0;
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