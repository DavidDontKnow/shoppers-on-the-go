// load map call back from script tag
function initMap() {
    // get user location 
    document.getElementById("submit").addEventListener("click", function () {
        navigator.geolocation.getCurrentPosition(function (position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            // init the map service ans store in a var 
            var service = new google.maps.places.PlacesService(document.createElement('div'));
            // call the api using service var and nearbySearch()
            service.nearbySearch({
                // parameters
                location: { lat, lng: lng },
                type: 'grocery_or_supermarket',
                rankBy: google.maps.places.RankBy.DISTANCE,
                openNow: true,
            }, function (results, status) {
                // if good load then store into an array 
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    var groceryStores = [];
                    for (var i = 0; i < results.length; i++) {
                        groceryStores.push(results[i]);
                    }
                    console.log(groceryStores)
                    // pass to function to append to html 
                    displayGroceryStores(groceryStores);
                }
            });
        });
    });
}

// loop through stores array 
function displayGroceryStores(stores) {
    var list = document.getElementById("store-list");
    list.innerHTML = "";
    for (var i = 0; i < stores.length; i++) {
        var store = stores[i];
        var li = document.createElement("li");
        li.innerHTML = store.name + " - " + store.vicinity;
        list.appendChild(li);
    }
}

$(function () {

    $("#submit").click(function (e) {
        let input = $("input")
        e.preventDefault();
        let searchRequest = input.val()
        console.log(searchRequest)
    })

    function displayResponse(response) {
        const responseContainer = document.querySelector('#response-container');
        responseContainer.textContent = response;
    }






































































































})

