let apiKey = `9bf2efd0f6df71b36df66a55219d0c2d`;
let city = `Phuket`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);

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
  let currentValue = Math.round(response.data.main.temp);
  let cityText = document.querySelector("#city-name");
  let currentCity = response.data.name;
  let descriptor = document.querySelector("#weather-conditions");
  let weatherDescription = response.data.weather[0].description;
  let dateText = document.querySelector("#currentdate");
  let currentdate = (currentTemp.innerHTML = `${currentValue}°`);
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
    `https://openweathermap.org/img/wn/${todayIcon}.png`
  );
  currentIcon.setAttribute("alt", `${weatherDescription}`);
}
