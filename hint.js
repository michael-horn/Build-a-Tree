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
   
   // http://www.flickr.com/photos/wildsingapore/5093331528/sizes/o/in/photostream/
   bat :
   {
      name : "Cynopterus brachyotis",
      cname : "Short Nosed Fruit Bat",
      location : "Singapore",
      image : "images/hints/bat.jpg",
      author : "Ria Tan",
      cright : "cc-by-nc-sa",
      text : "Bats are a type of mammal."
   },
   

   // http://www.flickr.com/photos/giuss95/5635428035/
   bird :
   {
      name : "Sterna hirundo", 
      cname : "Common Tern",
      location : "",
      image : "images/hints/bird.jpg",
      author : "Luciano Giussani (flickr: giuss95)",
      cright : "cc-by-nc-sa",
      text : "Bats are a type of mammal."
   },
   
   // http://www.flickr.com/photos/markop/267659159/
   butterfly :
   {
      name : "Papillio machaon",
      cname : "Common Yellow Swallowtail",
      location : "Kriti, Greece",
      image : "images/hints/butterfly.jpg",
      author : "Stavros Markopoulos (flickr: macropoulos)",
      cright : "cc-by-nc",
      text : "Bats are a type of mammal."
   },
   
   // http://www.flickr.com/photos/thomas_schrei/3206000509/
   crab : 
   {
      name : "Callinectes bocourti",
      cname : "Blunt-tooth swimming crab",
      location : "Guatemala",
      image : "images/hints/crab.jpg",
      author : "Thomas (Guatemala) (flickr)",
      cright : "cc-by-nc",
      text : "Bats are a type of mammal."
   },
   
   // http://www.flickr.com/photos/davidbygott/2784898252/
   frog : 
   {
      name : "Agalychnis callidryas",
      cname : "Red Eyed Tree Frog",
      location : "Costa Rica",
      image : "images/hints/frog.jpg",
      author : "kibuyu (flickr)",
      cright : "cc-by-nc-sa",
      text : "Bats are a type of mammal."
   },
   
   // http://www.flickr.com/photos/ressaure/5471096350/
   fungus :
   {
      name : "Cortinarius hemitrichus",
      cname : "Mushroom",
      location : "Russia",
      image : "images/hints/fungus.jpg",
      author : "Tatiana Bulyonkova (flickr: ressaure)",
      cright : "cc-by-nc-sa",
      text : "Bats are a type of mammal."
   },
   
   // http://www.flickr.com/photos/davidbygott/4036635643/
   giraffe :
   {
      name : "Giraffa camelopardalis",
      cname : "Giraffe",
      location : "Kenya",
      image : "images/hints/giraffe.jpg",
      author : "kibuyu (flickr)",
      cright : "cc-by-nc-sa",
      text : "Bats are a type of mammal."
   },
   
   human :
   {
      name : "Homo sapiens",
      cname : "Human",
      location : "",
      image : "images/hints/human.jpg",
      author : "",
      cright : "cc-blank",
      text : "Bats are a type of mammal."
   },
   
   // http://www.flickr.com/photos/e_monk/4815901200/
   lizard :
   {
      name : "Anolis carolinensis",
      cname : "Green Anole",
      location : "North Carolina, USA",
      image : "images/hints/lizard.jpg",
      author : "e_monk (flickr)",
      cright : "cc-by-nc-sa",
      text : "Bats are a type of mammal."
   },
   
   // http://www.flickr.com/photos/52421717@N00/4719233894/
   plant :
   {
      
      name : "Asclepias Tuberosa", 
      cname : "Butterfly Milkweed",
      location : "Wisconsin, USA",
      image : "images/hints/plant.jpg",
      author : "Peter Gorman (flickr: pchgorman)",
      cright : "cc-by-nc-sa",
      text : "Bats are a type of mammal."
   },
   
   // http://www.flickr.com/photos/furryscalyman/356870862
   scorpion :
   {
      name : "Leiurus quinquestriatus",
      cname : "Deathstalker Scorpion",
      location : "Maryland, USA",
      image : "images/hints/scorpion.jpg",
      author : "Matt Reinbold (flickr: Furryscaly)",
      cright : "cc-by-sa",
      text : "Bats are a type of mammal."
   },
   
   shark :
   {
      name : "Carcharhinus amblyrhynchos",
      cname : "Grey reef shark",
      location : "",
      image : "images/hints/shark.jpg",
      author : "Fbattail (Wikimedia Commons)",
      cright : "cc-by-sa",
      text : "Bats are a type of mammal."
   },
   
   // http://www.flickr.com/photos/opoterser/5108328833/
   spider :
   {
      name : "Phidippus mystaceus",
      cname : "Jumping Spider",
      location : "Oklahoma, USA",
      image : "images/hints/spider.jpg",
      author : "Thomas Shahan",
      cright : "cc-by",
      text : "Bats are a type of mammal."
   },
   
   trex :
   {
      name : "T. rex",
      cname : "Tyrannosaurus Rex",
      location : "Carnegie Museum of Natural History, Pittsburgh",
      image : "images/hints/trex.jpg",
      author : "Scott Robert Anselmo",
      cright : "cc-by-sa", 
      text : "Bats are a type of mammal."
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
      hideDialog("dialog-hint");
      this.current = null;
      log("hide", "Hint");
   }
   
   this.showHint = function(taxon) {
      if (taxon && this.current != taxon && taxon.getTag()) {
         this.current = taxon;
         var h = HINTS[taxon.getTag()];
         var d = document.getElementById("hint-image");
         if (d) {
            d.src = h.image;
         }
         d = document.getElementById("hint-author");
         if (d) {
            d.innerHTML = "Photo by: " + h.author + ". Some rights reserved.";
         }
         d = document.getElementById("hint-title");
         if (d) {
            d.innerHTML = h.name + " (" + h.cname + ")";
         }
         d = document.getElementById("hint-text");
         if (d) {
            d.innerHTML = h.text;
         }
         showDialog("dialog-hint", 1000);
         log("show", "Hint " + taxon.getTreeString());  
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