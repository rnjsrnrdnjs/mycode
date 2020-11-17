var me=new myState(200,50,3);

function fightDragon(nx, ny) {
  var dragon = new Map();
  var SPACE = 10, W = 200, H = 200;

  for (var i = 0; i < nx; i++) {
    for (var j = 0; j < ny; j++) {
      var element = document.createElement("div");
      element.style.width = W + "px";
      element.style.height = H + "px";
      element.style.backgroundSize = 200 + "px " + 200 + "px";
      element.style.backgroundImage = "url(./d.jpg)";
      element.style.position = "absolute";
      element.style.opacity = 0;
      element.style.transition = "transition 0.5s ease-in-out, opacity 0.5s ease";
      document.body.appendChild(element);
      element.style.left = SPACE + i * (W + SPACE) + "px";
      element.style.top = 2 * SPACE + j * (H + SPACE) + "px";

      dragon.set(element, { x: i, y: j, opacity: 0, hp: 200 });
      element.addEventListener("click", clickEvent, false);
      function clickEvent(e) {
        var ele = e.currentTarget;
        var state = dragon.get(ele);
        // 몬스터와 싸우는과정 
        if (state.opacity >= 0.5) {
          if (state.hp > 0) {
            me.hp-=30;
            state.hp-=me.atk;
          }
          if (state.hp <= 0) {
            me.atk+=20;
            document.body.removeChild(ele);
            dragon.delete(ele);
          }
        }
      }
    }
  }
  return dragon;
}

function myState(hp, atk, potion) {
  this.hp = hp;
  this.atk = atk;
  this.potion = potion;
}
myState.prototype={
  drinkPotion: function(){
    if(this.potion){
      this.potion-=1;
      this.hp+=50;
    }
    return this;
  }
};

window.onload = function () {
  var TIME_INTERVAL = 1500, DISPLAY_TIME = 1050;
  var dragonState = fightDragon(4, 3);
  var hp=document.createElement("div");
  var atk=document.createElement("div");
  var potion=document.createElement("div");
  hp.innerHTML="my hp: "+ me.hp;
  atk.innerHTML="my atk: "+me.atk;
  potion.innerHTML="my potion: "+me.potion;
  document.body.appendChild(hp);
  document.body.appendChild(atk);
  document.body.appendChild(potion);
  var drink=document.createElement("button");
  var drinkText=document.createTextNode('포션사용');
  drink.appendChild(drinkText);
  document.body.appendChild(drink);
  drink.onclick=function(){
    me.hp+=100;
    me.potion-=1;
  };

  var timer = setInterval(function appearDragon() {
    setTimeout(function informe() {
      hp.innerHTML="my hp: "+ me.hp;
      atk.innerHTML="my atk: "+me.atk;
      potion.innerHTML="my potion: "+me.potion;
    }, 10);

    if (dragonState.size == 0) {
      clearInterval(timer);
      document.body.innerHTML = "you win";
      return;
    }
    if(me.hp<=0){
      clearInterval(timer);
      document.body.innerHTML="you lose";
      return;
    }
    var elements = dragonState.entries();

    for (var [key, value] of elements) {
      if (value.hp > 0) {
        break;
      }
    }

    var state = dragonState.get(key);
    key.style.opacity = 1;
    state.opacity = 1;
    key.style.transform = "translateY(-20px)";
    setTimeout(function move() {
      key.style.transform = "translateY(0)";
    }, DISPLAY_TIME);

  }, TIME_INTERVAL);
};