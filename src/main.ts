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

const upgradeButton = document.createElement("button");
upgradeButton.innerHTML = "GameStop (+1 games/sec for 10 games)";
upgradeButton.style.padding = "10px 20px";
upgradeButton.style.fontSize = "16px";
upgradeButton.style.marginTop = "10px";
upgradeButton.style.cursor = "pointer";
upgradeButton.disabled = true;

let count = 0;
let growthRate = 0;

function updateCounter() {
  counterDiv.textContent = `${count.toFixed(2)} game${
    Math.floor(count) !== 1 ? "s" : ""
  }`;
  upgradeButton.disabled = count < 10; // enable only if affordable
}

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
  //counterDiv.textContent = `${count} game${count !== 1 ? "s" : ""}`;
  updateCounter();
});

upgradeButton.addEventListener("click", () => {
  if (count >= 10) {
    console.log("Gamestop purchases");
    count = count - 10;
    growthRate += 1;
    upgradeButton.disabled = count < 10;
  }
});

//setInterval(() => {
//  count++;
//  counterDiv.textContent = `${count} game${count !== 1 ? "s" : ""}`;
//}, 1000);

let lastTime = performance.now();

function animate(time: number) {
  const delta = time - lastTime;
  lastTime = time;

  count += (growthRate * delta) / 1000;
  updateCounter();

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

document.body.appendChild(button);
document.body.appendChild(counterDiv);
document.body.appendChild(upgradeButton);
