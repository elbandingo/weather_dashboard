//declare all variables for DOM manipulation
var inputValueEl = document.querySelector("#inputValue");
var cityNameEl = document.querySelector("#city-location");
var cityTempEl = document.querySelector("#city-temp");
var cityWindEl = document.querySelector("#city-wind");
var cityHumidityEl = document.querySelector("#city-humidity");
var cityUvEl = document.querySelector("#city-uv");
var buttonEl = document.querySelector("#search-btn");

//create button handler when submit is clicked and set values
buttonEl.addEventListener("click", function(){
    var cityLocation = inputValueEl.value.trim();
    console.log("city name: " + cityLocation);
    if (cityLocation) {
        getWeatherData(cityLocation);
    } else {
        alert("please enter a city!");
    }

});


//when button is clicked, run API fetch to gather data passing through the city from the event listener
var getWeatherData = function(city){
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&appid=7bd6e4e882f11d63bf4270470fe9d78a';
    
    //make the fetch request
    fetch(apiUrl).then(function(response){
        //if the response is good, parse it to JSON, and send the data through to 2 separate functions. 1 for main card, the other for the 5 day forecast
        if(response.ok) {
            response.json().then(function(data){
                //set the initial variables for future display
                var currLocation = data.name;
                var currTemp = data.main.temp;
                var currWind = data.wind.speed;
                var currHum = data.main.humidity;
                //capture the Lat and Lon values for another API call to get the UVI as its not included on the regular weather api
                var uvLat = data.coord.lat;
                var uvLon = data.coord.lon;
                //var currUv = data.main.uvi;
                console.log(currLocation, currTemp, currWind, currHum, uvLat, uvLon);
                displayMainStats(currLocation,currTemp,currWind,currHum,uvLat,uvLon);
            })
        } else {
            alert("no city found!");
        }
    });
}

var displayMainStats = function(name,temp,wind,humidity,uvLat,uvLon){
    var uviUrl = 'http://api.openweathermap.org/data/2.5/onecall?lat='+ uvLat + '&lon='+ uvLon + '&dt=1586468027&appid=7bd6e4e882f11d63bf4270470fe9d78a';
    fetch(uviUrl).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                var currUvi = data.current.uvi;
                console.log("found lat and lon " + uvLat + uvLon);
                
                if(currUvi >= 7){
                    cityUvEl.classList = "badge bg-danger";
                    cityUvEl.textContent = currUvi;
                }

                else if(currUvi < 7 && currUvi > 2) {
                    cityUvEl.classList = "badge bg-warning";
                    cityUvEl.textContent = currUvi;

                } 
                else {
                    cityUvEl.classList = "badge bg-success";
                    cityUvEl.textContent = currUvi;
                } 
            })
        }
    })

    cityNameEl.textContent = name + " (" + moment().format("MM/DD/YYYY") + ")";
    cityTempEl.textContent = temp + " °C";
    cityWindEl.textContent = wind + " Km/H";
    cityHumidityEl.textContent = humidity + " %";
    inputValueEl.value = "";

}