let apiKey = `9bf2efd0f6df71b36df66a55219d0c2d`;
let city = `Phuket`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);

function displayTemperature(response) {
  let currentTemp = document.querySelector("#current-temp");
  let currentValue = Math.round(response.data.main.temp);
  let cityText = document.querySelector("#city-name");
  let currentCity = response.data.name;
  let descriptor = document.querySelector("#weather-conditions");
  let weatherDescription = response.data.weather[0].description;
  currentTemp.innerHTML = `${currentValue}°`;
  cityText.innerHTML = `${currentCity}`;
  descriptor.innerHTML = `${weatherDescription}`;
}
