import { ClickableArea } from "./clickable-area";
import "../styles/game.css"
import { Shop } from "./shop.js";
import { RandomSpawn } from "./random-spawn.js";

export class Game {
  // Game Properties
  cookies = 0;
  passiveGain = 0;

  // Game Elements
  gameElement = null;
  scoreElement = null;
  shop = null;

  // Game Components
  clickableArea = null;

  constructor(config) {
    this.cookies = config.cookies;
    this.gameElement = document.querySelector("#game");
    this.spawn=new RandomSpawn(this.gameElement,()=>this.passiveGain,this.onclickgoldencookies)

    this.clickableArea = new ClickableArea(
      this.gameElement,
      this.onClickableAreaClick
    );

    // On passe la méthode onUpgradePurchase comme callback à Shop
    this.shop = new Shop(this.gameElement, this.onUpgradePurchase);
  }

  // Lance le jeu
  start() {

    this.render();
    this.spawn.startSpawning();
   



    // Ajoute un gain passif toutes les secondes
    setInterval(() => {
      this.cookies += this.passiveGain;
      console.log(this.passiveGain,this.cookies)
      window.requestAnimationFrame(() => {
        this.updateScore();
      });
    }, 1000);
  }

  render() {
    this.renderScore();
    this.clickableArea.render();
    this.shop.render();
  }

  renderScore() {
    this.scoreElement = document.createElement("section");
    this.scoreElement.id = "game-score";
    this.gameElement.append(this.scoreElement);
    this.updateScore();
  }

  updateScore() {
    this.scoreElement.innerHTML = `
      <span>${this.cookies.toFixed(2)} cookies</span>
      <br />
      <span>Passive gain: ${this.passiveGain.toFixed(2)} cookies/sec</span>
    `;
  }

  onClickableAreaClick = () => {
    this.cookies += 1;
    window.requestAnimationFrame(() => {
      this.updateScore();
    });
  };
  onclickgoldencookies=(cookies)=> {
    this.cookies+=cookies;
    window.requestAnimationFrame(() => {
      this.updateScore();
    });

  }

  onUpgradePurchase = (upgrade) => {
    if (this.cookies >= upgrade.price) {
      console.log(this.cookies, upgrade.price)
      this.cookies -= upgrade.price;

      upgrade.quantity += 1;
      upgrade.price = upgrade.calculatePrice(upgrade.quantity);
      console.log(this.passiveGain,upgrade)
      // Met à jour le gain passif
      this.passiveGain += upgrade.getPassiveIncome();
      console.log(this.passiveGain, this.cookies)

      this.updateScore();
      return true;
    } else {
      return false;
    }
  };
}
