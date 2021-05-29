const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const display = document.getElementById("display");

btn1.onclick = () => {
    console.log("1");
    display.innerHTML += "1";
}

btn2.onclick = () => {
    console.log("2");
    display.innerHTML += "2";
}