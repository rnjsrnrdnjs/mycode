window.onload = function () {
  createPainter(document.body, 1000, 600);

  //초기 맵 그리기 
  //붓을 가지면 늘어남
  //붓에따라 그릴수있는양 늘어남

  document.addEventListener("keydown", showKey, false);
  //게임 끝나는시점 -> 치즈먹으면 끝 승리, 고양이에게 닿으면 끝 패배
  timer = setInterval(function () {
    if (isMousedown == false) {
      randomCatMove();
    }
  }, 100);
};
