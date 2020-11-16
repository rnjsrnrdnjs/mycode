var x=300,y=300;
function Walk(c,d){
  var dyx=[[0,-1],[-1,0],[0,1],[1,0]];
  c.strokeStyle="red";
  c.globalAlpha=0.25;

  c.beginPath();
  c.moveTo(x,y);
  y+=10*dyx[d][0];   
  x+=10*dyx[d][1];
  if(x>=600)x=600;
  if(x<0)x=0;
  if(y>=600)y=600;
  if(y<0)y=0;
  c.lineTo(x,y);
  c.lineWidth=10;
  c.stroke();
}
window.onload=function(){
  document.addEventListener("keydown",showKey,false);
  var canvas=document.getElementById("mycanvas");
  var ctx=canvas.getContext("2d");
  function showKey(e){
    var d;
    if(e.keyCode==37) d=0;
    else if(e.keyCode==38)d=1;
    else if(e.keyCode==39)d=2;
    else if(e.keyCode==40)d=3;
    Walk(ctx,d);
  }

};