function selectRace(){
  let race = document.getElementById('race')
  localStorage.setItem("race", race.value)
  displayCharacterPool()
}
function selectColor(){
  let race = document.getElementById('color')
  localStorage.setItem("color", color.value)
  displayCharacterPool()
}
function selectGrade(){
  let race = document.getElementById('grade')
  localStorage.setItem("grade", grade.value)
  displayCharacterPool()
}
function resetQuery(){
  localStorage.setItem("race", "All")
  localStorage.setItem("grade", "All")
  localStorage.setItem("color", "All")
}

function readJson(){
  resetQuery()
  let text = undefined;
  fetch("./characters.json")
  .then(response => {
     return response.json();
  })
  .then(data => {
    localStorage.setItem("characters", JSON.stringify(data))
  });
  displayCharacterPool()
}

function filterAttributes(characters, attribute, key){
  if (attribute == "All"){} // do nothing
  else{
    for (let character in characters){
      if (characters[character][key] != attribute){
        delete characters[character]
      }
    }
  }
  return characters
}
function getCharacterPool(){
  let race = localStorage.getItem("race")
  let grade = localStorage.getItem("grade")
  let color = localStorage.getItem("color")
  let characters = JSON.parse(localStorage.getItem("characters"))
  // get valid race
  let validCharacters = {}
  if (race == "All"){
    for (let race in characters) {
      for (let character in characters[race]) {
        validCharacters[character] = characters[race][character]
      }
    }
  } else {
    for (let character in characters[race]) {
      validCharacters[character] = characters[race][character]
    }
  }
  // get valid characters grade and color
  validCharacters = filterAttributes(validCharacters, grade, 'Rarity')
  return filterAttributes(validCharacters, color, 'Color')
}

function displayCharacterPool(){
  let valid = getCharacterPool()
  let rowlength = 5
  let charCount = Object.keys(valid).length
  let display = document.getElementById('characterDisplay')
  display.innerHTML = ""


  let i = 0
  let row = document.createElement("div")
  row.className += ' parent'
  for (let key in valid){
    // console.log(valid[key]["Image"]);
    let column = document.createElement("div")
    column.className = "column parent"

    let img = document.createElement("img")

    img.src = valid[key]["Image"]
    img.width = 100
    img.height = 100

    let name = document.createElement("p")
    name.innerHTML = key

    column.appendChild(img)
    column.appendChild(name)
    column.appendChild(name)
    column.appendChild(name)
    row.appendChild(column)
    i++
    if(i == rowlength){
      row = document.createElement("div")
      row.className = "row"
      row.appendChild(column)
      display.appendChild(row)
      i = 0
    }
  }
  console.log(display.children);
  // for (let character in valid){
  //   console.log(character);
  // }
}
