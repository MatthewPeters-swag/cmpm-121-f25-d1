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

button.onmouseover = () => {
  button.style.backgroundColor = "#ffcc00";
};
button.onmouseout = () => {
  button.style.backgroundColor = "";
};

// Add click behavior
button.addEventListener("click", () => {
  console.log("Button clicked");
  alert("Fortnite");
});

document.body.appendChild(button);
