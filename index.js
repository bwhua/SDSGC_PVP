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
  let grade = document.getElementById('grade')
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
  localStorage.setItem('validCharacters', JSON.stringify(validCharacters))
  return filterAttributes(validCharacters, color, 'Color')
}

function displayCharacterPool(){
  let valid = getCharacterPool()
  let display = document.getElementById('characterDisplay')
  display.innerHTML = ""

  for (let key in valid){
    let card = document.createElement("div")
    card.className = "card charCard"

    let img = document.createElement("img")
    img.classList.add('image')
    img.src = valid[key]["Image"]
    img.width = 100
    img.height = 100

    let name = document.createElement("p")
    name.classList.add('nameTag')

    name.innerHTML = key

    card.appendChild(img)
    card.appendChild(name)
    display.appendChild(card)

    if("Skill 1" in valid[key]){setSkill(valid[key]["Skill 1"])}
    // if("Skill 2" in valid[key]){setSkill(valid[key]["Skill 2"])}
    if("Ultimate" in valid[key]){setUlt(valid[key]["Ultimate"])}

    setUlt(valid[key]["Ultimate"])

    if("Combined Move" in valid[key]){ setComb(valid[key]["Combined Move"])}
    var modal = document.getElementById("myModal");

    // Get the image and insert it inside the modal - use its "alt" text as a caption
    var modalImg = document.getElementById('img01');
    var captionText = document.getElementById("caption");
    card.onclick = function(){
      modal.style.display = "block";
      modalImg.src = img.src;
      captionText.innerHTML = key;
    }

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
    }
    modal.onclick = function() {
      modal.style.display = "none";
    }
    display.appendChild(card)

  }

}

function setSkill(skill){

}
function setUlt(ult){
  null;
}
function setComb(move){
  null;
}
