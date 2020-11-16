window.onload = function () {
  document.addEventListener("keydown", showKey, false);


  var NBALL = 50;
  var R = 5;
  var TIME_INTERVAL = 33;
  var BACK_ALPHA = 0.3;
  var ballCanvas = document.getElementById("ballCanvas");
  var ctx_b = ballCanvas.getContext("2d");
  var wall = { left: 0, right: ballCanvas.width, top: 0, bottom: ballCanvas.height };
  var balls = [];
  var myBall;
  myBall = new Ball(100, 100, R + 3);
  myBall.setColorAsRandom(255, 255);
  

  for (var i = 0; i < NBALL; i++) {
    balls[i] = new Ball(wall.right / 2, wall.bottom / 2, R);
    balls[i].setVelocityAsRandom(2, 7).setColorAsRandom(50, 200);
  }
  var timer=setInterval(drawFrame, TIME_INTERVAL);
  function drawFrame() {
    myBall.draw(ctx_b);

    ctx_b.fillStyle = 'rgba(0,0,0,' + BACK_ALPHA + ')';
    ctx_b.fillRect(0, 0, ballCanvas.width, ballCanvas.height);
    for (i = 0; i < balls.length; i++) {
      balls[i].move().collisionWall(wall).draw(ctx_b);
    }
  }

  function showKey(e) {
    var d;
    if (e.keyCode == 37) d = 0;
    else if (e.keyCode == 38) d = 1;
    else if (e.keyCode == 39) d = 2;
    else if (e.keyCode == 40) d = 3;
    play(ctx_b,d);
  }
  function play(c, d) {
    var dyx = [[0, -1], [-1, 0], [0, 1], [1, 0]];
    for(i=0;i<NBALL;i++){
      if(Math.sqrt(Math.abs(myBall.y-balls[i].y)*Math.abs(myBall.y-balls[i].y) + Math.abs(myBall.x-balls[i].x) *Math.abs(myBall.x-balls[i].x) )<=myBall.r+balls[i].r ) {
        clearInterval(timer);
      }
    }
    
    myBall.y += 10 * dyx[d][0];
    myBall.x += 10 * dyx[d][1];
    c.lineTo(myBall.y, myBall.x);
    c.stroke();
    
  }


};
function Ball(x, y, r, vx, vy, color) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.vx = vx;
  this.vy = vy;
  this.color = color;
}
Ball.prototype = {
  setVelocityAsRandom: function (vmin, vmax) {
    var v = vmin + Math.random() * (vmax - vmin);
    var t = 2 * Math.PI * Math.random();
    this.vx = v * Math.cos(t);
    this.vy = v * Math.sin(t);
    return this;
  },
  setColorAsRandom: function (lmin, lmax) {
    var R = Math.floor(lmin + Math.random() * (lmax - lmin));
    var G = Math.floor(lmin + Math.random() * (lmax - lmin));
    var B = Math.floor(lmin + Math.random() * (lmax - lmin));
    this.color = 'rgb(' + R + ',' + G + ',' + B + ')';
    return this;
  },
  draw: function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, true);
    ctx.fill();
    return this;
  },
  move: function () {
    this.x += this.vx;
    this.y += this.vy;
    return this;
  },
  collisionWall: function (wall) {
    if (this.x - this.r < wall.left) {
      this.x = wall.left + this.r;
      if (this.vx < 0) this.vx *= -1;
    }
    if (this.x + this.r > wall.right) {
      this.x = wall.right - this.r;
      if (this.vx > 0) this.vx *= -1;
    }
    if (this.y - this.r < wall.top) {
      this.y = wall.top + this.r;
      if (this.vy < 0) this.vy *= -1;
    }
    if (this.y + this.r > wall.bottom) {
      this.y = wall.bottom - this.r;
      if (this.vy > 0) this.vy *= -1;
    }
    return this;
  }
};