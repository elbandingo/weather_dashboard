//declare all variables for DOM manipulation
var inputValueEl = document.querySelector("#inputValue");
var cityNameEl = document.querySelector("#city-location");
var cityTempEl = document.querySelector("#city-temp");
var cityWindEl = document.querySelector("#city-wind");
var cityHumidityEl = document.querySelector("#city-humidity");
var cityUvEl = document.querySelector("#city-uv");
var buttonEl = document.querySelector("#search-btn");

//create button handler when submit is clicked and set values
buttonEl.addEventListener("click", function(e){
    e.preventDefault();
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
        //if the response is good, parse it to JSON, and send the data through
        if(response.ok) {
            response.json().then(function(data){
                var currTemp = data.main.temp;
                var currWind = data.wind.speed;
                console.log(currTemp, currWind);
            })
        } else {
            alert("no city found!");
        }
    })
}
