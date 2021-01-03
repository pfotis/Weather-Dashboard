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
        var  uviURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + forcastData.city.coord.lat + "&lon=" + forcastData.city.coord.lon + "&exclude=hourly,daily&appid=" + key;
        $.ajax({
            url: uviURL,
            method: "GET"
        }).then(function(response) {
            var uviData = response;

            console.log(forcastData);
            $("#weatherToday").css("border","1px solid black");
            var cityH2 = $("<h2>");
            var date = (forcastData.list[4].dt_txt).split(" ");
           
            console.log(date[0]);
            cityH2.text(forcastData.city.name + " "+ "(" + date[0] + ")");
            $("#weatherToday").empty().append(cityH2);
            //var image = "/assets/images/icons/" + forcastData.list[4].weather[0].icon + ".png";               
            space();

            var tempDiv = $("<div>");
            tempDiv.text("Temperature:"+forcastData.list[4].main.temp+"F");
            $("#weatherToday").append(tempDiv);
            space();

            var humDiv = $("<div>");
            humDiv.text("Humidity:"+forcastData.list[4].main.humidity+"%");
            $("#weatherToday").append(humDiv);
            space();

            var windDiv = $("<div>");
            windDiv.text("Wind Speed:"+forcastData.list[4].wind.speed+" MPH");
            $("#weatherToday").append(windDiv);
            space();



            var uviLabel = $("<div>");
            uviLabel.addClass("label");
            uviLabel.text("UV Index:");
            $("#weatherToday").append(uviLabel);
            var uviDiv = $("<div>");
            if(uviData.current.uvi < 2){
                uviDiv.addClass("green");
            }
            else if(uviData.current.uvi>2 && uviData.current.uvi < 5){
                uviDiv.addClass("yellow");
            }
            else if(uviData.current.uvi>5 && uviData.current.uvi < 7){
                uviDiv.addClass("orange");
            }
            else if(uviData.current.uvi>7 && uviData.current.uvi < 10){
                uviDiv.addClass("red");
            }else if(uviData.current.uvi>10){
                uviDiv.addClass("purple");
            }
            
            uviDiv.text(uviData.current.uvi);
           
            $("#weatherToday").append(uviDiv);
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

function space(){
    var spaceBr = $("<br>");
    $("#weatherToday").append(spaceBr);
}

function attachImage(icon){
    
}