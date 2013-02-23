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

// List of touchable objects on the screen
var touchables = [];

// Maps user contact points to touchable objects
var touch_bindings = [];

// Master restart event timer
var restart_timer;


function resetMasterTimer() {
// COMMENT to disable restart timer
   //clearTimeout(restart_timer);
   //restart_timer = setTimeout( masterRestart, 60000 );   
}


function masterRestart() {
   window.location = "index.html";
}


function addTouchable(t) {
   touchables.unshift(t);
}


function removeTouchable(t) {
   var nt = [];
   for (var i=0; i<touchables.length; i++) {
      if (t != touchables[i]) {
         nt.push(touchables[i]);
      }
   }
   touchables = nt;
}


function findTouchTarget(tp) {
   for (var i=0; i<touchables.length; i++) {
      var t = touchables[i];
      if (t.containsTouch(tp)) {
         return t;
      }
   }
   return null;
}


//-----------------------------------------------------------------
// Setup Event Handlers
//-----------------------------------------------------------------
function defineEventHandlers(canvas) {
   if (canvas) {
      canvas.ontouchstart = touchDown;
      canvas.ontouchmove = touchDrag;
      canvas.ontouchend = touchUp;
      canvas.onmouseup = mouseUp;
      canvas.onmousemove = mouseMove;
      canvas.onmousedown = mouseDown;
   }
   document.onkeypress = keyPress;
   
	// Prevent elastic scrolling in iphone / ipad apps
	document.ontouchmove = function(evt) {
		evt.preventDefault();
	}
}


function isIPad() {
	return (navigator.userAgent.indexOf("iPad") != -1);
}


function isIPhone() {
	return (navigator.userAgent.indexOf("iPhone") != -1);
}


function keyPress(evt) {
   switch (evt.which) {
      case 61:  // +/= key
      break;
   }
}


//-----------------------------------------------------------------
// Mouse Event Handlers
//-----------------------------------------------------------------
var mdown = false;
function mouseUp(evt) {
   var o = touch_bindings["mouse"];
   if (o) {
      o.touchUp();
      touch_bindings["mouse"] = null;
      draw();
   }
   mdown = false;
}

function mouseDown(evt) {
   resetMasterTimer();
   mdown = true;
   var pt = { x : evt.pageX, y : evt.pageY };
   var o = findTouchTarget(pt);
   if (o) {
      touch_bindings["mouse"] = o;
      o.touchDown(pt);
      draw();
   }
}

function mouseMove(evt) {
   resetMasterTimer();
   if (mdown) {
      var pt = { x : evt.pageX, y : evt.pageY };
      var o = touch_bindings["mouse"];
      if (o) {
         o.touchDrag(pt);   
      }
      draw();
   }
}


//-----------------------------------------------------------------
// Touch Event Handlers
//-----------------------------------------------------------------
function touchDown(evt) {
   resetMasterTimer();
   for (var i=0; i<evt.changedTouches.length; i++) {
      var t = evt.changedTouches[i];
      var pt = { x : t.pageX, y : t.pageY };
      var o = findTouchTarget(pt);
      if (o) {
         var id = t.identifier;
         touch_bindings[id] = o;
         o.touchDown(pt);
      }
	}
}

function touchUp(evt) {
   for (var i=0; i<evt.changedTouches.length; i++) {
      var t = evt.changedTouches[i];
      var pt = { x : t.pageX, y : t.pageY };
      var o = touch_bindings[t.identifier];
      if (o) {
         o.touchUp();
         touch_bindings[t.identifier] = null;
      }
   }
   if (evt.touches.length == 0) {
      touch_bindings = [];
   }
}

function touchDrag(evt) {
   resetMasterTimer();
   
   for (var i=0; i<evt.changedTouches.length; i++) {
      var t = evt.changedTouches[i];
      var pt = { x : t.pageX, y : t.pageY };
      var o = touch_bindings[t.identifier];
      if (o) {
         o.touchDrag(pt);   
      }
   }
}
