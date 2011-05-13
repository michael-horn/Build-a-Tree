function AnimatedText() {
   
   this.cx = 0;
   this.cy = 0;
   this.size = 18;
   this.text = "";
   this.family = "Arial, sans-serif";
   this.weight = "";
   this.color = { r : 255, g : 255, b : 255 };
   this.ocolor = { r : 255, g : 0, b : 0 };
   this.alpha = 1;
   this.shadow = false;
   this.outline = false;
   this.tween = new Tween();
   this.tween.setDuration(1000);

   var atext = this;
   this.tween.setEndCallback(function() { atext.tweenDone(); });
   this.tween.setStartCallback(function() { atext.tweenStart(); });   
   
   this.useShadow = function(shadow) {
      this.shadow = shadow;
   }
   
   this.useOutline = function(outline) {
      this.outline = outline;
   }
   
   this.setDuration = function(ms) {
      this.tween.setDuration(ms);
   }
   
   this.setDelay = function(ms) {
      this.tween.setDelay(ms);
   }
   
   this.setCenter = function(cx, cy) {
      this.cx = cx;
      this.cy = cy;
   }
   
   this.setFontSize = function(size) {
      this.size = size;
   }
   
   this.getFontSize = function() {
      return this.size;
   }
   
   this.setFontFamily = function(family) {
      this.family = family;
   }
   
   this.getFontFamily = function() {
      return this.family;
   }
   
   this.setFontWeight = function(weight) {
      this.weight = weight;
   }
   
   this.getFontWeight = function() {
      return this.weight;
   }
   
   this.setTextColor = function(r, g, b) {
      this.color = { r : r, g : g, b : b };
   }
   
   this.setOutlineColor = function(r, g, b) {
      this.ocolor = { r : r, g : g, b : b };
   }
   
   this.setText = function(text) {
      this.text = text;
   }
   
   this.getText = function() {
      return this.text;
   }
   
   this.startFadeIn = function() {
      this.tween.clearControlPoints();
      this.tween.addControlPoint(0, 0);
      this.tween.addControlPoint(0.7, 0.1);
      this.tween.addControlPoint(0.7, 0.9);
      this.tween.addControlPoint(0, 1);
      this.tween.setFunction(TWEEN_SINE2);
      var atext = this;
      this.tween.setActionCallback(function(val) { atext.tweenAlpha(val); });
      this.tween.play();
   }
   
   this.startZoomIn = function(min, max) {
      this.tween.clearControlPoints();
      this.tween.addControlPoint(10, 0);
      this.tween.addControlPoint(25, 0.1);
      this.tween.addControlPoint(25, 0.9);
      this.tween.addControlPoint(10, 1);
      this.tween.setFunction(TWEEN_SINE2);
      var atext = this;
      this.tween.setActionCallback(function(val) { atext.tweenZoom(val); });
      this.tween.play();
   }
   
   this.tweenStart = function() {
      addVisual(this);
   }
   
   this.tweenAlpha = function(val) {
      this.alpha = Math.max(0, Math.min(1, val));
   }
   
   this.tweenZoom = function(val) {
      this.size = Math.round(val);
   }
   
   this.tweenDone = function() {
      removeVisual(this);
   }
   
   this.draw = function(g) {
      g.save();
      if (this.shadow) {
         g.shadowOffsetX = 1;
         g.shadowOffsetY = 1;
         g.shadowBlur = 3;
         g.shadowColor = "#333";
      }
      g.fillStyle = ("rgba(" +
                     this.color.r + ", " +
                     this.color.g + ", " +
                     this.color.b + ", " +
                     this.alpha + ")");
      g.font = this.weight + " " + this.size + "px " + this.family;
      g.textBaseline = "middle";
      g.textAlign = "center";
      g.beginPath();
      if (this.outline) {
         g.strokeStyle = "red";
         g.lineWidth = 3;
         g.lineCap = "round";
         g.strokeText(this.text, this.cx, this.cy);
      }
      g.fillText(this.text, this.cx, this.cy);
      g.restore();
   }
}