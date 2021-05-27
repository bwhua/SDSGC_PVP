function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function makeRandomTeam(team){
  let characterPool = JSON.parse(localStorage.getItem("validCharacters"))
  let characters = Object.keys(characterPool)
  let random = shuffle(characters)

  if(random.length < 4){alert("Make sure your team has 4 characters")}
  else{
    for(let i = 0; i < 4; i++){
      displayCharacter(team, 'c' + i, random[i])
    }
    return random
  }
}

function displayCharacter(team, charPosition, character){
  let charPool = JSON.parse(localStorage.getItem("validCharacters"))

  let charCard = document.getElementById(team + charPosition)
  let img = document.createElement("img")
  img.src = charPool[character]["Image"]
  img.width = 100
  img.height = 100

  let name = document.createElement("p")
  name.innerHTML = character
  charCard.appendChild(img)
  charCard.appendChild(name)
}

function reset(team){
  if(team=="all"){
    reset("t1")
    reset("t2")
  }else{
    for(let i = 0; i < 4; i++){
      document.getElementById(team + 'c' + i).innerHTML = ""
    }
  }
}

function randTeam(team){
  reset(team)
  let charPool = makeRandomTeam(team)
  localStorage.setItem(team + "Pool", JSON.stringify(charPool.slice(4, charPool.length - 1)))
}

function reroll(id, team){
  let charIndex = document.getElementById(id).value
  if (charIndex == "None"){return}
  document.getElementById(team + 'c' + charIndex).innerHTML = ""
  let pool = JSON.parse(localStorage.getItem(team + "Pool"))
  displayCharacter(team, 'c' + charIndex, pool[0])
  localStorage.setItem(team + "Pool", JSON.stringify(pool.slice(1, pool.length - 1)))
  document.getElementById(id).selectedIndex = 0
}
