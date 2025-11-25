//IIFE to create pokemon repository
let tallestHeight = 0.5;
let label = " - Wow, that’s big!";
let pokemonRepo = (function () {
let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=20';
  let pokemonList = [];

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
      showModal(pokemon.name + " Height: " + pokemon.height);
    console.log(pokemon.name + " clicked!");
    });
  }

  function addListItem(pokemon) {
  let list = document.querySelector('.pokemon-list');
  let button = document.createElement('button');
  let listItem = document.createElement('li');


  button.classList.add('pokemon-button');
  button.innerText = pokemon.name + " (height: " + pokemon.height + ")";
  listItem.classList.add('grid__item');
  listItem.appendChild(button);
  list.appendChild(listItem);

button.addEventListener('click', function() {
showDetails(pokemon);
});

// loadDetails(pokemon).then(function() {
//   //conditional
//   if (pokemon.height > tallestHeight) {
    
//     //listItem.innerText = pokemon.name; 
//     button.innerText = pokemon.name + " (height: " + pokemon.url.height + ")" + label;
//     //document.write(pokemon.name + " (height: " + pokemon.height + ")" + label + "<br><br>");
//   } else {
//     //listItem.innerText = pokemon.name;
//     button.innerText = pokemon.name + " (height: " + pokemon.url.height + ")";
//     //document.write(pokemon.name + " (height: " + pokemon.height + ")" + "<br><br>");
//     }
// });
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
        height: item.height,
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
    if (!document.getElementById('loading-message')) {
      let loadingMessage = document.createElement('p');
      loadingMessage.id = 'loading-message';
      loadingMessage.innerText = 'Loading...';
      document.body.appendChild(loadingMessage);
    }
  }

  function hideLoadingMessage() {
    let loadingMessage = document.getElementById('loading-message');
    if (loadingMessage && loadingMessage.parentNode) {
      loadingMessage.parentNode.removeChild(loadingMessage);
    }
  }

  function showModal(title, text) {
  let modalContainer = document.querySelector('#modal-container');

  // Clear all existing modal content
  modalContainer.innerHTML = '';

  let modal = document.createElement('div');
  modal.classList.add('modal');

  // Add the new modal content
  let closeButtonElement = document.createElement('button');
  closeButtonElement.classList.add('modal-close');
  closeButtonElement.innerText = 'Close';
  closeButtonElement.addEventListener('click', hideModal);

  let titleElement = document.createElement('h1');
  titleElement.innerText = title;

  let contentElement = document.createElement('p');
  contentElement.innerText = text;

  modal.appendChild(closeButtonElement);
  modal.appendChild(titleElement);
  modal.appendChild(contentElement);
  modalContainer.appendChild(modal);

  modalContainer.classList.add('is-visible');

  modalContainer.addEventListener('click', (e) => {
  // Since this is also triggered when clicking INSIDE the modal
  // We only want to close if the user clicks directly on the overlay
  let target = e.target;
  if (target === modalContainer) {
    hideModal();
  }
});
}

function hideModal() {
  let modalContainer = document.querySelector('#modal-container');
  modalContainer.classList.remove('is-visible');
}

window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();  
    }
  });

  document.querySelector('#show-modal').addEventListener('click', () => {
    showModal('Modal title', 'This is the modal content!');
  });

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    findByName: findByName,
    showDetails: showDetails,
    loadlist: loadlist,
    loadDetails: loadDetails,
    showModal: showModal,
    hideModal: hideModal,

  };
})();

pokemonRepo.loadlist().then(function() {
  // Load details for all Pokémon first
  let pokemonList = pokemonRepo.getAll();
  let detailPromises = pokemonList.map(function(pokemon) {
    return pokemonRepo.loadDetails(pokemon);
  });

  // Wait for all details to load
  return Promise.all(detailPromises);
}).then(function() {
  // NOW render the list after all details are loaded
  pokemonRepo.getAll().forEach(function(pokemon) {
    pokemonRepo.addListItem(pokemon);
  });
});
