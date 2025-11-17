//IIFE to create pokemon repository
let tallestHeight = 0.5;
let label = " - Wow, that’s big!";
let pokemonRepo = (function () {
let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let pokemonList = [
  //   {
  //   "name": "Eevee",
  //   "types": ["Grass", "Poison"],
  //   "height": 0.3
  // },
  // {
  //   "name": "Charmander",
  //   "types": ["Fire"],
  //   "height": 0.6
  // },
  // {
  //   "name": "Torchic",
  //   "types": ["Fire"],
  //   "height": 0.4
  // },  
  // {
  //   "name": "Squirtle",
  //   "types": ["Water"], 
  //   "height": 0.5
  // },
  // {
  //   "name": "Pikachu",
  //   "types": ["Electric"],
  //   "height": 0.4
  // }
  ];

  function add(pokemon) {
  //const requiredkeys = ["name", "height", "types"];
  if (typeof pokemon === "object" && 
    "name" in pokemon &&
    "detailsUrl" in pokemon
  ) {
    pokemonList.push(pokemon);
  }
  else {
    console.warn("Invalid pokemon object. Please provide an object with 'name', 'height', and 'types' properties.");
  }
  // const hasAllkeys = requiredkeys.every(key =>pokemon.hasOwnProperty(key));
  //   if ((typeof pokemon === "object" && hasAllkeys) /*&& Object.keys(pokemon).includes("name") && Object.keys(pokemon).includes("height")*/) {
  //   pokemonList.push(pokemon);
  //   } 
  //   else
  //   {
  //     console.warn("Invalid pokemon object. Please provide an object with 'name', 'height', and 'types' properties.");
  //   }
  }   

  function getAll() {
    return pokemonList;
  }

  function findByName(pokemon) {
    return pokemonList.filter(pokemon => pokemon.name.toLowerCase() === pokemon.toLowerCase());
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
    console.log(pokemon.name + " clicked!");
    });
  }

  function addListItem(pokemon) {
  let list = document.querySelector('.pokemon-list');
  let button = document.createElement('button');
  let listItem = document.createElement('li');


  button.classList.add('pokemon-button');
  listItem.appendChild(button);
  list.appendChild(listItem);

  button.addEventListener('click', function() {
  showDetails(pokemon);
  });

  //conditional
  if (pokemon.height > tallestHeight) {
    
    //listItem.innerText = pokemon.name; 
    button.innerText = pokemon.name + " (height: " + pokemon.height + ")" + label;
    //document.write(pokemon.name + " (height: " + pokemon.height + ")" + label + "<br><br>");
  } else {
    //listItem.innerText = pokemon.name;
    button.innerText = pokemon.name + " (height: " + pokemon.height + ")";
    //document.write(pokemon.name + " (height: " + pokemon.height + ")" + "<br><br>");
    }
  }

 function loadlist() {
  showLoadingMessage();
    return fetch(apiURL).then(function (response) {
      return response.json();
    }).then(function (json) {
      hideLoadingMessage();
      json.results.forEach(function (item) {
        let pokemon = {     
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        console.log(pokemon);
      });
    }).catch(function (e) { 
      hideLoadingMessage(); 
      console.error(e); 
    });
  }

   function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      hideLoadingMessage();
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      hideLoadingMessage();
      console.error(e);
    });
  }

  function showLoadingMessage() {
    let loadingMessage = document.createElement('p');
    loadingMessage.innerText = 'Loading...';
    document.body.appendChild(loadingMessage);
  }

  function hideLoadingMessage() {
    let loadingMessage = document.querySelector('p');
    if (loadingMessage) {
      document.body.removeChild(loadingMessage);
    } 
  }


  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    findByName: findByName,
    showDetails: showDetails,
    loadlist: loadlist,
    loadDetails: loadDetails,
  };
})();

pokemonRepo.loadlist().then(function() {
  // Now the data is loaded
//Looping through the array of objects
pokemonRepo.getAll().forEach(function(pokemon){ 
  //calling addListItem function
    pokemonRepo.addListItem(pokemon);
});

});