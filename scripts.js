const keys = "dc09743868ad4b134aefc251579135f0";

function showLoadingSpinner() {
    document.querySelector(".loading-spinner").style.display = "block"; // Exibe o spinner
}

function hideLoadingSpinner() {
    document.querySelector(".loading-spinner").style.display = "none"; // Esconde o spinner
}

function displayDataOnScreen(data) {
    console.log(data);
    document.querySelector(".img-forecast").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    document.querySelector(".city").innerHTML = "Weather in " + data.name;
    document.querySelector(".temp").innerHTML = Math.floor(data.main.temp) + "°C";
    document.querySelector(".forecast-text").innerHTML = data.weather[0].description;
    document.querySelector(".humidity").innerHTML = "Humidity: " + data.main.humidity + "%";
    document.querySelector(".temp-max").innerHTML = "Max: " + Math.floor(data.main.temp_max) + "°C";
    document.querySelector(".temp-min").innerHTML = "Min: " + Math.floor(data.main.temp_min) + "°C";
    document.querySelector(".feels-like").innerHTML = "Feels like: " + Math.floor(data.main.feels_like) + "°C";
}

async function searchCity(city) {
    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    showLoadingSpinner();

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${keys}&lang=en&units=metric`);
        if (!response.ok) {
            throw new Error("City not found");
        }
        const data = await response.json();
        displayDataOnScreen(data);
    } catch (error) {
        alert(error.message); // Exibe uma mensagem de erro ao usuário
    } finally {
        hideLoadingSpinner();
    }
}

function clickedOnButton() {
    const city = document.querySelector(".city-input").value;
    
    if (!city.trim()) {
        alert("Please enter a city.");
        return;
    }

    searchCity(city);
}
