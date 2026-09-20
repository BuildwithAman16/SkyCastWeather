const ApiUrl = "https://api.weatherapi.com/v1/current.json";
const ApiKey = "909058f529fa462b85f154737262009";
const searchForm = document.querySelector(".search");
const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const errorMessage = document.querySelector(".error-message");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const location = city.trim();
  if (!location) { errorMessage.textContent = "Enter a city name to see its weather."; searchBox.focus(); return; }
  errorMessage.textContent = "";
  searchButton.disabled = true;
  searchButton.setAttribute("aria-label", "Loading weather");
  try {
    const response = await fetch(`${ApiUrl}?key=${ApiKey}&q=${encodeURIComponent(location)}&aqi=yes`);
    if (!response.ok) throw new Error("not-found");
    const data = await response.json();
    document.querySelector(".temp").innerHTML = `${Math.round(data.current.temp_c)}<span>&deg;</span>`;
    document.querySelector(".city").textContent = data.location.name;
    document.querySelector(".condition").textContent = data.current.condition.text;
    document.querySelector(".humidity-value").textContent = `${data.current.humidity}%`;
    document.querySelector(".wind-value").textContent = `${Math.round(data.current.wind_kph)} km/h`;
    weatherIcon.src = `https:${data.current.condition.icon}`;
    weatherIcon.alt = data.current.condition.text;
    document.querySelector(".weather").animate([{ opacity: .65, transform: "translateY(6px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 380, easing: "cubic-bezier(.2,.8,.2,1)" });
  } catch (error) { errorMessage.textContent = "We couldn't find that location. Try another city."; }
  finally { searchButton.disabled = false; searchButton.setAttribute("aria-label", "Search weather"); }
}
searchForm.addEventListener("submit", event => { event.preventDefault(); checkWeather(searchBox.value); });
