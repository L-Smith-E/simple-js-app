//TODO: Implement Feed back from 1.8 Code Review

//IIFE to create pokemon repository
let tallestHeight = 0.5;
let label = " - Wow, that’s big!";
let dialogPromiseReject;
let pokemonRepo = (function () {
  let apiURL = "https://pokeapi.co/api/v2/pokemon/?limit=20";
  let pokemonList = [];

  function add(pokemon) {
    //const requiredkeys = ["name", "height", "types"];
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsUrl" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.warn(
        "Invalid pokemon object. Please provide an object with 'name', 'height', and 'types' properties."
      );
    }
  }

  function getAll() {
    return pokemonList;
  }

  function findByName(pokemon) {
    return pokemonList.filter(
      (pokemon) => pokemon.name.toLowerCase() === pokemon.toLowerCase()
    );
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(
        pokemon.name,
        pokemon.name + " Height: " + pokemon.height,
        pokemon.imageUrl
      );

      console.log(pokemon.name + " clicked!");
    });
  }

  function addListItem(pokemon) {
    let list = $(".pokemon-list");
    let button = $(
      '<button type="button" class="btn btn-outline-dark" data-toggle="modal" data-target="#modal-container"></button>'
    );
    let img = $(
      '<div class="text-right"> <img src="' +
        pokemon.imageUrl +
        '" alt= "' +
        pokemon.name +
        '"> </div>'
    );
    let listItem = $('<li class="list-group-item"></li>');

    button.text(pokemon.name);
    listItem.append(button);
    list.append(listItem);
    listItem.append(img);

    button.on("click", function () {
      showDetails(pokemon);
    });
  }

  function loadlist() {
    showLoadingMessage();
    return fetch(apiURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        hideLoadingMessage();
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            height: 0,
            detailsUrl: item.url,
          };
          add(pokemon);
          console.log(pokemon);
        });
      })
      .catch(function (e) {
        hideLoadingMessage();
        console.error(e);
      });
  }

  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        hideLoadingMessage();
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        hideLoadingMessage();
        console.error(e);
      });
  }

  function showLoadingMessage() {
    if (!$("loading-message")) {
      let loadingMessage = document.addClass("p");
      loadingMessage.id = "loading-message";
      loadingMessage.innerText = "Loading...";
      document.body.appendChild(loadingMessage);
    }
  }

  function hideLoadingMessage() {
    let loadingMessage = $("loading-message");
    if (loadingMessage && loadingMessage.parentNode) {
      loadingMessage.parentNode.removeChild(loadingMessage);
    }
  }

  function hideModal() {
    let modalContainer = $("#modal-container");
    modalContainer.removeClass("is-visible");

    if (dialogPromiseReject) {
      dialogPromiseReject();
      dialogPromiseReject = null;
    }
  }

  function showModal(title, text, img) {
    body = $(".modal-body");
    body.empty();

    $(".modal-title").text(title);
    //$('.modal-body').html('<p>' + text + '</p>');
    body.append('<div class="text-center"> <p>' + text + "</p> </div>");
    body.append(
      '<div class="text-center"> <img src="' +
        img +
        '" alt="' +
        title +
        '"> </div>'
    );
  }

  window.addEventListener("keydown", (e) => {
    let modalContainer = "#modal-container";
    //showDetails(pokemon);
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
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

pokemonRepo
  .loadlist()
  .then(function () {
    // Load details for all Pokémon first
    let pokemonList = pokemonRepo.getAll();
    let detailPromises = pokemonList.map(function (pokemon) {
      return pokemonRepo.loadDetails(pokemon);
    });

    // Wait for all details to load
    return Promise.all(detailPromises);
  })
  .then(function () {
    // NOW render the list after all details are loaded
    pokemonRepo.getAll().forEach(function (pokemon) {
      pokemonRepo.addListItem(pokemon);
    });
  });
