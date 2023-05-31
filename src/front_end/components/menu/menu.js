const menu = document.getElementById("menu");
const menuShowBtn = document.getElementById("menuShowButton");

menuShowBtn.addEventListener("click", (event) => {
  const el = event.target;
  console.log(el.name);
  if (el.name === "down") {
    el.name = "up";
    el.innerText = "👆";
    menu.setAttribute("style", "bottom:-165px;");
    console.log(":asdfasdf");
  } else {
    el.name = "down";
    el.innerText = "👇";
    menu.setAttribute("style", "bottom:0px;");
  }
});
