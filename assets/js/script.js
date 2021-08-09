var userFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#cityName");
var cityName = "Miami";

var formSubmitHandler = function(event) {
  event.preventDefault();
  // get value from input element
  console.log(cityInputEl);
  cityName = cityInputEl.value.trim();

  if (cityName) {
    getWeatherData(cityName);
    cityInputEl.value = "";
    addLocalStorageCity(cityName);
  } else {
    alert("Please enter a City name");
  }
  console.log(event);
};

var getWeatherData = function(city) {
  // format the github api url
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=9dc4a4c7deb216005d4378ae17795624";

  // make a request to the url
  fetch(apiUrl).then(function(response) {
    if (response.ok) {
      response.json().then(function(dataOne) {
        console.log(dataOne);
        var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + dataOne.coord.lat +"&lon=" + dataOne.coord.lon + "&exclude=minutely,hourly&units=imperial&appid=9dc4a4c7deb216005d4378ae17795624";
        fetch(apiUrl).then(function(response) {
          if (response.ok) {
            response.json().then(function(dataTwo) {
              console.log(dataTwo);
              setCityData(dataOne,dataTwo);
            });
          } else {
            alert("Error: City Not Found");
          }
        })
      });
    } else {
      alert("Error: City Not Found");
    }
  })
  .catch(function(error) {
    // Notice this `.catch()` getting chained onto the end of the `.then()` method
    alert("Unable to connect to OpenWeather");
  });
};

var setCityData = function(dataOne,fetchedData) {
  const unixTime = fetchedData.current.dt;
  const date = new Date(unixTime*1000);
  const currentDate = date.toLocaleDateString("en-US");
  document.getElementById("currentCity").innerHTML = dataOne.name + " (" + currentDate + ")";
  document.getElementById("currentTemp").innerHTML = "Temp: " + fetchedData.current.temp +"°F";
  document.getElementById("currentWind").innerHTML = "Wind: " + fetchedData.current.wind_speed + " MPH";
  document.getElementById("currentHumidity").innerHTML = "Humidity: " + fetchedData.current.humidity + " %";
  document.getElementById("currentUv").innerHTML = "UV Index: " + fetchedData.current.uvi;
}

userFormEl.addEventListener("submit", formSubmitHandler);
getWeatherData(cityName);