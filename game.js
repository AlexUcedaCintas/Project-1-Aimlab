class Game{
    constructor(){
        this.counter=0
        this.score=0
    }
    start(){
        this.targets = document.getElementById("targets").value 
        menu.remove()
        const spawnObjective = setInterval(()=>{
            if(this.counter < this.targets) {
                const newObjective = new Objectives();
                this.counter ++
            }
            else{
                clearInterval(spawnObjective);
                displayScore(this.score,this.targets);
            }
        },2000)
    }
}

class Objectives {
    constructor(){
        const bodyDiv = document.getElementById('board')
        const boardWidth = bodyDiv.style.width
        const boardHeight = bodyDiv.style.height
        console.log(boardHeight)
        this.positionX = Math.round(Math.random()*200)
        this.positionY = Math.round(Math.random()*100)
        this.createObjective();
        this.eventListeners();
        this.removingObjective();
        this.nohit=true;
    }
    createObjective(){
        this.objective = document.createElement('div');
        this.objective.setAttribute("class","objectives");
        this.objective.setAttribute('style', `left:${this.positionX}vh; bottom:${this.positionY}vh`)
        this.boardElm = document.getElementById("board")
        this.boardElm.appendChild(this.objective);
    }    

    removingObjective(){
        const remove = setInterval(() => {
            this.objective.remove();
            this.nohit=true;
        }, 2000);
    }
        
    eventListeners(){
        this.objective.addEventListener("click",()=>{
            if(this.nohit){
                this.nohit=false;
                this.objective.classList.add("objectiveHit")
                game.score ++;
            }
        })
    }
    
}
function displayScore(score,targets){
    score_block = document.createElement("div")
    score_block.className="menu"
    score_block.innerHTML=`YOUR SCORE IS <br> ${score}/${targets}<br><button onclick="location.reload()">PLAY AGAIN</button>`
    document.body.appendChild(score_block)
}


const start_btn = document.getElementById("play");
const menu = document.getElementsByClassName("menu")[0];
start_btn.addEventListener('click', () => game.start());
const game = new Game();
