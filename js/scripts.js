//Array of pokemon objects
pokemonList = [
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
]
//Setting the height threshold and label
let tallestHeight = 0.5;
let label = " - Wow, that’s big!";

//Looping through the array of objects
for (let i = 0; i < pokemonList.length; i++) {
//conditional
   if (pokemonList[i].height > tallestHeight)
  {
    document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ")" + label + "<br><br>");
  }
  else
    document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ")" + "<br><br>");
}