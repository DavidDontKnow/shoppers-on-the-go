
// Waits to load DOM

var placesService;
var request = {
    query: 'Museum of Contemporary Art Australia',
    fields: ['name', 'geometry'],

};

// var mapEL

function initMap() {

    var map = new google.maps.Map(document.createElement("div"))
    placesService = new google.maps.places.PlacesService(map);
}

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
































































































})

