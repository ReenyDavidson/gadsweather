/*const api = {
  base: "https://api.openweathermap.org/data/2.5//",
  key: "02c0ca2f81c3769d84452840b85563b6",
};*/

const inputValue = document.querySelector(".input-field");
const form = document.querySelector(".form-container");
const button = document.querySelector(".button");
const msg = document.querySelector(".msg");

inputValue.addEventListener("keypress", () => {
  return inputValue.value;
});

form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  getResults(inputValue.value);
  inputValue.value = "";
});

getResults = (q) => {
  let key = "0f19c706a56820cb8a40fdb92152f6e7";
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${q}&units=metric&appid=${key}`,
  )
    .then((res) => res.json())
    .then(displayResults)
    .catch(() => {
      msg.textContent =
        "Sorry, I can't retrieve this city's weather at the moment 😩";
    });
};

displayResults = (res) => {
  let city = document.querySelector(".city");
  city.innerHTML = `${res.name}, ${res.sys.country}`;

  let temp = document.querySelector(".temp");
  temp.innerHTML = Math.round(`${res.main.temp}`) + "°c";

  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = `Humidity: ${res.main.humidity}%`;

  let date = document.querySelector(".date");
  date.innerHTML = new Date().toUTCString();

  let wind = document.querySelector(".wind");
  wind.innerHTML = `wind Speed: ${res.wind.speed}m/s`;

  let img = document.querySelector(".img-icon");
  img.src =
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/" +
    `${res.weather[0].icon}` +
    ".svg";
  img.alt = "icon";

  let feelsLike = Math.round(`${res.main.feels_like}`) + "°c";

  let description = document.querySelector(".weather");
  description.innerHTML =
    `Feels Like:  ${feelsLike}` + `  ${res.weather[0].description}`;

  msg.textContent = "";

  let pseudo = document.querySelector(".pseudo");
  pseudo.innerHTML = " ";
};
