
class Objectives {
    constructor(){
        this.positionX = Math.round(Math.random()*200)
        this.positionY = Math.round(Math.random()*100)
        this.createObjective();
    }
    createObjective(){
        this.objectiveSpawn = document.createElement('div');
        this.objectiveSpawn.setAttribute("class","objectives");
        this.objectiveSpawn.setAttribute('style', `left:${this.positionX}vh; bottom:${this.positionY}vh`)
        this.boardElm = document.getElementById("board")
        this.boardElm.appendChild(this.objectiveSpawn);
    }
}
const allObjectives = []
const spawnObjective = setInterval(()=>{
    const newObjective = new Objectives();
    allObjectives.push(newObjective)
},2000)


objectiveSpawn.addEventListener("click",e=>{
    console.log('hola');
})
