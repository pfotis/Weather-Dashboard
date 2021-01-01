
$("#search-button").on("click", function(event) {
    event.preventDefault();
    
    
    getDataOfWeather();
});

function getDataOfWeather(){
    var inputElement = $("#city-input").val().trim();
    console.log(inputElement);
    var  queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + inputElement + "&appid=65288d77b29b169fdd8cf60a7f46c61d";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
    console.log(response);
    });
}