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
      character = document.getElementById(team + 'c' + i)

      let img = document.createElement("img")
      img.src = characterPool[random[i]]["Image"]
      img.width = 100
      img.height = 100

      let name = document.createElement("p")
      name.innerHTML = random[i]
      character.appendChild(img)
      character.appendChild(name)
    }
  }
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

function randomT1(){
  reset('t1')
  makeRandomTeam('t1')
}
function randomT2(){
  reset('t2')
  makeRandomTeam('t2')
}
