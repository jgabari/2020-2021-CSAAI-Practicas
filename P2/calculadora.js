const btn = document.getElementById("btn");
const display = document.getElementById("display");

btn.onclick = () => {
    console.log("Click");
    display.innerHTML = "Click";
  }