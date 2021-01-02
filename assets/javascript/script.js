var key = "65288d77b29b169fdd8cf60a7f46c61d";
var placesArray = [];

var localSave = localStorage.getItem("Weather-Cities");
if(localSave !=null){
    placesArray = JSON.parse(localSave);
    for(var i=0;i<placesArray.length;i++){
        listOfPlaces(placesArray[i]);
    }
}

$("#search-button").on("click", function(event) {
    event.preventDefault();
    var inputElement = $("#city-input").val().trim();
    placesArray.push(inputElement);
    localStorage.setItem("Weather-Cities", JSON.stringify(placesArray));
    listOfPlaces(inputElement);
    getDataOfWeather(inputElement);
});

$(document).on("click", ".cityID",function(event){
    var oldCity = $(this).attr("nameCity");
    getDataOfWeather(oldCity);
});

function getDataOfWeather(place){
    var  forcastURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + place + "&appid=" + key;
    $.ajax({
        url: forcastURL,
        method: "GET"
    }).then(function(response) {
        var forcastData = response;
        console.log(forcastData);
        var  uviURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + forcastData.city.coord.lat + "&lon=" + forcastData.city.coord.lon + "&exclude=hourly,daily&appid=" + key;
        $.ajax({
            url: uviURL,
            method: "GET"
        }).then(function(response) {
        var uviData = response;
        console.log(uviData);
        });
    });
    
   
}

function listOfPlaces(city) {
    var divCity = $("<div>");
    var buttonCity = $("<button>");
    buttonCity.addClass("cityID");
    buttonCity.attr("nameCity", city);
    buttonCity.text(city);
    $("#listOfCities").append(divCity);
    divCity.append(buttonCity);
}