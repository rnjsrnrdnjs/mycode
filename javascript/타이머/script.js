window.onload=function(){
  var startButton=document.getElementById("start");
  var stopButton=document.getElementById("stop");
  var display=document.getElementById("display");

  startButton.addEventListener("click",start,false);
  var startTimer,timer;
  function start(){
    startButton.onclick=null;
    stopButton.onclick=stop;
    startTimer =new Date();
    timer=setInterval(function(){
      var now=new Date();
      display.innerHTML=((now-startTimer)/1000).toFixed(2);
    },10);
    function stop(){
      clearInterval(timer);
      startButton.onclick=start;
    }
  }
  
}