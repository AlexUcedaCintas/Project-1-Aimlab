class Game {
    constructor() {
      this.counter = 0;
      this.score = 0;
    }
    start() {
      this.boardElm = document.createElement("game");
      this.boardElm.setAttribute("id","game")
      this.body = document.getElementById("board")
      this.body.appendChild(this.boardElm)
      this.targets = document.getElementById("targets").value;
      this.speed = Number(
        document.querySelector('input[name="lvl"]:checked').value
      );
      menu.remove();
      const spawnObjective = setInterval(() => {
        if (this.counter < this.targets) {
          const newObjective = new Objectives(this.speed);
          this.counter++;
        } else {
          clearInterval(spawnObjective);
          
          this.displayScore(this.score, this.targets);
        }
      }, this.speed);
    }
    displayScore(score, targets) {
      this.boardElm.remove()
      this.score_block = document.createElement("div");
      this.score_block.className = "menu";
      this.score_block.innerHTML = `<h1>YOUR SCORE IS</h1> <br> <h1 class="red">${score}/${targets}</h1><br><button class="button" onclick="location.reload()">PLAY AGAIN</button>`
      this.body.appendChild(this.score_block);
    }
  }
  
  class Objectives {
    constructor(speed) {
      this.boardElm = document.getElementById("game");
      this.boardRect = this.boardElm.getBoundingClientRect()
      this.vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
      this.vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
      this.positionX = Math.floor(Math.random() * this.boardRect.width-50) + this.boardRect.left;
      this.positionY = Math.floor(Math.random() * this.boardRect.height-50) + this.boardRect.top;
  
      this.createObjective();
      this.eventListeners();
      this.removingObjective();
      this.nohit = true;
      this.speed = speed;
    }
    createObjective() {
      this.objective = document.createElement("div");
      this.objective.classList.add("objectives");
      this.objective.style.left = this.positionX + "px";
      this.objective.style.bottom = this.positionY + "px";
      this.boardElm.appendChild(this.objective);
    }
  
    removingObjective() {
      const remove = setInterval(() => {
        this.objective.remove();
        this.nohit = true;
      }, game.speed);
    }
  
    eventListeners() {
      this.objective.addEventListener("click", () => {
        if (this.nohit) {
          this.nohit = false;
          this.objective.classList.add("objectiveHit");
          game.score++;
        }
      });
    }
  }
  
  
  const start_btn = document.getElementById("play");
  const menu = document.getElementsByClassName("menu")[0];
  start_btn.addEventListener("click", () => game.start());
  const game = new Game();
  tarLabel = document.getElementById("targetLabel");
  targets.addEventListener("input", function () {
    tarLabel.innerHTML = targets.value;
  });