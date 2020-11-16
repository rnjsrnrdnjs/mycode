<script>
  window.onload=function(){
    document.addEventListener("keydown", showKey, false);
    var display=document.getElementById("display");
    function showKey(e){
      var prop=["altKey","ctrlKey","shiftKey","metaKey","code","keyCode"];
      var s="";
      for(var i in prop){
        s += "<br>" + prop[i] + ": " + e[prop[i]];
      }
      s+="-> "+String.fromCharCode(e.keyCode);
      display.innerHTML=s;
    }
  };
</script>
