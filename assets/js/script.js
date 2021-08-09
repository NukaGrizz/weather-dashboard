var userFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#cityName");


var formSubmitHandler = function(event) {
  event.preventDefault();
  // get value from input element
  console.log(cityInputEl);
  var cityName = cityInputEl.value.trim();

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
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=9dc4a4c7deb216005d4378ae17795624";

  // make a request to the url
  fetch(apiUrl).then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
        console.log(data);
        setCityData(data);
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

userFormEl.addEventListener("submit", formSubmitHandler);