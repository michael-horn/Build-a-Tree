/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function TipSplash(tag) {
   this.image       = document.createElement("img");
   this.color       = null;
   this.tag         = tag;
   this.cx        = 0;         // center x
   this.cy        = 0;         // center y
   this.w         = 75;
   this.phase     = 0;
   this.amplitude = 1;
   this.repetitions = 1;
   this.speed     = 1;
   this.yshift    = 1;
   
   this.setImageSrc = function(src) {
      this.image.src = "images/" + src + ".png";
   }
   
   this.getImage = function() {
      return this.image;
   }
   
   this.setColor = function(color) {
      this.color = color;
   }
   
   this.getColor = function() {
      return this.color;
   }
   
   this.initializeValues = function()
   {
      this.setImageSrc(this.tag);
      this.phase = Math.random();
      this.amplitude = 150 + Math.random() * 150;
      this.repetitions = 1 + Math.random() * 0.1;
      this.speed = 0.005 + Math.random() * 0.004;
      this.yshift = -50 + Math.random() * 100;
   }
   
   this.animate = function()
   {
      this.phase += this.speed;
      if (this.phase > 1) this.phase = 0;
      this.cx = this.phase * canvas.width;
      this.cy = canvas.height / 2 + Math.sin(this.phase * Math.PI * 2 * this.repetitions) * this.amplitude;
   }
   
   this.draw = function(g) {
      g.fillStyle = this.color; //"#00FF00"
      g.beginPath();
      g.arc(this.cx, this.cy, this.w/2 - 1.5, 0, Math.PI*2, true);
      g.fill();
      
      g.fillStyle = "#FFFFFF";
      g.beginPath();
      g.arc(this.cx, this.cy, this.w/2 - 12, 0, Math.PI * 2, true);
      g.fill();
      g.drawImage(this.image, this.cx - this.w/2, this.cy - this.w/2);
   }
}
