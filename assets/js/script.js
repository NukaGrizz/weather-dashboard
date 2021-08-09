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
              addLocalStorageCity(cityName);
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
  var unixTime = fetchedData.current.dt;
  var date = new Date(unixTime*1000);
  var currentDate = date.toLocaleDateString("en-US");
  document.getElementById("currentCity").innerHTML = dataOne.name + " (" + currentDate + ")";
  document.getElementById("currentTemp").innerHTML = "Temp: " + fetchedData.current.temp +"°F";
  document.getElementById("currentWind").innerHTML = "Wind: " + fetchedData.current.wind_speed + " MPH";
  document.getElementById("currentHumidity").innerHTML = "Humidity: " + fetchedData.current.humidity + " %";
  document.getElementById("currentUv").innerHTML = "UV Index: " + fetchedData.current.uvi;

  unixTime = fetchedData.daily[0].dt;
  date = new Date(unixTime*1000);
  var oneDate = date.toLocaleDateString("en-US");
  document.getElementById("dateOne").innerHTML = oneDate;
  document.getElementById("iconOne").src = "http://openweathermap.org/img/w/" + fetchedData.daily[0].weather[0].icon + ".png";
  document.getElementById("tempOne").innerHTML = "Temp: " + fetchedData.daily[0].temp.day + "°F";
  document.getElementById("windOne").innerHTML = "Wind: " + fetchedData.daily[0].wind_speed + " MPH";
  document.getElementById("humOne").innerHTML = "Humidity: " + fetchedData.daily[0].humidity + " %";

  unixTime = fetchedData.daily[1].dt;
  date = new Date(unixTime*1000);
  var oneDate = date.toLocaleDateString("en-US");
  document.getElementById("dateTwo").innerHTML = oneDate;
  document.getElementById("iconTwo").src = "http://openweathermap.org/img/w/" + fetchedData.daily[1].weather[0].icon + ".png";
  document.getElementById("tempTwo").innerHTML = "Temp: " + fetchedData.daily[1].temp.day + "°F";
  document.getElementById("windTwo").innerHTML = "Wind: " + fetchedData.daily[1].wind_speed + " MPH";
  document.getElementById("humTwo").innerHTML = "Humidity: " + fetchedData.daily[1].humidity + " %";

  unixTime = fetchedData.daily[2].dt;
  date = new Date(unixTime*1000);
  var oneDate = date.toLocaleDateString("en-US");
  document.getElementById("dateThree").innerHTML = oneDate;
  document.getElementById("iconThree").src = "http://openweathermap.org/img/w/" + fetchedData.daily[2].weather[0].icon + ".png";
  document.getElementById("tempThree").innerHTML = "Temp: " + fetchedData.daily[2].temp.day + "°F";
  document.getElementById("windThree").innerHTML = "Wind: " + fetchedData.daily[2].wind_speed + " MPH";
  document.getElementById("humThree").innerHTML = "Humidity: " + fetchedData.daily[2].humidity + " %";
  
  unixTime = fetchedData.daily[3].dt;
  date = new Date(unixTime*1000);
  var oneDate = date.toLocaleDateString("en-US");
  document.getElementById("dateFour").innerHTML = oneDate;
  document.getElementById("iconFour").src = "http://openweathermap.org/img/w/" + fetchedData.daily[3].weather[0].icon + ".png";
  document.getElementById("tempFour").innerHTML = "Temp: " + fetchedData.daily[3].temp.day + "°F";
  document.getElementById("windFour").innerHTML = "Wind: " + fetchedData.daily[3].wind_speed + " MPH";
  document.getElementById("humFour").innerHTML = "Humidity: " + fetchedData.daily[3].humidity + " %";

  unixTime = fetchedData.daily[4].dt;
  date = new Date(unixTime*1000);
  var oneDate = date.toLocaleDateString("en-US");
  document.getElementById("dateFour").innerHTML = oneDate;
  document.getElementById("iconFour").src = "http://openweathermap.org/img/w/" + fetchedData.daily[4].weather[0].icon + ".png";
  document.getElementById("tempFour").innerHTML = "Temp: " + fetchedData.daily[4].temp.day + "°F";
  document.getElementById("windFour").innerHTML = "Wind: " + fetchedData.daily[4].wind_speed + " MPH";
  document.getElementById("humFour").innerHTML = "Humidity: " + fetchedData.daily[4].humidity + " %";

  unixTime = fetchedData.daily[4].dt;
  date = new Date(unixTime*1000);
  var oneDate = date.toLocaleDateString("en-US");
  document.getElementById("dateFive").innerHTML = oneDate;
  document.getElementById("iconFive").src = "http://openweathermap.org/img/w/" + fetchedData.daily[4].weather[0].icon + ".png";
  document.getElementById("tempFive").innerHTML = "Temp: " + fetchedData.daily[4].temp.day + "°F";
  document.getElementById("windFive").innerHTML = "Wind: " + fetchedData.daily[4].wind_speed + " MPH";
  document.getElementById("humFive").innerHTML = "Humidity: " + fetchedData.daily[4].humidity + " %";
}

userFormEl.addEventListener("submit", formSubmitHandler);
getWeatherData(cityName);