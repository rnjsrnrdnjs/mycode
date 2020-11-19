
var imgCat=new Image();
var imgMouse=new Image();
var imgCheese=new Image();
var imgBrush=new Image();
var canvas;var ctx;
var mouseX=10,mouseY=10;


//화면을 구성하는요소를 생성하고 요소에 이벤트 리스너를 등록한다.
function createPainter(parent,width,height){
  var title=elt("h2",null,"치즈의적 고양이");
  var [canvas,ctx]=createCanvas(width,height);
  var toolbar=elt("div",null);
  for(var name in controls){
    toolbar.appendChild(controls[name](ctx));
  }
  toolbar.style.fontSize="small";
  toolbar.style.marginBottom="3px";
  parent.appendChild(elt("div",null,title,toolbar,canvas));
}
// 쥐 움직이기
function showKey(e){
    var d;
    if(e.keyCode==37)d=0;
    else if(e.keyCode==38)d=1;
    else if(e.keyCode==39)d=2;
    else if(e.keyCode==40)d=3;
    var dyx=[[0,-1],[-1,0],[0,1],[1,0]];
    mouseY+=5*dyx[d][0];
    mouseX+=5*dyx[d][1];
    ctx.clearRect(mouseX-10,mouseY-10,60,60);
    ctx.drawImage(imgMouse,mouseX,mouseY,40,40);
}
//무작위 고양이 움직이기
function randomCatMove(){

}

function createCanvas(canvasWidth,canvasHeight){
  canvas=elt("canvas",{width:canvasWidth,height:canvasHeight});
  ctx=canvas.getContext("2d");
  
  imgCat.src="cat.jpg";
  imgMouse.src="mouse.jpg";
  imgCheese.src="cheese.jpg";
  imgBrush.src="brush.jpg";

  imgMouse.onload=function(){
    ctx.drawImage(imgMouse,10,10,40,40);
  }
  imgCheese.onload=function(){
    ctx.drawImage(imgCheese,950,550,40,40)
  }
  canvas.style.border="10px solid gray";
  canvas.style.cursor="pointer";
  canvas.addEventListener("mousedown",function(e){
    var event=document.createEvent("HTMLEvents");
    event.initEvent("change",false,true);
    colorInput.dispatchEvent(event);
    paintTools[paintTool](e,ctx);
  },false);
  return [canvas,ctx];
}

//유틸리티

//element 의 왼쪽위 모서리에서 마우스의 상대위치를 가져온다.
function relativePosition(event,element){
  var rect=element.getBoundingClientRect();
  return {x:Math.floor(event.clientX-rect.left),y:Math.floor(event.clientY-rect.top)};
}

//그리기 도구
var paintTool;
var paintTools=Object.create(null);
paintTools.brush=function(e,ctx){
  ctx.lineCap="round";
  ctx.lineJoin="round";
  var img=ctx.getImageData(0,0,ctx.canvas.width,ctx.canvas.height);
  var p=relativePosition(e,ctx.canvas);
  ctx.beginPath();
  ctx.moveTo(p.x,p.y);
  setDragListeners(ctx,img,function(q){
    ctx.lineTo(q.x,q.y);
    ctx.stroke();
  }); 
};
paintTools.line=function(e,ctx){
  ctx.lineCap="round";
  var img=ctx.getImageData(0,0,ctx.canvas.width,ctx.canvas.height);
  var p=relativePosition(e,ctx.canvas);
  setDragListeners(ctx,img,function(q){
    ctx.beginPath();
    ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);
    ctx.stroke();
  });
};
paintTools.circle=function(e,ctx){
  var img=ctx.getImageData(0,0,ctx.canvas.width,ctx.canvas.height);
  var p=relativePosition(e,ctx.canvas);
  setDragListeners(ctx,img,function(q){
    var dx=q.x-p.x;
    var dy=q.y-p.y;
    var r=Math.sqrt(dy*dy+dx*dx);
    ctx.beginPath();
    ctx.arc(p.x,p.y,r,0,2*Math.PI,false);
    ctx.stroke();
  });
};
paintTools.circleFill=function(e,ctx){
  var img=ctx.getImageData(0,0,ctx.canvas.width,ctx.canvas.height);
  var p=relativePosition(e,ctx.canvas);
  setDragListeners(ctx,img,function(q){
    var dx=q.x-p.x;
    var dy=q.y-p.y;
    var r=Math.sqrt(dy*dy+dx*dx);
    ctx.beginPath();
    ctx.arc(p.x,p.y,r,0,2*Math.PI,false);
    ctx.fill();
  });
}

//그리기 도구의 유틸리티
function setDragListeners(ctx,img,draw){
  var mousemoveEventListener=function(e){
    ctx.putImageData(img,0,0);
    draw(relativePosition(e,ctx.canvas));
  };
  document.addEventListener("mousemove",mousemoveEventListener,false);
  document.addEventListener("mouseup",function(e){
    ctx.putImageData(img,0,0);
    draw(relativePosition(e,ctx.canvas));
    document.removeEventListener("mousemove",mousemoveEventListener,false);
    document.removeEventListener("mouseup",arguments.callee,false);
  },false);
}

//컨트롤러 객체 생성 

var controls=Object.create(null);
var colorInput;
controls.painter=function(ctx){
  var DEFAULT_TOOL=0;
  var select=elt("select",null);
  var label=elt("label",null,"그리기 도구: ",select);
  for(var name in paintTools){
    select.appendChild(elt("option",{value:name},name));
  }
  select.selectedIndex=DEFAULT_TOOL;
  paintTool=select.children[DEFAULT_TOOL].value;
  select.addEventListener("change",function(e){
    paintTool=this.children[this.selectedIndex].value;
  },false);
  return label;
};
controls.color=function(ctx){
  var input=colorInput=elt("input",{type:"color"});
  var label=elt("label",null," 색: ",input);
  input.addEventListener("change",function(e){
    ctx.strokeStyle=this.value;
    ctx.fillStyle=this.value;
  },false);
  return label;
};
controls.brushsize=function(ctx){
  var size=[1,2,3,4,5,6,8,10,12,14,16,20,24,28];
  var select=elt("select",null);
  for(var i=0;i<size.length;i++){
    select.appendChild(elt("option",{value:size[i].toString()},size[i].toString()));
  }
  select.selectedIndex=2;
  ctx.lineWidth=size[select.selectedIndex];
  var label=elt("label",null," 선의 너비: ",select);
  select.addEventListener("change", function(e){
    ctx.lineWidth=this.value;
  },false);
  return label;
};
controls.alpha=function(ctx){
  var input=elt("input",{type:"number",min:"0",max:"1",step:"0.05",value:"1"});
  var label=elt("label",null," 투명도: ",input);
  input.addEventListener("change",function(e){
    ctx.globalAlpha=this.value;
  },false);
  return label; 
};

