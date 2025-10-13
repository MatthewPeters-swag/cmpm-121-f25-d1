import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

// Display icon
document.body.innerHTML = `
  <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
`;

// Main click button
const button = document.createElement("button");
button.innerHTML = "🎮";
button.style.padding = "10px 20px";
button.style.fontSize = "18px";
button.style.cursor = "pointer";

// Counter display
const counterDiv = document.createElement("div");
counterDiv.textContent = "0 games";
counterDiv.style.marginTop = "15px";
counterDiv.style.fontSize = "18px";
counterDiv.style.fontWeight = "bold";

// Stats display
const statsDiv = document.createElement("div");
statsDiv.style.marginTop = "10px";
statsDiv.style.fontSize = "16px";
statsDiv.style.fontFamily = "monospace";

// --- Define upgrade items ---
interface Item {
  name: string;
  price: number;
  gain: number;
  purchases: number;
  button?: HTMLButtonElement;
}

const availableItems: Item[] = [
  { name: "GameGo", price: 10, gain: 0.1, purchases: 0 },
  { name: "PayStation Store", price: 100, gain: 2, purchases: 0 },
  { name: "Smoke Store", price: 1000, gain: 50, purchases: 0 },
];

// --- Game state ---
let count = 0;
let growthRate = 0;

// --- Build upgrade buttons dynamically ---
availableItems.forEach((item) => {
  const btn = document.createElement("button");
  btn.style.padding = "10px 20px";
  btn.style.fontSize = "16px";
  btn.style.marginTop = "10px";
  btn.style.cursor = "pointer";
  btn.disabled = true;
  item.button = btn;

  // Update button label
  const updateLabel = () => {
    btn.innerHTML = `${item.name} (+${item.gain} games/sec for ${
      item.price.toFixed(2)
    } games)`;
  };
  updateLabel();

  // Purchase logic
  btn.addEventListener("click", () => {
    if (count >= item.price) {
      count -= item.price;
      growthRate += item.gain;
      item.purchases++;
      item.price *= 1.15; // increase price by 15%
      updateLabel();
      updateCounter();
    }
  });

  document.body.appendChild(btn);
});

// --- Update Stats ---
function updateStats() {
  let statsHTML = `Growth rate: ${growthRate.toFixed(2)} games/sec<br>`;
  availableItems.forEach((item) => {
    statsHTML += `${item.name} purchases: ${item.purchases}<br>`;
  });
  statsDiv.innerHTML = statsHTML;
}

// --- Update Counter ---
function updateCounter() {
  counterDiv.textContent = `${count.toFixed(2)} game${
    Math.floor(count) !== 1 ? "s" : ""
  }`;
  availableItems.forEach((item) => {
    if (item.button) {
      item.button.disabled = count < item.price;
    }
  });
  updateStats();
}

// --- Hover effect for main button ---
button.onmouseover = () => (button.style.backgroundColor = "#ffcc00");
button.onmouseout = () => (button.style.backgroundColor = "");

// --- Manual click increments ---
button.addEventListener("click", () => {
  count++;
  updateCounter();
});

// --- Automatic animation-based increment ---
let lastTime = performance.now();
function animate(time: number) {
  const delta = time - lastTime;
  lastTime = time;

  count += (growthRate * delta) / 1000;
  updateCounter();

  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

// --- Append everything to document ---
document.body.appendChild(button);
document.body.appendChild(counterDiv);
document.body.appendChild(statsDiv);
