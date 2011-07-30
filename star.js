var STAR = document.createElement("img");
var STAR_BLANK = document.createElement("img");

STAR.src = "images/star.png";
STAR_BLANK.src = "images/star_blank.png";   
   
function Star(x, y) {
   
   this.x = x;
   this.y = y;
   this.w = 10;
   this.visible = false;
   

   this.animateTo = function(tx, ty) {
      var star = this;
      
      var tween = new Tween();
      tween.clearControlPoints();
      tween.setStart(10);
      tween.addControlPoint(50, 0.6);
      tween.setEnd(33);
      tween.setDuration(200);
      tween.setDelay(350);
      tween.setActionCallback(function(val) { star.w = val; } );
      tween.setStartCallback(function() { star.visible = true; } );
      
      var tweenX = new Tween();
      tweenX.clearControlPoints();
      tweenX.setStart(this.x);
      tweenX.setEnd(tx);
      tweenX.setDuration(400);
      tweenX.setDelay(1000);
      tweenX.setFunction(TWEEN_SINE2);
      tweenX.setActionCallback(function(val) { star.x = val; } );
      
      var tweenY = new Tween();
      tweenY.clearControlPoints();
      tweenY.setStart(this.y);
      tweenY.setEnd(ty);
      tweenY.setDuration(400);
      tweenY.setDelay(1000);
      tweenY.setFunction(TWEEN_SINE2);
      tweenY.setActionCallback(function(val) { star.y = val; } );
      tweenY.setEndCallback(function() { removeVisual(star); });
      tweenX.play();
      tweenY.play();
      tween.play();
   }
   
   this.draw = function(g) {
      if (this.visible) {
         g.drawImage(STAR, this.x - this.w/2, this.y - this.w/2, this.w, this.w);
      }
   }
}