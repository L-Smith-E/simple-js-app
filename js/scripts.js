//IIFE to create pokemon repository

let pokemonRepo = (function () {

  let pokemonList = [
    {
    "name": "Eevee",
    "types": ["Grass", "Poison"],
    "height": 0.3
  },
  {
    "name": "Charmander",
    "types": ["Fire"],
    "height": 0.6
  },
  {
    "name": "Torchic",
    "types": ["Fire"],
    "height": 0.4
  },  
  {
    "name": "Squirtle",
    "types": ["Water"], 
    "height": 0.5
  },
  {
    "name": "Pikachu",
    "types": ["Electric"],
    "height": 0.4
  }
  ];

  

  function add(pokemon) {
  const requiredkeys = ["name", "height", "types"];
  const hasAllkeys = requiredkeys.every(key =>pokemon.hasOwnProperty(key));
    if ((typeof pokemon === "object" && hasAllkeys) /*&& Object.keys(pokemon).includes("name") && Object.keys(pokemon).includes("height")*/) {
    pokemonList.push(pokemon);
    } 
    else
    {
      console.warn("Invalid pokemon object. Please provide an object with 'name', 'height', and 'types' properties.");
    }
  }   
  function getAll() {
    return pokemonList;
  }

  function findByName(pokemon) {
    return pokemonList.filter(pokemon => pokemon.name.toLowerCase() === name.toLowerCase());
  }

  function addListItem(pokemon) {
  let list = document.querySelector('.pokemon-list');
  let button = document.createElement('button');
  //conditional
  if (pokemon.height > tallestHeight) {
    let listItem = document.createElement('li');
    //listItem.innerText = pokemon.name; 
    button.innerText = pokemon.name + " (height: " + pokemon.height + ")" + label;
    button.classList.add('pokemon-button');
    listItem.appendChild(button);
    list.appendChild(listItem);
    button.addEventListener('click', function() {
      console.log(pokemon.name + " clicked!");
    });
    //document.write(pokemon.name + " (height: " + pokemon.height + ")" + label + "<br><br>");
  } else {
    let listItem = document.createElement('li');
    //listItem.innerText = pokemon.name;
    button.innerText = pokemon.name + " (height: " + pokemon.height + ")";
    button.classList.add('pokemon-button');
    listItem.appendChild(button);
    list.appendChild(listItem);
    button.addEventListener('click', function() {
      console.log(pokemon.name + " clicked!");
    });
    //document.write(pokemon.name + " (height: " + pokemon.height + ")" + "<br><br>");
    }
  }
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
  };
})();
//Array of pokemon objects
// pokemonList = [
//   
// ]
//Setting the height threshold and label

let tallestHeight = 0.5;
let label = " - Wow, that’s big!";
//Looping through the array of objects
pokemonRepo.getAll().forEach(function(pokemon){ 
  //calling addListItem function
    pokemonRepo.addListItem(pokemon);
});





// for (let i = 0; i < pokemonList.length; i++) {
// //conditional
//    if (pokemonList[i].height > tallestHeight)
//   {
//     document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ")" + label + "<br><br>");
//   }
//   else
//     document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ")" + "<br><br>");
// }