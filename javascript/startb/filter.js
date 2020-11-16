function filter() {
  var question, name, item, i;
  question = document.getElementById("question").value.toUpperCase();
  item = document.getElementsByClassName("item");

  for (i = 0; i < item.length; i++) {
    name = item[i].getElementsByClassName("name");
    if (name[0].innerHTML.toUpperCase().indexOf(question) > -1) {
      item[i].style.display = "flex";
    } else {
      item[i].style.display = "none";
    }
  }
}