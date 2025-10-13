//import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
//import "./style.css";

//document.body.innerHTML = `
//  <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
//`;

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

// --- Upgrade buttons ---
const upgradeButton = document.createElement("button");
upgradeButton.style.padding = "10px 20px";
upgradeButton.style.fontSize = "16px";
upgradeButton.style.marginTop = "10px";
upgradeButton.style.cursor = "pointer";
upgradeButton.disabled = true;

const payStationStore = document.createElement("button");
payStationStore.style.padding = "10px 20px";
payStationStore.style.fontSize = "16px";
payStationStore.style.marginTop = "10px";
payStationStore.style.cursor = "pointer";
payStationStore.disabled = true;

const smoke = document.createElement("button");
smoke.style.padding = "10px 20px";
smoke.style.fontSize = "16px";
smoke.style.marginTop = "10px";
smoke.style.cursor = "pointer";
smoke.disabled = true;

// --- Prices ---
let gameGoPrice = 10;
let payStationPrice = 100;
let smokePrice = 1000;

// --- Game state ---
let count = 0;
let growthRate = 0;
let gameGoPurchases = 0;
let payStationPurchases = 0;
let smokePurchases = 0;

// --- Update text for buttons ---
function updateButtonLabels() {
  upgradeButton.innerHTML = `GameGo (+0.1 games/sec for ${
    gameGoPrice.toFixed(2)
  } games)`;
  payStationStore.innerHTML = `PayStation Store (+2 games/sec for ${
    payStationPrice.toFixed(2)
  } games)`;
  smoke.innerHTML = `Smoke Store (+50 games/sec for ${
    smokePrice.toFixed(2)
  } games)`;
}

updateButtonLabels();

// --- Update stats ---
function updateStats() {
  statsDiv.innerHTML = `
    Growth rate: ${growthRate.toFixed(2)} games/sec<br>
    GameGo purchases: ${gameGoPurchases}<br>
    PayStation purchases: ${payStationPurchases}<br>
    Smoke purchases: ${smokePurchases}
  `;
}

// --- Update counter + button states ---
function updateCounter() {
  counterDiv.textContent = `${count.toFixed(2)} game${
    Math.floor(count) !== 1 ? "s" : ""
  }`;
  upgradeButton.disabled = count < gameGoPrice;
  payStationStore.disabled = count < payStationPrice;
  smoke.disabled = count < smokePrice;
  updateStats();
}

// --- Button hover styles ---
button.onmouseover = () => {
  button.style.backgroundColor = "#ffcc00";
};
button.onmouseout = () => {
  button.style.backgroundColor = "";
};

// --- Click to gain 1 ---
button.addEventListener("click", () => {
  count++;
  updateCounter();
});

// --- Upgrade purchases ---
upgradeButton.addEventListener("click", () => {
  if (count >= gameGoPrice) {
    count -= gameGoPrice;
    growthRate += 0.1;
    gameGoPurchases++;
    gameGoPrice *= 1.15; // price increases 15%
    updateButtonLabels();
    updateCounter();
  }
});

payStationStore.addEventListener("click", () => {
  if (count >= payStationPrice) {
    count -= payStationPrice;
    growthRate += 2;
    payStationPurchases++;
    payStationPrice *= 1.15; // price increases 15%
    updateButtonLabels();
    updateCounter();
  }
});

smoke.addEventListener("click", () => {
  if (count >= smokePrice) {
    count -= smokePrice;
    growthRate += 50;
    smokePurchases++;
    smokePrice *= 1.15; // price increases 15%
    updateButtonLabels();
    updateCounter();
  }
});

// --- Animation frame increment ---
let lastTime = performance.now();

function animate(time: number) {
  const delta = time - lastTime;
  lastTime = time;

  count += (growthRate * delta) / 1000;
  updateCounter();

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

// --- Add all elements to page ---
document.body.appendChild(button);
document.body.appendChild(counterDiv);
document.body.appendChild(statsDiv);
document.body.appendChild(upgradeButton);
document.body.appendChild(payStationStore);
document.body.appendChild(smoke);
