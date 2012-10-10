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
      name : "Corynorhinus townsendii", 
      cname : "Townsend's big-eared bat", 
      location : "United States",
      image : "images/hints/bat.jpg",
      author : "Photo: Wikipedia (public domain)",
      cright : "public domain",
      text : ("Did you know that there are over 1,200 species of bats in the world? " +
              "Bats are the only mammals capable of sustained flight. This picture " +
              "shows a Townsend's Big-Eared Bat. These bats live in the United " +
              "States, Canada, and Mexico. They eat moths, flies, and other small " +
              "insects. Bats, like humans, are placental mammals. They have hair, " +
              "give birth to live babies, and nurse their young.")
   },
   

   // http://www.flickr.com/photos/giuss95/5635428035/
   bird :
   {
      name : "Sterna hirundo", 
      cname : "Common Tern",
      location : "",
      image : "images/hints/bird.jpg",
      author : "Photo by: Luciano Giussani (flickr: giuss95). Some rights reserved.",
      cright : "cc-by-nc-sa",
      text : ""
   },
   
   // http://www.flickr.com/photos/markop/267659159/
   butterfly :
   {
      name : "Papillio machaon",
      cname : "Common Yellow Swallowtail",
      location : "Kriti, Greece",
      image : "images/hints/butterfly.jpg",
      author : "Photo by: Stavros Markopoulos (flickr: macropoulos). Some rights reserved.",
      cright : "cc-by-nc",
      text : ("Did you know that there are over 140,000 different species of butterflies " +
             "and moths in the world? This picture shows a Common Yellow Swallowtail " +
             "butterfly as a caterpillar. Butterflies are a type of arthropod. " +
             "Arthropods are invertebrate animals with external skeletons (exoskeletons) " +
             "and jointed limbs. Insects, spiders, scorpions, and crustaceans are all " +
             "different kinds of arthropods.")
   },
   
   // http://www.flickr.com/photos/thomas_schrei/3206000509/
   crab : 
   {
      name : "Callinectes bocourti",
      cname : "Blunt-tooth swimming crab",
      location : "Guatemala",
      image : "images/hints/crab.jpg",
      author : "Photo by: Thomas (Guatemala) (flickr). Some rights reserved.",
      cright : "cc-by-nc",
      text : ""
   },
   
   // http://www.flickr.com/photos/davidbygott/2784898252/
   frog : 
   {
      name : "Litoria caerulea",
      cname : "Australian Green Tree Frog",
      location : "Australia",
      image : "images/hints/frog.jpg",
      author : "Photo from Wikipedia by LiquidGhoul. Public domain.",
      cright : "public domain",
      text : ("Did you know that there are over 4,800 different species of frogs " +
              "and toads in the world? This picture shows an Australian green tree " +
              "frog. This frog secretes antibiotic and anti-viral fluids to help protect " +
              "its skin from infections. <br/>" +
              "Frogs and toads make up the largest group of amphibians. Amphibians " +
              "reproduce by laying eggs in water. This is one of the traits that make " +
              "amphibians different from amniotes (including mammals, reptiles, birds, " +
              "and turtles). Amniotes have eggs with protective membranes that first opened " +
              "the possibility for animals to reproduce on dry land.")
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
      name : "Giraffa camelopardalis",
      cname : "Giraffe",
      location : "Kenya",
      image : "images/hints/giraffe.jpg",
      author : "Photo by: kibuyu (flickr). Some rights reserved.",
      cright : "cc-by-nc-sa",
      text : ""
   },
   
   human :
   {
      name : "Homo sapiens",
      cname : "Human",
      location : "",
      image : "images/hints/human.jpg",
      author : "Jonathan Losos, Harvard University",
      cright : "cc-blank",
      text : ""
   },
   
   // http://www.flickr.com/photos/e_monk/4815901200/
   lizard :
   {
      name : "Anolis carolinensis",
      cname : "Green Anole",
      location : "North Carolina, USA",
      image : "images/hints/lizard.jpg",
      author : "Photo by: e_monk (flickr). Some rights reserved.",
      cright : "cc-by-nc-sa",
      text : ""
   },
   
   // http://www.flickr.com/photos/52421717@N00/4719233894/
   plant :
   {
      
      name : "Asclepias Tuberosa", 
      cname : "Butterfly Milkweed",
      location : "Wisconsin, USA",
      image : "images/hints/plant.jpg",
      author : "Photo by: Peter Gorman (flickr: pchgorman). Some rights reserved.",
      cright : "cc-by-nc-sa",
      text : "Green plants are multicellular organisms that use photosynthesis to turn sunlight into energy. Scientists think that green algae may have appeared on land over 1 billion years ago. Since that time plants have diversified into over 300,000 different species. Plants and animals diverged (evolved into two different forms of life) around 1,400 million years ago."
   },
   
   // http://en.wikipedia.org/wiki/File:Asian_forest_scorpion_in_Khao_Yai_National_Park.JPG
   scorpion :
   {
      name : "Heterometrus laoticus",
      cname : "Asian forest scorpion",
      location : "Thailand",
      image : "images/hints/scorpion.jpg",
      author : "Photo by: Chris Huh. Some rights reserved.",
      cright : "cc-by-sa",
      text : ("Did you know that scorpions have eight legs? They belong to a class " +
              "of animals called arachnids that also includes spiders and ticks. " +
              "Unlike insects, arachnids have no antennae and no wings. They do, " +
              "however, have two additional pairs appendages.<br />" +
              "Scorpions are a type of arthropod. Arthropods are invertebrate animals " +
              "with external skeletons (exoskeletons) and jointed limbs. Insects, " +
              "spiders, scorpions, and crustaceans are all different kinds of arthropods.")
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
      name : "Phidippus mystaceus",
      cname : "Jumping Spider",
      location : "Oklahoma, USA",
      image : "images/hints/spider.jpg",
      author : "Photo by: Thomas Shahan. Some rights reserved.",
      cright : "cc-by",
      text : ("Did you know that there are over 40,000 different species of spiders in the world? <br/>" +
              "This picture shows a type of jumping spider. It has eight eyes and excellent vision. " +
              "Rather than catching food in a web, this spider stalks its prey and pounces on it. " + 
              "Spiders are a type of arthropod. Arthropods are invertebrate animals with external " +
              "skeletons (exoskeletons) and jointed limbs. Insects, spiders, scorpions, and crustaceans " +
              "are all different kinds of arthropods.")
   },
   
   trex :
   {
      name : "T. rex",
      cname : "Tyrannosaurus Rex",
      location : "Carnegie Museum of Natural History, Pittsburgh",
      image : "images/hints/trex.jpg",
      author : "Photo by: Scott Robert Anselmo. Some rights reserved.",
      cright : "cc-by-sa", 
      text : ""
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
            d.innerHTML = h.author;
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