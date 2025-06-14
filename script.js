const apiKey = '63d2e0b3827c6e4649dd7fb99c4a2b06'; // Replace with your actual API key

const iconMap = {
  '01d': 'wi-day-sunny',
  '01n': 'wi-night-clear',
  '02d': 'wi-day-cloudy',
  '02n': 'wi-night-alt-cloudy',
  '03d': 'wi-cloud',
  '03n': 'wi-cloud',
  '04d': 'wi-cloudy',
  '04n': 'wi-cloudy',
  '09d': 'wi-showers',
  '09n': 'wi-showers',
  '10d': 'wi-day-rain',
  '10n': 'wi-night-alt-rain',
  '11d': 'wi-thunderstorm',
  '11n': 'wi-thunderstorm',
  '13d': 'wi-snow',
  '13n': 'wi-snow',
  '50d': 'wi-fog',
  '50n': 'wi-fog'
};

function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  if (!city) return;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
      if (data.cod === "404") {
        document.getElementById('weatherResult').innerHTML = 'City not found.';
        document.body.className = ''; // reset background
        return;
      }

      const iconCode = data.weather[0].icon;
      const iconClass = iconMap[iconCode] || 'wi-na';

      const weatherHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <i class="wi ${iconClass}"></i>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].main}</p>
        <p>Humidity: ${data.main.humidity}%</p>
      `;
      document.getElementById('weatherResult').innerHTML = weatherHTML;

      // Background change logic
      const weatherCondition = data.weather[0].main.toLowerCase();
      document.body.className = ''; // reset previous class

      switch (weatherCondition) {
        case 'clear':
          document.body.classList.add(iconCode.endsWith('n') ? 'clear-night' : 'sunny');
          break;
        case 'clouds':
          document.body.classList.add('cloudy');
          break;
        case 'rain':
        case 'drizzle':
          document.body.classList.add('rainy');
          break;
        case 'snow':
          document.body.classList.add('snowy');
          break;
        case 'fog':
        case 'mist':
        case 'haze':
          document.body.classList.add('foggy');
          break;
        default:
          document.body.style.background = '#888'; // fallback
      }
    })
    .catch(error => {
      document.getElementById('weatherResult').innerHTML = 'Error fetching data.';
      console.error(error);
    });
}