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
   
   subtitle : "Plants and Animals",
   
   taxa : [
      { id : 0, parent_id : null, name : "Eukaryotes", tag : "eukaryotes", trait : "cells with organelles" },
      { id : 1, parent_id : 0, name : "Animals", tag : "animals", trait : "digestive cavity" },
      { id : 2, parent_id : 0, name : "Plants", tag : "plant", tip : true },
      { id : 3, parent_id : 1, name : "Birds", tag : "bird", tip : true },
      { id : 4, parent_id : 1, name : "Lizards", tag : "lizard", tip : true }
   ],
   
   dyk : ("<p>Plants and animals are both eukaryotes (<i>you-KARR-ee-ohts</i>). " +
          "That means that they are complex multicellular organism. " +
          "Plants and animals diverged (evolved into two different forms of life) " +
          "around 1,400 million years ago. Birds and lizards diverged much more " +
          "recently&#151;around 277 million years ago.</p>"),
   
   fhelp : { src : "tip1", align : "left" }
},

{
   name : "Level 2", 
   
   subtitle : "Bats, Birds, and People",
   
   taxa : [
      { id : 0, parent_id : null, name : "Vertebrates", tag : "vertebrates", trait : "internal skeleton" },
      { id : 1, parent_id : 0, name : "Mammals", tag : "mammals", trait : "hair" },
      { id : 2, parent_id : 1, name : "Humans", tip : true, tag : "human" },
      { id : 3, parent_id : 0, name : "Birds", tip : true, tag : "bird" },
      { id : 4, parent_id : 1, name : "Bats", tip : true, tag : "bat" }
   ],
   
   dyk : ("<p>Bats, like humans, are placental mammals. Bats have hair, give " +
          "birth to live babies, and nurse their young. Even though bats " +
          "and birds look similar in many ways, bats are more closely related " +
          "to humans because they share a more recent ancestor in common.</p>"),
   
   fhelp : { src : "tip2", align : "center" }
},

{
   name : "Level 3", 
   
   taxa : [
      { id : 0, parent_id : null, name : "Eukaryotes", tag : "eukaryotes", trait : "cells with organelles" },
      { id : 1, parent_id : 0, name : "Animals and Fungi", tag : "a+f", trait : "cells with chitin" },
      { id : 2, parent_id : 0, name : "Plants", tip : true, tag : "plant" },
      { id : 3, parent_id : 1, name : "Fungi", tip : true, tag : "fungus" },
      { id : 4, parent_id : 1, name : "Humans", tip : true, tag : "human" }
   ],
   
   dyk : ("<p>Scientists think that fungi (including mushrooms) are more closely " +
          "related to animals than they are to plants. This means that fungi and " +
          "animals have a more recent ancestor in common than fungi and plants. " +
          "One suprising piece of evidence to support this hypothesis is that both " +
          "fungi and animals are capable of generating proteins that can sense light.</p>"),
   
   fhelp : { src : "tip3", align : "center" }
},

{
   name : "Level 4", 
   
   taxa : [
      { id : 0, parent_id : null, name : "Arthropods", tag : "arthropods", trait : "exoskeleton" },
      { id : 1, parent_id : 0, name : "Arachnids", tag : "arachnids", trait : "eight legs" },
      { id : 2, parent_id : 1, name : "Scorpions", tip : true, tag : "scorpion" },
      { id : 3, parent_id : 1, name : "Spiders", tip : true, tag : "spider" },
      { id : 4, parent_id : 0, name : "Insects", tip : true, tag : "butterfly" }
   ],
   
   dyk : ("<p>Spiders, scorpions, and insects are all different kinds of <i>" +
          "arthropods</i>. However, unlike insects, spiders and scorpions have " +
          "eight legs instead of six. Spiders and scoprions also lack the wings " +
          "and antennae of insects.</p>")
},

{
   name : "Level 5",
   
   subtitle : "Amniotes",
   
   taxa : [
      { id : 0, parent_id : null, name : "Amniotes", tag : "amniotes", trait : "amniotic egg" },
      { id : 1, parent_id : 0, name : "Diapsids", tag : "diapsids", trait : "lizard-like face" },
      { id : 2, parent_id : 1, name : "Theropods", tag : "dinobirds", trait : "wishbone" },
      { id : 3, parent_id : 2, name : "Birds", tip : true, tag : "bird" },
      { id : 4, parent_id : 2, name : "T. Rex", tip : true, tag : "trex" },
      { id : 5, parent_id : 1, name : "Lizards", tip : true, tag : "lizard" },
      { id : 6, parent_id : 0, name : "Bats", tip : true, tag : "bat" }
   ],
   
   dyk : ("<p>Modern birds and Tyrannosaurus rex share a more recent ancestor in common " +
          "than birds and lizards and than tyrannosaurs and lizards.</p>")
},

{
   name : "Level 6",
   
   subtitle : "Vertebrates and Invertebrates",
   
   taxa : [
      { id : 0, parent_id : null, name : "Animals", tag : "animals", trait : null },
      { id : 1, parent_id : 0, name : "Vertebrates", tag : "vertebrates", trait : "internal skeleton" },
      { id : 2, parent_id : 0, name : "Arthropods", tag : "arthropods", trait : "exoskeleton" },
      { id : 3, parent_id : 1, name : "Mammals", tag : "mammals", trait : "hair" },
      { id : 4, parent_id : 1, name : "Theropods", tag : "dinobirds", trait : "wishbone" },
      { id : 5, parent_id : 4, name : "Birds", tip : true, tag : "bird" },
      { id : 6, parent_id : 4, name : "T. Rex", tip : true, tag : "trex" },
      { id : 7, parent_id : 3, name : "Giraffes", tip : true, tag : "giraffe" },
      { id : 8, parent_id : 3, name : "Bats", tip : true, tag : "bat" },
      { id : 9, parent_id : 2, name : "Spiders", tip : true, tag : "spider" },
      { id : 10, parent_id : 2, name : "Insects", tip : true, tag : "butterfly" }
   ],
   
   fhelp : { src : "tip6", align : "center" }
},

{
   name : "Level 7",
   
   subtitle : "What about Amphibians?",
   
   taxa : [
      { id : 0, parent_id : null, name : "Animals", tag : "animals", trait : null },
      { id : 1, parent_id : 0, name : "Vertebrates", tag : "vertebrates", trait : "internal skeleton" },
      { id : 2, parent_id : 0, name : "Arthropods", tag : "arthropods", trait : "exoskeleton" },
      { id : 3, parent_id : 1, name : "Amniotes", tag : "amniotes", trait : "amniotic egg" },
      { id : 4, parent_id : 3, name : "Diapsids", tag : "diapsids", trait : "lizard-like face" },
      { id : 5, parent_id : 1, name : "Frogs", tip : true, tag : "frog", hint : "Frogs are a type of <i>amphibian</i>. Amphibians belong to a group of animals called vertebrates." },
      { id : 6, parent_id : 3, name : "Bats", tip : true, tag : "bat", hint: "Bats are a type of mammal. Mammals belong to a group of animals called <i>diapsids</i> that also includes birds and lizards."  },
      { id : 7, parent_id : 4, name : "Birds", tip : true, tag : "bird", hint : "Birds and lizards belong to a group of animals called <i>diapsids</i>. Crocodiles and dinosaurs are also diapsids." },
      { id : 8, parent_id : 4, name : "Lizards", tip : true, tag : "lizard", hint : "Lizards and Birds belong to a group of animals called <i>diapsids</i>. Crocodiles and dinosaurs are also diapsids." },
      { id : 9, parent_id : 2, name : "Crabs", tip : true, tag : "crab", hint : "Crabs and spiders both belong to a group of animals called <i>arthropods</i>. Arthropods are invertibrate animals with exoskeletons."  },
      { id : 10, parent_id : 2, name : "Spiders", tip : true, tag : "spider", hint : "Spiders and crabs both belong to a group of animals called <i>arthropods</i>. Arthropods are invertibrate animals with exoskeletons."  }
   ],
   
   dyk : null
},

{
   name : "Bonus Level 8",
   
   taxa : [
      { id : 0, parent_id : null, name : "Animals", tag : "animals", trait : null },
      { id : 1, parent_id : 0, name : "Vertebrates", tag : "vertebrates", trait : "internal skeleton" },
      { id : 2, parent_id : 0, name : "Arthropods", tag : "arthropods", trait : "exoskeleton" },
      { id : 3, parent_id : 2, name : "Arachnids", tag : "arachnids", trait : "eight legs" },
      { id : 4, parent_id : 1, name : "Amniotes", tag : "amniotes", trait : "amniotic egg" },
      { id : 5, parent_id : 4, name : "Mammals", tag : "mammals", trait : "hair" },
      { id : 6, parent_id : 4, name : "Diapsids", tag : "diapsids", trait : "lizard-like face" },
      { id : 7, parent_id : 6, name : "Theropods", tag : "dinobirds", trait : "wishbone" },
      { id : 8, parent_id : 1, name : "Frogs", tip : true, tag : "frog" },
      { id : 9, parent_id : 6, name : "Lizards", tip : true, tag : "lizard" },
      { id : 10, parent_id : 7, name : "Birds", tip : true, tag : "bird" },
      { id : 11, parent_id : 7, name : "T. Rex", tip : true, tag : "trex" },
      { id : 12, parent_id : 5, name : "Giraffes", tip : true, tag : "giraffe" },
      { id : 13, parent_id : 5, name : "Bats", tip : true, tag : "bat" },
      { id : 14, parent_id : 2, name : "Crabs", tip : true, tag : "crab" },
      { id : 15, parent_id : 3, name : "Spiders", tip : true, tag : "spider" },
      { id : 16, parent_id : 3, name : "Scorpions", tip : true, tag : "scorpion" },
   ],
   
   dky : null
}

];
