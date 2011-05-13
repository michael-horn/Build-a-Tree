function Snap() {
   
   this.cx = 0;
   this.cy = 0;
   this.size = 25;
   this.text = "";
   this.color = "#ffcc33";
   this.tween = new Tween();
   var snap = this;
   this.tween.setActionCallback(function(val) { snap.tweenAction(val); } );
   this.tween.setEndCallback(function() { snap.tweenDone(); } );
   this.tween.setStartCallback(function() { snap.tweenStart(); });

   this.setDelay = function(ms) {
      this.tween.setDelay(ms);
   }
   
   this.start = function() {
      this.tween.clearControlPoints();
      this.tween.addControlPoint(10, 0);
      this.tween.addControlPoint(25, 0.08);
      this.tween.addControlPoint(25, 0.92);
      this.tween.addControlPoint(10, 1);
      this.tween.setFunction(TWEEN_SINE2);
      this.tween.setDuration(1250);
      this.tween.play();
   }
   
   this.tweenStart = function() {
      addVisual(this);
   }
   
   this.tweenAction = function(val) {
      this.size = Math.round(val);
   }
   
   this.tweenDone = function() {
      removeVisual(this);
   }
   
   this.setCenter = function(cx, cy) {
      this.cx = cx;
      this.cy = cy;
   }
   
   this.setColor = function(color) {
      this.color = color;
   }
   
   this.setText = function(text) {
      this.text = text;
   }
   
   this.draw = function(g) {
      g.save();
      g.shadowOffsetX = 1;
      g.shadowOffsetY = 1;
      g.shadowBlur = 3;
      g.shadowColor = "#333";
      g.fillStyle = this.color;
      g.font = this.size + "px Tahoma, Arial, sans-serif";
      g.textBaseline = "middle";
      g.textAlign = "center";
      g.lineWidth = 3;
      g.strokeStyle = "red";
      g.lineCap = "round";
      g.beginPath();
      g.strokeText(this.text, this.cx, this.cy);
      g.fillText(this.text, this.cx, this.cy);
      g.restore();
   }
}