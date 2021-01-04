var key = "65288d77b29b169fdd8cf60a7f46c61d";
var placesArray = [];
var daysArray = [9,17,25,33,39];

/* load from loacl storage not if this is the first time the user use the website*/
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

/* puul information from the API*/
function getDataOfWeather(place){
    var  forcastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + place + "&exclude=daily&appid=" + key;
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
        /* display the information at the screen */
            $("#weatherToday").css("border","1px solid black");
            var cityH2 = $("<h2>");
            var date = (forcastData.list[4].dt_txt).split(" ");
            cityH2.text(forcastData.city.name + " "+ "(" + date[0] + ")");
            $("#weatherToday").empty().append(cityH2);
            var image = "./assets/images/icons/" + forcastData.list[4].weather[0].icon + ".png";               
            var imgAttach = $("<img>").attr("src", image);
            cityH2.append(imgAttach);
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

            space();

            var ForcastH2 = $("<h2>");
            ForcastH2.text("5-Day Forcast:");
            $("#forcast").empty().append(ForcastH2);
            space();
            
            for(var i=0; i<daysArray.length; i++){
                
                var blueContainerDiv = $("<div>");
                blueContainerDiv.addClass("blueContainer");
                $("#forcast").append(blueContainerDiv);

                var dateDiv = $("<div>");
                dateDiv.addClass("date");
                date = (forcastData.list[daysArray[i]].dt_txt).split(" ");
                dateDiv.text(date[0]);
                blueContainerDiv.append(dateDiv);

                var image = "./assets/images/icons/" + forcastData.list[daysArray[i]].weather[0].icon + ".png";               
                var imgAttach2 = $("<img>").attr("src", image);
                blueContainerDiv.append(imgAttach2);

                var tempDiv2 = $("<div>");
                tempDiv2.text("Temp:"+forcastData.list[daysArray[i]].main.temp+"F");
                blueContainerDiv.append(tempDiv2);
        
                var humDiv2 = $("<div>");
                humDiv2.text("Humidity:"+forcastData.list[daysArray[i]].main.humidity+"%");
                blueContainerDiv.append(humDiv2);
            }
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
