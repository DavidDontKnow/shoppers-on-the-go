
// Waits to load DOM
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

