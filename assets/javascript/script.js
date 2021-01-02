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
    var  queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + place + "&appid=65288d77b29b169fdd8cf60a7f46c61d";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
    console.log(response);
    });
}

function listOfPlaces(city) {
    var divCity = $("<div>");
    var buttonCity = $("<button>");
    buttonCity.addClass("cityID");
    buttonCity.attr("nameCity", city);
    buttonCity.text(city);
    console.log(city);
    $("#listOfCities").append(divCity);
    divCity.append(buttonCity);
}