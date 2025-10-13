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

const statsDiv = document.createElement("div");
statsDiv.style.marginTop = "10px";
statsDiv.style.fontSize = "16px";
statsDiv.style.fontFamily = "monospace";

const upgradeButton = document.createElement("button");
upgradeButton.innerHTML = "GameGo (+0.1 games/sec for 10 games)";
upgradeButton.style.padding = "10px 20px";
upgradeButton.style.fontSize = "16px";
upgradeButton.style.marginTop = "10px";
upgradeButton.style.cursor = "pointer";
upgradeButton.disabled = true;

const payStationStore = document.createElement("button");
payStationStore.innerHTML = "PayStation Store (+2 games/sec for 100 games)";
payStationStore.style.padding = "10px 20px";
payStationStore.style.fontSize = "16px";
payStationStore.style.marginTop = "10px";
payStationStore.style.cursor = "pointer";
payStationStore.disabled = true;

const smoke = document.createElement("button");
smoke.innerHTML = "Smoke Store (+50 games/sec for 1000 games)";
smoke.style.padding = "10px 20px";
smoke.style.fontSize = "16px";
smoke.style.marginTop = "10px";
smoke.style.cursor = "pointer";
smoke.disabled = true;

let count = 0;
let growthRate = 0;
let gameGoPurchases = 0;
let payStationPurchases = 0;
let smokePurchases = 0;

function updateStats() {
  statsDiv.innerHTML = `
    Growth rate: ${growthRate.toFixed(2)} games/sec<br>
    GameGo purchases: ${gameGoPurchases}<br>
    PayStation purchases: ${payStationPurchases}<br>
    Smoke purchases: ${smokePurchases}
  `;
}

function updateCounter() {
  counterDiv.textContent = `${count.toFixed(2)} game${
    Math.floor(count) !== 1 ? "s" : ""
  }`;
  upgradeButton.disabled = count < 10; // enable only if affordable
  payStationStore.disabled = count < 100;
  smoke.disabled = count < 1000;
  updateStats();
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
    console.log("GameGo purchases");
    count = count - 10;
    growthRate += .1;
    gameGoPurchases++;
    upgradeButton.disabled = count < 10;
  }
});

payStationStore.addEventListener("click", () => {
  if (count >= 100) {
    console.log("PayStation purchases");
    count = count - 100;
    growthRate += 2;
    payStationPurchases++;
    upgradeButton.disabled = count < 100;
  }
});

smoke.addEventListener("click", () => {
  if (count >= 1000) {
    console.log("Smoke purchases");
    count = count - 1000;
    growthRate += 50;
    smokePurchases++;
    upgradeButton.disabled = count < 1000;
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
document.body.appendChild(statsDiv);
document.body.appendChild(upgradeButton);
document.body.appendChild(payStationStore);
document.body.appendChild(smoke);
