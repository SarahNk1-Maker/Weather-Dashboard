const cityForm = document.getElementById("city-form");
const cityInput = document.getElementById("city-input");
const searchHistory = document.getElementById("search-history");
const currentWeather = document.getElementById("current-weather");
const forecast = document.getElementById("forecast");
const APIKey = "1174a526efecdc5f64bbafecd404941e";

// Store search history in an array
const searchHistoryArray = [];

// Function to fetch weather data for a city
async function fetchWeather(city) { 
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${APIKey}`);
        const data = await response.json();

        // Check if the response contains valid data
        if (response.status === 200) {
            // Process and display weather data here
            const temperature = data.main.temp;
            const weatherDescription = data.weather[0].description;
            currentWeather.innerHTML = `Temperature: ${temperature}°C<br>Weather: ${weatherDescription}`;
        } else {
            // Handle invalid city or API issue
            currentWeather.innerHTML = "City not found or API error.";
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

// Function to add a city to the search history
function addToSearchHistory(city) {
    // Add the city to the array
    searchHistoryArray.push(city);

    // Create a button element for the city and add it to the search history
    const cityButton = document.createElement("button");
    cityButton.textContent = city;
    cityButton.addEventListener("click", () => {
        // When a city button is clicked, fetch weather data for that city
        fetchWeather(city);
    });

    searchHistory.appendChild(cityButton);
}

// Handle form submission
cityForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();

    if (city) {
        // Fetch weather data for the entered city
        fetchWeather(city);

        // Add the city to the search history
        addToSearchHistory(city);

        // Clear the input field
        cityInput.value = "";
    }
});
