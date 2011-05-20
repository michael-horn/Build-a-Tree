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
      name : "Grumpus arrapus",
      cname : "Short Nosed Fruit Bat",
      location : "Singapore",
      image : "images/hints/bat.jpg",
      author : "Steven McGee (flickr: batty5)",
      cright : "Creative Commons: Some rights reserved",
      text : "Bats are a type of mammal."
   },
   

   // http://www.flickr.com/photos/giuss95/5635428035/
   bird :
   {
      name : "commonus ternus",
      cname : "Common Tern",
      location : "San Francisco, California",
      image : "images/hints/bird.jpg",
      author : "Steven McGee (flickr: batty5)",
      cright : "Creative Commons: Some rights reserved",
      text : "Bats are a type of mammal."
   },
   
   // http://www.flickr.com/photos/markop/267659159/
   butterfly :
   {
      name : "Abecd d",
      cname : "Common Yellow Swallowtail (butterfly)",
      location : "San Francisco, California",
      image : "images/hints/butterfly.jpg",
      author : "Steven McGee (flickr: batty5)",
      cright : "Creative Commons: Some rights reserved",
      text : "Bats are a type of mammal."
   },
   
   // http://www.flickr.com/photos/thomas_schrei/3206000509/
   crab : 
   {
      name : "Callinectes bocourti",
      cname : "Crab",
      location : "San Francisco, California",
      image : "images/hints/crab.jpg",
      author : "Steven McGee (flickr: batty5)",
      cright : "Creative Commons: Some rights reserved",
      text : "Bats are a type of mammal."
   },
   
   // http://www.flickr.com/photos/davidbygott/2784898252/
   frog : 
   {
      name : " ",
      cname : "Red Eyed Tree Frog",
      location : "San Francisco, California",
      image : "images/hints/frog.jpg",
      author : "Steven McGee (flickr: batty5)",
      cright : "Creative Commons: Some rights reserved",
      text : "Bats are a type of mammal."
   },
   
   // http://www.flickr.com/photos/ressaure/5471096350/
   fungus :
   {
      name : "Cortinarius hemitrichus",
      cname : "Mushroom",
      location : "San Francisco, California",
      image : "images/hints/fungus.jpg",
      author : "Steven McGee (flickr: batty5)",
      cright : "Creative Commons: Some rights reserved",
      text : "Bats are a type of mammal."
   },
   
   // http://www.flickr.com/photos/davidbygott/4036635643/
   giraffe :
   {
      name : " ",
      cname : "Giraffe",
      location : "San Francisco, California",
      image : "images/hints/giraffe.jpg",
      author : "Steven McGee (flickr: batty5)",
      cright : "Creative Commons: Some rights reserved",
      text : "Bats are a type of mammal."
   },
   
   human :
   {
      name : "Homo sapien",
      cname : "Human (Jonathan Losos)",
      location : "San Francisco, California",
      image : "images/hints/human.jpg",
      author : "Steven McGee (flickr: batty5)",
      cright : "Creative Commons: Some rights reserved",
      text : "Bats are a type of mammal."
   },
   
   // http://www.flickr.com/photos/e_monk/4815901200/
   lizard :
   {
      name : "Anolis carolinus",
      cname : "Green Anole",
      location : "San Francisco, California",
      image : "images/hints/lizard.jpg",
      author : "Steven McGee (flickr: batty5)",
      cright : "Creative Commons: Some rights reserved",
      text : "Bats are a type of mammal."
   },
   
   // http://www.flickr.com/photos/52421717@N00/4719233894/
   plant :
   {
      name : "Lepodoptera",
      cname : "Butterfly Milkweed",
      location : "San Francisco, California",
      image : "images/hints/plant.jpg",
      author : "Steven McGee (flickr: batty5)",
      cright : "Creative Commons: Some rights reserved",
      text : "Bats are a type of mammal."
   },
   
   // http://www.flickr.com/photos/furryscalyman/356870862
   scorpion :
   {
      name : "scorpioni",
      cname : "Deathstalker Scorpion",
      location : "San Francisco, California",
      image : "images/hints/scorpion.jpg",
      author : "Steven McGee (flickr: batty5)",
      cright : "Creative Commons: Some rights reserved",
      text : "Bats are a type of mammal."
   },
   
   shark :
   {
      name : "Sharkus lineaus",
      cname : "Hammerhead Shark",
      location : "San Francisco, California",
      image : "images/hints/shark.jpg",
      author : "Steven McGee (flickr: batty5)",
      cright : "Creative Commons: Some rights reserved",
      text : "Bats are a type of mammal."
   },
   
   // http://www.flickr.com/photos/opoterser/5108328833/
   spider :
   {
      name : "Phidippus mystaceus",
      cname : "Jumping Spider",
      location : "San Francisco, California",
      image : "images/hints/spider.jpg",
      author : "Steven McGee (flickr: batty5)",
      cright : "Creative Commons: Some rights reserved",
      text : "Bats are a type of mammal."
   },
   
   trex :
   {
      name : "",
      cname : "Tyranosaurus Rex",
      location : "Field Museum of Natural History, Chicago, Illinois",
      image : "images/hints/trex.jpg",
      author : "Steven McGee (flickr: batty5)",
      cright : "Creative Commons: Some rights reserved",
      text : "Bats are a type of mammal."
   }
}


function Hint() {
   
   this.highlight = false;
   this.image = document.createElement("img");
   this.image.src = "images/hint.png";
   this.down = false;

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
         g.fillStyle = "rgba(255, 255, 255, 0.3)";
         g.beginPath();
         g.arc(cx, cy, 40, 0, Math.PI * 2, true);
         g.fill();
      }
      if (this.down) {
         g.fillStyle = "white";
         g.font = "12pt Tahoma, Arial, sans-serif";
         g.textAlign = "right";
         g.textBaseline = "middle";
         g.fillText("Drag Circle Here", cx - 50, cy - 20);
         g.strokeStyle = "white";
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
      var d = document.getElementById("dialog-hint");
      d.style.visibility = "hidden";
   }
   
   this.showHint = function(taxon) {
      if (taxon && taxon.getTag()) {
         var h = HINTS[taxon.getTag()];

         var name = document.getElementById("hint-name");
         var cname = document.getElementById("hint-cname");
         var location = document.getElementById("hint-location");
         var author = document.getElementById("hint-author");
         var img = document.getElementById("hint-image");
         var text = document.getElementById("hint-text");
         var cright = document.getElementById("hint-cright");
         
         if (name) name.innerHTML = h.name;
         if (cname) cname.innerHTML = h.cname;
         if (location) location.innerHTML = h.location;
         if (author) author.innerHTML = h.author;
         if (text) text.innerHTML = h.text;
         if (cright) cright.innerHTML = h.cright;
         if (img) img.src = h.image;

         var d = document.getElementById("dialog-hint");
         if (d) {
            var w = canvas.width;
            d.style.left = w/2 - 330 + "px";
            //d.style.marginLeft = Math.round(w/2);
            d.style.visibility = "visible";
         }
      }
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