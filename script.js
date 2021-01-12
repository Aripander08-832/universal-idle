let game = {
  tLast: Date.now(),
  atoms: new Decimal(10),
  size: new Decimal(1),
  generator: [null, new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
  generatorBought: [null, new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
  notation: 0,
  achievement: [],
}

moveTab1()
loadGame(JSON.parse(localStorage.getItem("universal-idle")))


let deltaTime;
const calculate = window.setInterval(() => {
  deltaTime = Date.now() - game.tLast;
  loop(20);
  game.tLast = Date.now()
}, 20);

function loop(ms){
  updateGenerator(ms)
  updateSize(ms)
  
  document.getElementById("atom").innerHTML = formate(game.atoms, 2)
  document.getElementById("atomSpeed").innerHTML = formate(getGeneratorSpeed(1), 2)
  
  document.getElementById("size").innerHTML = formate(game.size, 2)
  document.getElementById("sizeSpeed").innerHTML = formate(getSizeSpeed(), 2)
  document.getElementById("sizeBoost").innerHTML = formate(getSizeBoost(), 3)
  
  for (let i=1; i<8.5; i++){
    document.getElementById("gen" + i + "Bought").innerHTML = formate(game.generatorBought[i], 0)
    document.getElementById("gen" + i + "Amount").innerHTML = formate(game.generator[i], 0)
    document.getElementById("gen" + i + "Speed").innerHTML = formate(getGeneratorSpeed(i+1), 0)
    document.getElementById("gen" + i + "Multi").innerHTML = formate(getGeneratorMulti(i), 2)
    document.getElementById("gen" + i + "Cost").innerHTML = formate(getGeneratorCost(i), 0)
  }
  
  document.getElementById("title").innerHTML = formate(game.atoms) + " atoms, " + formate(game.size) + " meters"
  document.getElementById("notation").innerHTML = "Notation: " + (game.notation == 0 ? "Scientific " : "Standard I" + (game.notation >= 2 ? (game.notation >= 3 ? "II " : "I ") : " ")) + "(Scientific Notation start at 1e" + (3 * 10 ** game.notation + 3) + ")"
  
  document.getElementById("achieveTotal").textContent = game.achievement.length.toLocaleString()
  
  document.getElementById("postgen8_1").style.display = (game.achievement.includes(18) ? "block" : "none")
  document.getElementById("postgen8_2").style.display = (game.achievement.includes(18) ? "block" : "none")
  document.getElementById("postgen8_3").style.display = (game.achievement.includes(18) ? "block" : "none")
  
  document.getElementById("t2").style.display = ((game.atoms.gte(1e80) && game.size.gte(8.8e26)) || game.achievement.includes(21) ? "inline-block" : "none")
  
  updateAchievement()
  getAchievement()
}