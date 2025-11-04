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
    if ((typeof pokemon === "object") /*&& Object.keys(pokemon).includes("name") && Object.keys(pokemon).includes("height")*/) {
    pokemonList.push(pokemon);
    } 
  }   
  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll,
    
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
  //conditional
  if (pokemon.height > tallestHeight) {
    document.write(pokemon.name + " (height: " + pokemon.height + ")" + label + "<br><br>");
  } else {
    document.write(pokemon.name + " (height: " + pokemon.height + ")" + "<br><br>");
  }
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