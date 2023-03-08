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
    addScore(){
        this.score ++;
        console.log(this.score)
    }

}

class Objectives {
    constructor(){
        this.positionX = Math.round(Math.random()*200)-5
        this.positionY = Math.round(Math.random()*100)-5
        this.createObjective();
        this.eventListeners();
        this.removingObjective();
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
        }, 2000);
    }
        
    eventListeners(){
        this.objective.addEventListener("click",e=>{
            this.objective.setAttribute("class", "objectiveHit")
            game.addScore();
        })
    }
    
}
function displayScore(score,targets){
    score_block = document.createElement("div")
    score_block.className="menu"
    score_block.innerHTML=`YOUR SCORE IS <br> ${score}/${targets}`
    document.body.appendChild(score_block)
}


const start_btn = document.getElementById("play");
const menu = document.getElementsByClassName("menu")[0];
start_btn.addEventListener('click', () => game.start());
const game = new Game();
