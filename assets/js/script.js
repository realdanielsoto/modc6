document.getElementById("weather-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const city = document.getElementById("city-name").value;

    fetchWeatherData(city);
});

function fetchWeatherData(city) {
    const apiKey = "your_api_key_here";
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayCurrentWeather(data);
            displayForecast(data);
            saveSearchHistory(city);
        })
        .catch(error => console.error("Error fetching data:", error));
}

function displayCurrentWeather(data) {
    const currentWeather = document.getElementById("current-weather");
    const today = data.list[0];
    currentWeather.innerHTML = `
        <h3>${data.city.name} (${new Date(today.dt * 1000).toLocaleDateString()})</h3>
        <p>Temp: ${today.main.temp}°F</p>
        <p>Humidity: ${today.main.humidity}%</p>
        <p>Wind Speed: ${today.wind.speed} MPH</p>
    `;
}

function displayForecast(data) {
    const forecastCards = document.getElementById("forecast-cards");
    forecastCards.innerHTML = data.list.slice(1, 6).map(day => `
        <div class="forecast-card">
            <p>${new Date(day.dt * 1000).toLocaleDateString()}</p>
            <p>Temp: ${day.main.temp}°F</p>
            <p>Humidity: ${day.main.humidity}%</p>
        </div>
    `).join("");
}

function saveSearchHistory(city) {
    let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
    if (!history.includes(city)) {
        history.push(city);
        localStorage.setItem("searchHistory", JSON.stringify(history));
        displaySearchHistory();
    }
}

function displaySearchHistory() {
    const history = JSON.parse(localStorage.getItem("searchHistory")) || [];
    const historyList = document.getElementById("search-history");
    historyList.innerHTML = history.map(city => `<li>${city}</li>`).join("");
}

document.addEventListener("DOMContentLoaded", displaySearchHistory);
