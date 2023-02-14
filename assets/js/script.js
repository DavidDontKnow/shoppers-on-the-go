// function initMap() {
//   // get user location 
//   document.getElementById("submit").addEventListener("click", function () {
//     navigator.geolocation.getCurrentPosition(function (position) {
//       var lat = position.coords.latitude;
//       var lng = position.coords.longitude;
//       // init the map service ans store in a var 
//       var service = new google.maps.places.PlacesService(document.createElement('div'));
//       // call the api using service var and nearbySearch()
//       service.nearbySearch({
//         // parameters
//         location: { lat, lng: lng },
//         type: 'grocery_or_supermarket',
//         rankBy: google.maps.places.RankBy.DISTANCE,
//         openNow: true,
//       }, function (results, status) {
//         // if good load then store into an array 
//         if (status === google.maps.places.PlacesServiceStatus.OK) {
//           var groceryStores = [];
//           for (var i = 0; i < results.length; i++) {
//             groceryStores.push(results[i]);
//           }
//           console.log(groceryStores)
//           // pass to function to append to html 
//           displayGroceryStores(groceryStores);
//         }
//       });
//     });
//   });
// }

// // loop through stores array 
// function displayGroceryStores(stores) {
//   var list = document.getElementById("store-list");
//   list.innerHTML = "";
//   for (var i = 0; i < stores.length; i++) {
//     var store = stores[i];
//     var li = document.createElement("li");
//     li.innerHTML = store.name + " - " + store.vicinity;
//     li.setAttribute("class", "has-text-centered py-2")
//     list.appendChild(li);
//   }
// }

$(function () {

  showPrevious()

  //get recipe info
  //NOTE: Must first request temporary access from the demo server-- see console to gain access
  const appId = "ab033eef";
  const appKey = "0949c8863c9896ad2df59beb0142e2bc";
  // search event listener
  $(document).ready(function () {
    $("#submit").click(function () {
      var searchTerm = $("#search-input").val();

      if (searchTerm) {
        var proxy = "https://cors-anywhere.herokuapp.com/";
        var apiUrl =
          "https://api.edamam.com/search?q=" +
          searchTerm +
          "&app_id=" +
          appId +
          "&app_key=" +
          appKey;

        $.ajax({
          url: proxy + apiUrl,
          method: "GET",
          success: function (data) {
            console.log(data);
            // process the data to display the recipes information
            displayInfo(data);
            window.localStorage.setItem("lastSearch", JSON.stringify(data))
          },
          error: function (error) {
            console.log(error);
          },
        });
      } else {
        // adds class to display error modal
        console.error("No search term entered");
        var noInput = $("#no-input-modal")
        noInput.attr("class", "is-active")
      }
    });
  });

  function displayInfo(data) {
    const recipeImg = document.getElementById("recipe-img");
    const searchButton = document.getElementById("search-button");

    const recipe = data.hits[0].recipe;
    recipeImg.src = recipe.image;
    recipeImg.alt = recipe.label;
    searchButton.innerHTML = `<a href="${recipe.url}" target="_blank">View Recipe</a>`;
    renderList(recipe.ingredientLines);
  }

  //var ingredients = ["onions", "pickles", "tomato juice"];

  function renderList(ingredientsList) {
    var food = document.getElementById("food");
    food.innerHTML = '';

    for (let i = 0; i < ingredientsList.length; i++) {
      var li = document.createElement("li");
      li.textContent = ingredientsList[i];
      li.classList.add('colum');
      food.append(li);
    }
  }

  //renderList(ingredients);


  $(".modal-close").click(function (e) {
    var modal = $(e.target).parent();
    modal.removeAttr("class")
    modal.attr("class", "modal")
  })


  function showPrevious() {
    if (window.localStorage.getItem("lastSearch") === null) {
      return
    } else {
      var data = JSON.parse(window.localStorage.getItem("lastSearch"))
      displayInfo(data)
    }
  }











});
