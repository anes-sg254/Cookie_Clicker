export class Shop {
    constructor(gameElement, onUpgradePurchase) {
      this.shopElement = document.createElement("aside");
      this.shopElement.id = "game-shop";
      this.upgrades = [];
      this.gameElement = gameElement;
      this.onUpgradePurchase = onUpgradePurchase;
  
      
      this.createCursorUpgrade();
    }
  
    render() {
      this.shopElement.innerHTML = `<h2>Boutique</h2>`;
      this.upgrades.forEach((upgrade) => {
        const upgradeElement = document.createElement("div");
        upgradeElement.className = "shop-upgrade";
        upgradeElement.innerHTML = `
          <strong>${upgrade.name}</strong><br>
          Prix : ${upgrade.price} cookies<br>
          Possédé : ${upgrade.quantity}
          <button>Acheter</button>
        `;
  
        const button = upgradeElement.querySelector("button");
        button.addEventListener("click", () => {
          if (this.onUpgradePurchase(upgrade)) {
            this.updateUpgradeDisplay(upgradeElement, upgrade);
          }
        });
  
        this.shopElement.appendChild(upgradeElement);
      });
  
      this.gameElement.appendChild(this.shopElement);
    }
  
    createCursorUpgrade() {
      this.upgrades.push({
        name: "Curseur",
        quantity: 0,
        price: 10,
        getPassiveIncome: () => 0.1,
        calculatePrice: (quantity) => 10 + quantity * 3,
      });
    }
  
    updateUpgradeDisplay(element, upgrade) {
      element.innerHTML = `
        <strong>${upgrade.name}</strong><br>
        Prix : ${upgrade.price} cookies<br>
        Possédé : ${upgrade.quantity}
        <button>Acheter</button>
      `;
      const button = element.querySelector("button");
      button.addEventListener("click", () => {
        if (this.onUpgradePurchase(upgrade)) {
          this.updateUpgradeDisplay(element, upgrade);
        }
      });
    }
  }
  