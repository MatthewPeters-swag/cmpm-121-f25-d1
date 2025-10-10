import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

document.body.innerHTML = `
  <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
`;

const button = document.createElement("button");
button.innerHTML = "🎮";
button.style.padding = "10px 20px";
button.style.fontSize = "18px";
button.style.cursor = "pointer";

const counterDiv = document.createElement("div");
counterDiv.textContent = "0 games";
counterDiv.style.marginTop = "15px";
counterDiv.style.fontSize = "18px";
counterDiv.style.fontWeight = "bold";

let count = 0;

button.onmouseover = () => {
  button.style.backgroundColor = "#ffcc00";
};
button.onmouseout = () => {
  button.style.backgroundColor = "";
};

// Add click behavior
button.addEventListener("click", () => {
  console.log("Button clicked");
  count++;
  counterDiv.textContent = `${count} game${count !== 1 ? "s" : ""}`;
});

setInterval(() => {
  count++;
  counterDiv.textContent = `${count} game${count !== 1 ? "s" : ""}`;
}, 1000);

document.body.appendChild(button);
document.body.appendChild(counterDiv);
