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

/*
 * Southern white-faced owl
 * http://www.flickr.com/photos/33590535@N06/3370680802/sizes/l/in/photostream/
 *
 * Papustyla hindei (snail)
 * http://www.flickr.com/photos/30197742@N07/2829629298/sizes/l/in/photostream/
 *
 */

var HINTS = {
   
   // Source: Wikimedia
   bat :
   {
      name : "Bats: Mammal or Bird?",
      cname : "Townsend's big-eared bat", 
      location : "United States",
      image : "images/hints/bat.jpg",
      author : "Photo: Wikipedia (public domain)",
      cright : "public domain",
      text : "Even though they can fly, bats are mammals not birds. They have hair, give birth to live babies, and nurse their young."
   },
   

   // http://www.flickr.com/photos/giuss95/5635428035/
   bird :
   {
      name : "Birds", 
      cname : "Common Tern",
      location : "",
      image : "images/hints/bird.jpg",
      author : "Photo by: Luciano Giussani (flickr: giuss95). Some rights reserved.",
      cright : "cc-by-nc-sa",
      text : "Birds are dinosaurs that have evolved feathers and the ability to fly. Some birds later became flightless, but most modern birds use their feathers for flight."
   },
   
   // http://www.flickr.com/photos/markop/267659159/
   butterfly :
   {
      name : "Butterflies",
      cname : "Common Yellow Swallowtail",
      location : "Kriti, Greece",
      image : "images/hints/butterfly.jpg",
      author : "Photo by: Stavros Markopoulos (flickr: macropoulos). Some rights reserved.",
      cright : "cc-by-nc",
      text : "Butterflies are arthropods. Like all other arthropods they have a hard structure called an exoskeleton that protects and supports their bodies. Unlike spiders and scorpions, butterflies are insects."
   },
   
   // http://www.flickr.com/photos/thomas_schrei/3206000509/
   crab : 
   {
      name : "What are Crabs?",
      cname : "Blunt-tooth swimming crab",
      location : "Guatemala",
      image : "images/hints/crab.jpg",
      author : "Photo by: Thomas (Guatemala) (flickr). Some rights reserved.",
      cright : "cc-by-nc",
      text : "Crabs are arthropods. Like insects, spiders, and scorpions, they have have a hard structure called an exoskeleton that protects and supports their bodies."
   },
   
   // http://www.flickr.com/photos/davidbygott/2784898252/
   frog : 
   {
      name : "Frogs",
      cname : "Australian Green Tree Frog",
      location : "Australia",
      image : "images/hints/frog.jpg",
      author : "Photo from Wikipedia by LiquidGhoul. Public domain.",
      cright : "public domain",
      text : "Baby frogs hatch in water and breathe with gills. As adults, they breathe air and move onto the land. Unlike reptiles and mammals, frog eggs lack an amniotic sac. This ties them to water for reproduction."
   },
   
   // http://www.flickr.com/photos/ressaure/5471096350/
   fungus :
   {
      name : "Cortinarius hemitrichus",
      cname : "Mushroom",
      location : "Russia",
      image : "images/hints/fungus.jpg",
      author : "Photo by: Tatiana Bulyonkova (flickr: ressaure). Some rights reserved.",
      cright : "cc-by-nc-sa",
      text : ""
   },
   
   // http://www.flickr.com/photos/davidbygott/4036635643/
   giraffe :
   {
      name : "Giraffes",
      cname : "Giraffe",
      location : "Kenya",
      image : "images/hints/giraffe.jpg",
      author : "Photo by: kibuyu (flickr). Some rights reserved.",
      cright : "cc-by-nc-sa",
      text : "Giraffes are mammals. All mammals feed their young through mammary glands. They also have hair, an adaptation for warmth and skin protection."
   },
   
   human :
   {
      name : "Humans",
      cname : "Human",
      location : "",
      image : "images/hints/human.jpg",
      author : "Jonathan Losos, Harvard University",
      cright : "cc-blank",
      text : "Did you know humans are related to all other life on earth? Humans are mammals like giraffes and bats. All mammals feed their young through mammary. glands They also have hair, an adaptation for warmth and skin protection."
   },
   
   // http://www.flickr.com/photos/e_monk/4815901200/
   lizard :
   {
      name : "Lizards",
      cname : "Green Anole",
      location : "North Carolina, USA",
      image : "images/hints/lizard.jpg",
      author : "Photo by: e_monk (flickr). Some rights reserved.",
      cright : "cc-by-nc-sa",
      text : "Lizards are reptiles. They have scales covering their bodies. Lizards have holes on each side of the skull like birds and dinosaurs."
   },
   
   // http://www.flickr.com/photos/52421717@N00/4719233894/
   plant :
   {
      
      name : "Green Plants", 
      cname : "Butterfly Milkweed",
      location : "Wisconsin, USA",
      image : "images/hints/plant.jpg",
      author : "Photo by: Peter Gorman (flickr: pchgorman). Some rights reserved.",
      cright : "cc-by-nc-sa",
      text : "Green plants turn sunlight into energy through the process of photosynthesis. Plants and animals shared an ancestor many, many millions of years ago."
   },
   
   // http://en.wikipedia.org/wiki/File:Asian_forest_scorpion_in_Khao_Yai_National_Park.JPG
   scorpion :
   {
      name : "What are Scorpions?",
      cname : "Asian forest scorpion",
      location : "Thailand",
      image : "images/hints/scorpion.jpg",
      author : "Photo by: Chris Huh. Some rights reserved.",
      cright : "cc-by-sa",
      text: "Scorpions are arthropods. Like all other arthropods they have a hard structure called an exoskeleton that protects and supports their bodies. Scorpions also have eight legs like spiders.",
   },
   
   shark :
   {
      name : "Carcharhinus amblyrhynchos",
      cname : "Grey reef shark",
      location : "",
      image : "images/hints/shark.jpg",
      author : "Photo by: Fbattail (Wikimedia Commons). Some rights reserved.",
      cright : "cc-by-sa",
      text : ""
   },
   
   // http://www.flickr.com/photos/opoterser/5108328833/
   spider :
   {
      name : "What are Spiders?",
      cname : "Jumping Spider",
      location : "Oklahoma, USA",
      image : "images/hints/spider.jpg",
      author : "Photo by: Thomas Shahan. Some rights reserved.",
      cright : "cc-by",
      text : "What makes a spider a spider? Spiders have eight jointed legs and a hard structure called an exoskeleton that protects and supports their bodies. Spiders are not insects, but they are related to other arthropods like insects, scorpions, and crabs."
   },
   
   trex :
   {
      name : "T. rex: Bird or lizard?",
      cname : "Tyrannosaurus Rex",
      location : "Carnegie Museum of Natural History, Pittsburgh",
      image : "images/hints/trex.jpg",
      author : "Photo by: Scott Robert Anselmo. Some rights reserved.",
      cright : "cc-by-sa", 
      text : "Tyrannosaurus rex is more closely related to birds than to lizards. Birds and tyrannosaurs both have a wishbone and walk on two legs."
   }
}


function Hint() {
   
   this.highlight = false;
   this.image = document.createElement("img");
   this.image.src = "images/hint.png";
   this.down = false;
   this.current = null;

   this.getCenterX = function() {
      return canvas.width - 45;
   }
   
   this.getCenterY = function() {
      return canvas.height - 45;
   }

   this.setHighlight = function(h) {
      this.highlight = h;
   }
   
   this.getHighlight = function() {
      return this.highlight;
   }
   
   this.draw = function(g) {
      var cx = this.getCenterX();
      var cy = this.getCenterY();
      g.drawImage(this.image, cx - 45, cy - 45);
      if (this.highlight || this.down) {
         g.fillStyle = Theme.TRANS_DARK;
         g.beginPath();
         g.arc(cx, cy, 40, 0, Math.PI * 2, true);
         g.fill();
      }
      if (this.down) {
         g.fillStyle = Theme.FOREGROUND;
         g.font = "12pt Tahoma, Arial, sans-serif";
         g.textAlign = "right";
         g.textBaseline = "middle";
         g.fillText("Drag Circle Here", cx - 50, cy - 20);
         g.strokeStyle = Theme.FOREGROUND;
         g.lineWidth = 3;
         g.beginPath();
         g.moveTo(cx - 80, cy);
         g.lineTo(cx - 50, cy);
         g.moveTo(cx - 50, cy);
         g.lineTo(cx - 54, cy - 3);
         g.lineTo(cx - 54, cy + 3);
         g.closePath();
         g.stroke();
      }
   }
   
   this.intersects = function(taxon) {
      var hx = this.getCenterX();
      var hy = this.getCenterY();
      var x = taxon.getCenterX();
      var y = taxon.getCenterY();
      var r = taxon.getWidth() / 2;
      var hr = 80;
      var dx = Math.abs(x - hx);
      var dy = Math.abs(y - hy);
      return ((dx * dx + dy * dy) <= (hr * hr));
   }

   this.hideHint = function() {
      this.current = null;
      hideDialog("dialog-hint");
      var d = document.getElementById("hint-image");
      if (d) {
         d.onload = function() { };
         d.src = "images/hints/snail.jpg";
      }
   }
   
   this.showHint = function(taxon) {
      if (taxon && this.current != taxon && taxon.getTag()) {
         this.current = taxon;
         var h = HINTS[taxon.getTag()];
         var d = document.getElementById("hint-image");
         if (d) {
            d.onload = function() {
               var d = document.getElementById("dialog-hint");
               if (d) d.style.visibility = "visible";
               taxon.move(-80, -80);
            };
            d.src = h.image;
         }
         d = document.getElementById("hint-author");
         if (d) {
            d.innerHTML = h.author;
         }
         d = document.getElementById("hint-title");
         if (d) {
            d.innerHTML = h.name;
         }
         d = document.getElementById("hint-text");
         if (d) {
            d.innerHTML = h.text;
         }
      }
   }
   
   this.getTraits = function(taxon) {
      var t = solution.findTaxonByID(taxon.getID());
      var list = [];
      t = t.getParent();
      while (t != null) {
         if (t.hasTrait()) {
            list.push(t.getTrait());
         }
         t = t.getParent();
      }
      return list;
   }
   
   
//----------------------------------------------------------------------
// TOUCH FUNCTIONS
//----------------------------------------------------------------------
   this.containsTouch = function(tp) {
      var x = this.getCenterX() - 40;
      var y = this.getCenterY() - 40;
      var w = 80;
      return (tp.x >= x && tp.y >= y && tp.x <= x + w && tp.y <= y + w);
   }
   this.touchDown = function(tp) { this.down = true; }
   this.touchDrag = function(tp) { }
   this.touchUp = function() { this.down = false; }
}