let form = document.querySelector("#city-form");
form.addEventListener("submit", handleCity);

let currentValueCelsius = null;

function currentPositionWeather() {
  let currentposition =
    navigator.geolocation.getCurrentPosition(searchCurrentCity);
}

function handleCity(event) {
  event.preventDefault();
  let userCity = document.querySelector("#city-input");
  searchCity(userCity.value);
}

function searchCity(city) {
  let apiKey = `9bf2efd0f6df71b36df66a55219d0c2d`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function searchCurrentCity(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "9bf2efd0f6df71b36df66a55219d0c2d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function formatTime(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let day = date.getDay();
  return `${hours}:${minutes}`;
}

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let day = date.getDay();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function displayFarenheit(event) {
  event.preventDefault();
  let currentTempText = document.querySelector("#current-temp");
  let farenheitTemp = (currentValueCelsius * 9) / 5 + 32;
  currentTempText.innerHTML = `${farenheitTemp}°`;
}

let celsiusTemperature = null;

function formatDay(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day}`;
}

function formatMonth(timestamp) {
  let date = new Date(timestamp);
  let months = [
    "January",
    "February",
    "March",
    "April",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let month = months[date.getMonth()];

  let today = date.getDate();
  return `${month} ${today}`;
}

function displayTemperature(response) {
  let currentTemp = document.querySelector("#current-temp");
  currentValueCelsius = Math.round(response.data.main.temp);
  let celsiusTemperature = Math.round(response.data.main.temp);
  let cityText = document.querySelector("#city-name");
  let currentCity = response.data.name;
  let descriptor = document.querySelector("#weather-conditions");
  let weatherDescription = response.data.weather[0].description;
  currentTemp.innerHTML = `${currentValueCelsius}°`;
  cityText.innerHTML = `${currentCity}`;
  descriptor.innerHTML = `${weatherDescription}`;
  let timeText = document.querySelector("#hours");
  timeText.innerHTML = formatDate(response.data.dt * 1000);
  let dayText = document.querySelector("#day");
  dayText.innerHTML = formatDay(response.data.dt * 1000);
  let monthText = document.querySelector("#currentdate");
  monthText.innerHTML = formatMonth(response.data.dt * 1000);
  let currentIcon = document.querySelector("#weather-icon");
  let todayIcon = response.data.weather[0].icon;
  currentIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${todayIcon}@4x.png`
  );
  currentIcon.setAttribute("alt", `${weatherDescription}`);
  getForecast(response.data.coord);

  let now = new Date();

  if (now.getHours() >= 21 || now.getHours() < 6) {
    document.getElementById("current-card").style.backgroundImage =
      "url(src/images/camp-4363073_1280.png) ";
  }

  if (now.getHours() >= 19 && now.getHours() < 21) {
    document.getElementById("current-card").style.backgroundImage =
      "url(src/images/night.png)";
  }

  if (
    now.getHours() >= 6 &&
    now.getHours() < 19 &&
    response.data.main.temp > 25
  ) {
    document.getElementById("current-card").style.backgroundImage =
      "url(src/images/beach2.png)";
    document.getElementById("hours").style.color = "black";
    document.getElementById("city-name").style.color = "black";
    document.getElementById("day").style.color = "black";
    document.getElementById("currentdate").style.color = "black";
    document.getElementById("current-temp").style.color = "black";
    document.getElementById("units-celsius").style.color = "black";
    document.getElementById("weather-conditions").style.color = "black";
    document.getElementById("updated").style.color = "black";
  }

  if (
    now.getHours() >= 6 &&
    now.getHours() < 19 &&
    response.data.main.temp <= 25
  ) {
    document.getElementById("current-card").style.backgroundImage =
      "url(src/images/landscapes.jpg)";
  }
}

searchCity("Phuket");

let currentPosition = document.querySelector("#current-city-pin");
currentPosition.addEventListener("click", currentPositionWeather);

let farenheitQuery = document.querySelector("#farenheit-link");
farenheitQuery.addEventListener("click", displayFarenheit);

function displayCelsius(event) {
  event.preventDefault();
  let currentTempText = document.querySelector("#current-temp");
  currentTempText.innerHTML = `${currentValueCelsius}°`;
  farenheitQuery.classList.remove("active");
  celsiusQuery.classList.add("active");
}

let celsiusQuery = document.querySelector("#celsius-link");
celsiusQuery.addEventListener("click", displayCelsius);

function displayFarenheit(event) {
  event.preventDefault();
  let currentTempText = document.querySelector("#current-temp");
  let farenheitTemp = (currentValueCelsius * 9) / 5 + 32;

  currentTempText.innerHTML = `${farenheitTemp}°`;
  celsiusQuery.classList.remove("active");
  farenheitQuery.classList.add("active");
}

function displayForecast(response) {
  let forecastDays = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = "";

  forecastDays.forEach(function (forecastDay, index) {
    if (index < 4) {
      forecastHTML =
        forecastHTML +
        `<div class="weather-forecast"," id="weather-forecast"><span class ="forecast-date"> ${formatForecastDay(
          forecastDay.dt
        )} </span>
		<div class="forecast-icon"> <img src= "https://openweathermap.org/img/wn/${
      forecastDay.weather[0].icon
    }@2x.png" alt="rain symbol"> </div>
			<div class="forecast-max"> ${Math.round(
        forecastDay.temp.max
      )}° | <span class="forecast-min"> ${Math.round(
          forecastDay.temp.min
        )}° </span> </div></div>`;
      forecastElement.innerHTML = forecastHTML;
    }
  });
}

function getForecast(coordinates) {
  let apiKey = "9bf2efd0f6df71b36df66a55219d0c2d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}
