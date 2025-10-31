import "./style.css";

// Main click button
const button = document.createElement("button");
button.innerHTML = "🎮";
button.style.padding = "10px 20px";
button.style.fontSize = "18px";
button.style.cursor = "pointer";

// Counter display
const counterDiv = document.createElement("div");
counterDiv.id = "counter";
counterDiv.textContent = "0 games";
counterDiv.style.marginTop = "15px";
counterDiv.style.fontSize = "18px";
counterDiv.style.fontWeight = "bold";

// Stats display
const statsDiv = document.createElement("div");
statsDiv.id = "stats";
statsDiv.style.marginTop = "10px";
statsDiv.style.fontSize = "16px";
statsDiv.style.fontFamily = "monospace";

// --- Define upgrade items ---
interface Item {
  name: string;
  price: number;
  gain: number;
  description: string;
  purchases: number;
  button?: HTMLButtonElement;
}

// --- Initialize available item upgrades ---
const availableItems: Item[] = [
  {
    name: "GameGo",
    price: 10,
    gain: 0.1,
    description: "Your telling me you leave your house to buy these things?",
    purchases: 0,
  },
  {
    name: "PayStation Store",
    price: 100,
    gain: 2,
    description: "A virtual storefront that sells overpriced remakes.",
    purchases: 0,
  },
  {
    name: "Smoke Store",
    price: 1000,
    gain: 50,
    description: "I get it.",
    purchases: 0,
  },
  {
    name: "Ninecent",
    price: 5000,
    gain: 200,
    description: "Your favorite billion dollar corporation!",
    purchases: 0,
  },
  {
    name: "Saudi Arabia",
    price: 20000,
    gain: 1000,
    description: "Huh?",
    purchases: 0,
  },
];

// --- Game state ---
let count = 0;
let growthRate = 0;

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

// --- Create and initialize upgrade buttons ---
function initializeUpgrades(): void {
  availableItems.forEach((item) => {
    const btn = document.createElement("button");
    btn.style.padding = "10px 20px";
    btn.style.fontSize = "16px";
    btn.style.marginTop = "10px";
    btn.style.cursor = "pointer";
    btn.disabled = count < item.price;
    item.button = btn;

    // Tooltip for description
    btn.title = item.description;

    // Button label
    const updatePriceLabel = () => {
      btn.innerHTML = `${item.name} (+${item.gain} games/sec for ${
        item.price.toFixed(2)
      } games)`;
    };
    updatePriceLabel();

    // Purchase logic
    btn.addEventListener("click", () => {
      if (count >= item.price) {
        count -= item.price;
        growthRate += item.gain;
        item.purchases++;
        item.price *= 1.15; // Price increases by 15%
        updatePriceLabel();
        updateCounter();
      }
    });

    document.body.appendChild(btn);
  });
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

// --- Append everything to document ---
document.body.appendChild(button);
document.body.appendChild(counterDiv);
document.body.appendChild(statsDiv);

// --- Initialize Upgrades and Start Animation ---
initializeUpgrades();
requestAnimationFrame(animate);
