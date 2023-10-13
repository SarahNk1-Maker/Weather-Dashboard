const cityForm = document.getElementById("city-form");
const cityInput = document.getElementById("city-input");
const searchHistory = document.getElementById("search-history");
const currentWeather = document.getElementById("current-weather");
const forecast = document.getElementById("forecast");
const APIKey = "aebb355032b6976ddc86485f38b7442d";

// Store search history in an array
const searchHistoryArray = [];

// Function to fetch weather data by coordinates
async function fetchWeatherByCoordinates(latitude, longitude) {
    try {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
      console.log(data)
        // Check if the response contains valid data
        if (response.status === 200) {
            // Process and display weather data here
            const temperature = (data.main.temp - 273.15).toFixed(2); // Convert temperature to Celsius
            const feelsLike = (data.main.feels_like - 273.15).toFixed(2); // Fetch "feels like" temperature
        
            
          
            console.log(temperature)

            currentWeather.innerHTML = `Temperature: ${temperature}°C<br>Feels Like:${feelsLike}°C<br>`;
        
        } else {
            // Handle invalid coordinates or API issue
            currentWeather.innerHTML = "Invalid coordinates or API error.";
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
    cityButton.textContent = city.name;
    cityButton.addEventListener("click", () => {
        // When a city button is clicked, fetch weather data for that city
        fetchWeatherByCoordinates(city.latitude, city.longitude);
    });

    searchHistory.appendChild(cityButton);
}

// Handle form submission
cityForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();

    if (city) {
        // Replace the coordinates with the coordinates of the desired location
        const coordinates = { name:city,
            latitude: 43.70, // Replace with the latitude of the desired location
            longitude:-73.42, // Replace with the longitude of the desired location
        };

        // Fetch weather data for the entered coordinates
        fetchWeatherByCoordinates(coordinates.latitude, coordinates.longitude);

        // Add the city to the search history
        addToSearchHistory(coordinates);

        // Clear the input field
        cityInput.value = "";
    }
});

