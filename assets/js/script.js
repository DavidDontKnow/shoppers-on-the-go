
// Waits to load DOM
$(function () {


    //get recipe info
    //NOTE: Must first request temporary access from the demo server-- see console to gain access
    const appId = "ab033eef";
    const appKey = "0949c8863c9896ad2df59beb0142e2bc";

    $(document).ready(function () {
        $("#submit").click(function () {
            var searchTerm = $("#search-input").val();
            console.log(searchTerm)
            if (searchTerm) {
                var proxy = "https://cors-anywhere.herokuapp.com/";
                var apiUrl = "https://api.edamam.com/search?q=" + searchTerm + "&app_id=" + appId + "&app_key=" + appKey;

                $.ajax({
                    url: proxy + apiUrl,
                    method: "GET",
                    success: function (data) {
                        console.log(data);
                        // process the data to display the recipes information
                        displayInfo(data)
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });
            } else {
                console.error("No search term entered");
            }
        });
    });


    function displayInfo(data) {
        const recipeImg = document.getElementById('recipe-img');
        const searchButton = document.getElementById('search-button');

        const recipe = data.hits[0].recipe;
        recipeImg.src = recipe.image;
        recipeImg.alt = recipe.label;
        searchButton.innerHTML = `<a href="${recipe.url}" target="_blank">View Recipe</a>`;
    }
























































































})

