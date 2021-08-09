//Gloabl Vars
var userFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#cityName");
var cityName = "Miami";

//inital loading functions
var initalLoadRoute = function(cityName) {
  var savedCities = localStorage.getItem("CitiesWeatherArray");
  if (!savedCities) {
  saveCity(cityName);
  getWeatherData(cityName);
  addSavedCitiesButtons();
  } else {
    getWeatherData(cityName);
    addSavedCitiesButtons();
  }
};

//functions for new city submission
var formSubmitHandler = function(event) {
  event.preventDefault();
  // get value from input element
  console.log(cityInputEl);
  cityName = cityInputEl.value.trim();

  if (cityName) {
    removeSavedCitiesButtons();
    saveCity(cityName);
    getWeatherData(cityName);
    addSavedCitiesButtons();
    cityInputEl.value = "";
    
  } else {
    alert("Please enter a City name");
  }
  console.log(event);
};

//Function to get weather data from openweather api
var getWeatherData = function(city) {
  // format the current weather api url
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=9dc4a4c7deb216005d4378ae17795624";

  // make a request to the url
  fetch(apiUrl).then(function(response) {
    if (response.ok) {
      response.json().then(function(dataOne) {
        console.log(dataOne);
        //format the forcasted weather api call using long and lat from first call response
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
  //catch error from openweather api
  .catch(function(error) {
    
    alert("Unable to connect to OpenWeather");
  });
};

// Write weather data from fetch request onto page
var setCityData = function(dataOne,fetchedData) {
  //current weather block instructions
  var UvValue = fetchedData.current.uvi
  var unixTime = fetchedData.current.dt;
  var date = new Date(unixTime*1000);
  var currentDate = date.toLocaleDateString("en-US");
  document.getElementById("currentCity").innerHTML = dataOne.name + " (" + currentDate + ")";
  document.getElementById("currentTemp").innerHTML = "Temp: " + fetchedData.current.temp +"°F";
  document.getElementById("currentWind").innerHTML = "Wind: " + fetchedData.current.wind_speed + " MPH";
  document.getElementById("currentHumidity").innerHTML = "Humidity: " + fetchedData.current.humidity + " %";
  document.getElementById("currentUv").innerHTML = "UV Index: " + UvValue;
  if (UvValue < 2){
    document.getElementById("currentUv").style.backgroundColor = 'lightgreen';
  } else if (UvValue < 5) {
    document.getElementById("currentUv").style.backgroundColor = 'yellowgreen';
  } else if (UvValue < 7) {
    document.getElementById("currentUv").style.backgroundColor = 'orange';
  } else if (UvValue < 10) {
    document.getElementById("currentUv").style.backgroundColor = 'red';
  } else {
    document.getElementById("currentUv").style.backgroundColor = 'violet';
  };
  
  //forcast day 1 card instructions
  unixTime = fetchedData.daily[0].dt;
  date = new Date(unixTime*1000);
  var oneDate = date.toLocaleDateString("en-US");
  document.getElementById("dateOne").innerHTML = oneDate;
  document.getElementById("iconOne").src = "http://openweathermap.org/img/w/" + fetchedData.daily[0].weather[0].icon + ".png";
  document.getElementById("tempOne").innerHTML = "Temp: " + fetchedData.daily[0].temp.day + "°F";
  document.getElementById("windOne").innerHTML = "Wind: " + fetchedData.daily[0].wind_speed + " MPH";
  document.getElementById("humOne").innerHTML = "Humidity: " + fetchedData.daily[0].humidity + " %";

  //forcast day 2 block instructions
  unixTime = fetchedData.daily[1].dt;
  date = new Date(unixTime*1000);
  var oneDate = date.toLocaleDateString("en-US");
  document.getElementById("dateTwo").innerHTML = oneDate;
  document.getElementById("iconTwo").src = "http://openweathermap.org/img/w/" + fetchedData.daily[1].weather[0].icon + ".png";
  document.getElementById("tempTwo").innerHTML = "Temp: " + fetchedData.daily[1].temp.day + "°F";
  document.getElementById("windTwo").innerHTML = "Wind: " + fetchedData.daily[1].wind_speed + " MPH";
  document.getElementById("humTwo").innerHTML = "Humidity: " + fetchedData.daily[1].humidity + " %";

  //forcast day 3 block instructions
  unixTime = fetchedData.daily[2].dt;
  date = new Date(unixTime*1000);
  var oneDate = date.toLocaleDateString("en-US");
  document.getElementById("dateThree").innerHTML = oneDate;
  document.getElementById("iconThree").src = "http://openweathermap.org/img/w/" + fetchedData.daily[2].weather[0].icon + ".png";
  document.getElementById("tempThree").innerHTML = "Temp: " + fetchedData.daily[2].temp.day + "°F";
  document.getElementById("windThree").innerHTML = "Wind: " + fetchedData.daily[2].wind_speed + " MPH";
  document.getElementById("humThree").innerHTML = "Humidity: " + fetchedData.daily[2].humidity + " %";
  
  //forcast day 4 block instructions
  unixTime = fetchedData.daily[3].dt;
  date = new Date(unixTime*1000);
  var oneDate = date.toLocaleDateString("en-US");
  document.getElementById("dateFour").innerHTML = oneDate;
  document.getElementById("iconFour").src = "http://openweathermap.org/img/w/" + fetchedData.daily[3].weather[0].icon + ".png";
  document.getElementById("tempFour").innerHTML = "Temp: " + fetchedData.daily[3].temp.day + "°F";
  document.getElementById("windFour").innerHTML = "Wind: " + fetchedData.daily[3].wind_speed + " MPH";
  document.getElementById("humFour").innerHTML = "Humidity: " + fetchedData.daily[3].humidity + " %";

  //forcast day 5 block instructions
  unixTime = fetchedData.daily[4].dt;
  date = new Date(unixTime*1000);
  var oneDate = date.toLocaleDateString("en-US");
  document.getElementById("dateFive").innerHTML = oneDate;
  document.getElementById("iconFive").src = "http://openweathermap.org/img/w/" + fetchedData.daily[4].weather[0].icon + ".png";
  document.getElementById("tempFive").innerHTML = "Temp: " + fetchedData.daily[4].temp.day + "°F";
  document.getElementById("windFive").innerHTML = "Wind: " + fetchedData.daily[4].wind_speed + " MPH";
  document.getElementById("humFive").innerHTML = "Humidity: " + fetchedData.daily[4].humidity + " %";

}

//remove daved cities buttons
var removeSavedCitiesButtons = function() {
  var citiesStorage = localStorage.getItem("CitiesWeatherArray");
  if (citiesStorage === null){
  } else {
    citiesStorage = JSON.parse(citiesStorage);
    console.log(citiesStorage);
      for (var i = 0; i < citiesStorage.length; i++) {
      var lI = document.getElementById("citySaved");
      lI.remove();
    }
  }
}

// add saved cities buttons based on local storage
var addSavedCitiesButtons = function() {
  var citiesStorage = localStorage.getItem("CitiesWeatherArray");
  citiesStorage = JSON.parse(citiesStorage);
  console.log(citiesStorage);
  for (var i = 0; i < citiesStorage.length; i++) {
    var newEl = document.createElement("button")
    newEl.setAttribute("id", "citySaved");
    newEl.classList.add("btn", "savedCityButton");
    newEl.innerHTML = citiesStorage[i].name;
    newEl.setAttribute("onclick", "getWeatherData(this.innerHTML)")
    var lIParent = document.getElementById("savedCities");
    lIParent.appendChild(newEl);
  }
}

//save new city to local storage as object
var saveCity = function(cityNew) {
  var citiesWeatherArray = [];
  var cityNew = {
    name: cityNew
  }
  console.log(cityNew.name)
  var savedCities = localStorage.getItem("CitiesWeatherArray");
  if (!savedCities) {
      console.log(cityNew);
      citiesWeatherArray.push(cityNew);
      localStorage.setItem("CitiesWeatherArray", JSON.stringify(citiesWeatherArray));
  } else {
    savedCities = JSON.parse(savedCities);
      savedCities.push(cityNew);
      localStorage.setItem("CitiesWeatherArray", JSON.stringify(savedCities));
  };
};

//delete and clear localstorage for this program only
var deleteLocal = function() {
  var citiesStorage = localStorage.getItem("CitiesWeatherArray");
    if (citiesStorage === null){
    } else {
      citiesStorage = JSON.parse(citiesStorage);
      console.log(citiesStorage);
      for (var i = 0; i < citiesStorage.length; i++) {
        var lI = document.getElementById("citySaved");
        lI.remove();
      };
      localStorage.removeItem('CitiesWeatherArray');
    }; 

}

//event listener for submitting a new city
userFormEl.addEventListener("submit", formSubmitHandler);

//event listenter for deleteing local storage button
document.getElementById("deleteStore").addEventListener("click",deleteLocal)

//inital load function
initalLoadRoute(cityName);
