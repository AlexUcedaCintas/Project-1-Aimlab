class Game{
    constructor(){
        this.counter=0
        this.score=0
        this.targets = document.getElementById("targets").value 
        
    }
    start(){
        this.speed = Number(document.querySelector('input[name="lvl"]:checked').value);
        console.log(this.speed)
        menu.remove()
        const spawnObjective = setInterval(()=>{
            if(this.counter < this.targets) {
                console.log(this.speed)
                const newObjective = new Objectives(this.speed);
                this.counter ++
            }
            else{
                clearInterval(spawnObjective);
                displayScore(this.score,this.targets);
            }
        },this.speed)
    }
}

class Objectives {
    constructor(speed){
        this.positionX = Math.floor(Math.random() * 200 );
        this.positionY = Math.floor(Math.random() * 100 );
        this.createObjective();
        this.eventListeners();
        this.removingObjective();
        this.nohit=true;
        this.speed = speed
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
        },game.speed);
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
tarLabel = document.getElementById("targetLabel");
targets.addEventListener("input",function(){
    tarLabel.innerHTML=targets.value;
})