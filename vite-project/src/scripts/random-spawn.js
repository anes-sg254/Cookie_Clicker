export class RandomSpawn {
  constructor(gameElement, getPassiveGain, addCookies) {
    this.gameElement = gameElement;
    this.getPassiveGain = getPassiveGain;
    this.addCookies = addCookies;
  }

  spawnGoldenCookie() {
    const goldenCookie = document.createElement("div");
    goldenCookie.classList.add("golden-cookie");

    // Position aléatoire dans la fenêtre
    const x = Math.random() * (window.innerWidth - 100); 
    const y = Math.random() * (window.innerHeight - 100);
    goldenCookie.style.left = `${x}px`;
    goldenCookie.style.top = `${y}px`;

    // Ajoute à la page
    this.gameElement.appendChild(goldenCookie);

    // Clique sur le cookie doré
    goldenCookie.addEventListener("click", () => {
      const passiveGain = this.getPassiveGain();
      const bonus = Math.floor(Math.random() * (passiveGain * 1000)) + 1;
      this.addCookies(bonus);

      // Disparition immédiate
      goldenCookie.classList.add("fade-out");
      setTimeout(() => goldenCookie.remove(), 1000);
    });

    // Disparition automatique au bout de 5s
    setTimeout(() => {
      goldenCookie.classList.add("fade-out");
      setTimeout(() => goldenCookie.remove(), 1000);
    }, 5000);
  }

  // Démarrer le système avec un intervalle régulier
  startSpawning(interval = 15000) {
    setInterval(() => this.spawnGoldenCookie(), interval);
  }
}
