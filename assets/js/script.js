
// Waits to load DOM
$(function () {

    $("#submit").click(function (e) {
        let input = $("input")
        e.preventDefault();
        let searchRequest = input.val()
        console.log(searchRequest)
        getLocation()
    })

    function displayResponse(response) {
        const responseContainer = document.querySelector('#response-container');
        responseContainer.textContent = response;
    }

    // get user location 
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(storePosition);
        } else if (navigator.geolocation == "") {
            // replace this with error Modal
            alert("Geolocation is not supported by this browser.");
            setTimeout(location.reload(), 5000)

        }
    }

    function storePosition(position) {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        console.log(lat, lon)
    }

//get recipe info
//NOTE: Must first request temporary access from the demo server-- see console to gain access
    const appId = "ab033eef";
    const appKey = "0949c8863c9896ad2df59beb0142e2bc";
    
    $(document).ready(function() {
      $("#submit").click(function() {
          var searchTerm = $("#search-input").val();
          console.log(searchTerm)
          if (searchTerm) {
            var proxy = "https://cors-anywhere.herokuapp.com/";
            var apiUrl = "https://api.edamam.com/search?q=" + searchTerm + "&app_id=" + appId + "&app_key=" + appKey;
            
            $.ajax({
                url: proxy + apiUrl,
                method: "GET",
                success: function(data) {
                    console.log(data);
                    // process the data to display the recipes information
                },
                error: function(error) {
                    console.log(error);
                }
            });
          } else {
            console.error("No search term entered");
          }
      });
    });
//get recipe image
    const recipeImg = document.getElementById('recipe-img');
    const searchButton = document.getElementById('search-button');

    
    searchButton.addEventListener('click', async () => {
        const searchInput = document.getElementById('search-input').value;
        const response = await fetch(`https://api.edamam.com/search?q=${searchInput}&app_id=${appId}&app_key=${appKey}`);
        const data = await response.json();
        const recipe = data.hits[0].recipe;
        recipeImg.src = recipe.image;
        recipeImg.alt = recipe.label;
        searchButton.innerHTML = `<a href="${recipe.url}" target="_blank">View Recipe</a>`;
      });
























































































})

