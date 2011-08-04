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
var TOKEN_IDS = {
   0x4B : "bat",
   0x0A : "bird",
   0x5B : "butterfly",
   0x3A : "crab",
   0x5A : "frog",
   0x4A : "fungus",
   0x8A : "giraffe",
   0x1B : "human",
   0x7A : "lizard",
   0x3B : "plant",
   0x2B : "scorpion",
   0x6A : "shark",
   0x2A : "spider",
   0x1A : "trex"
};


// List of tips to detach from tokens
var dlist = [];

function updateTokens() {
   frame = pframe;
   if (!frame) return;
   
   var build = false;
   var tokens = [];

   for (var i=0; i<frame.touches.length; i++) {
      var t = frame.touches[i];
      
      if (t.tag >= 0) {
         var tip = tree.findTaxonByTag(TOKEN_IDS[t.tag]);
         if (tip) {
            tokens[tip.getTag()] = t;
            dlist[tip.getTag()] = null;
            tip.setToken(true);
            tip.setDocked(false);
            tip.setCenter(t.pageX, t.pageY);
            build = true;
         }
      }
   }
   if (build) buildTree();
         
   // clear token data from tips
   for (var i=0; i<tree.tips.length; i++) {
      var tip = tree.tips[i];
      var tag = tip.getTag();
      
      if (tip.hasToken()) {
         if (!tokens[tag]) {
            if (!dlist[tag]) {
               dlist[tag] = { age : 0, tip : tip };
            } else {
               dlist[tag].age++;
               
               // detach the old bindings
               if (dlist[tag].age > 20) {
                  tip.setToken(false);
                  if (tip.hasParent()) {
                     tree.breakTree(tip);
                  }
                  tip.velocity.vx = 0;
                  tip.velocity.vy = 0;
                  moveToDock(tip, tip.dock_index);
               }
            }
         }
      }
   }
}
