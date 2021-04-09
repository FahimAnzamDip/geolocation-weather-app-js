//Select Elements
const iconElement = document.querySelector('.weather-icon')
const tempElement = document.querySelector('.temperature-value p')
const descElement = document.querySelector('.temperature-description p')
const locationElement = document.querySelector('.location p')
const notificationElement = document.querySelector('.notification')

//App Data
const weather = {}

weather.temperature = {
    unit: 'celsius'
}

//App Constants & Vars
const KELVIN = 273

//API Key
const KEY = 'GET YOU KEY FROM OPENWEATHER API'

//Check if the browser supports geolocation
if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError)
} else {
    notificationElement.style.display = 'block'
    notificationElement.innerHTML = '<p>Browser Doesn\'t Support Geolocation.</p>'
}

//Set User's Position
function setPosition(position) {
    let latitude = position.coords.latitude
    let longitude = position.coords.longitude

    getWeather(latitude, longitude)
}

//Show Error If Any
function showError(error) {
    notificationElement.style.display = 'block'
    notificationElement.innerHTML = `<p>${error.message}</p>`
}

//Get Weather From Api Provider
function getWeather(latitude, longitude) {
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${KEY}`

    fetch(api)
        .then(function(response) {
            let data = response.json()
            return data
        })
        .then(function(data) {
            weather.temperature.value = Math.floor(data.main.temp - KELVIN)
            weather.description = data.weather[0].description
            weather.iconId = data.weather[0].icon
            weather.city = data.name
            weather.country = data.sys.country
        })
        .then(function() {
            displayWeather()
        }) 
}

//Display Weather
function displayWeather() {
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"></img>`
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`
    descElement.innerHTML = weather.description
    locationElement.innerHTML = `${weather.city}, ${weather.country}`
}

//Celsius to Fahrenheit Convertion
function celsiusToFahrenheit(temperature) {
    return (temperature * 9/5) + 32
}

//Onclick Change to Fahrenheit
tempElement.addEventListener('click', function() {
    if (weather.temperature.value === 'undefined') return

    if (weather.temperature.unit === 'celsius') {
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value)
        fahrenheit = Math.floor(fahrenheit)

        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`
        weather.temperature.unit = 'fahrenheit'
    } else {
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`
        weather.temperature.unit = 'celsius'
    }
})