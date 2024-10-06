document.getElementById('search-btn').addEventListener('click', () => {
    const city = document.getElementById('city-input').value.trim();
    const weatherApiKey = 'd28662ed850638e82e13995028ba0434'; // i used Openweathermap API key
    const unsplashApiKey = 'CK1jJsps7HwLMd4vAbZsGRFKVKglVHXD8GNtDsxx2R4'; // i used Unsplash API key
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherApiKey}`;

    fetch(weatherApiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            if (data.cod === '404') {
                alert('City not found!');
                return;
            }

            if (data.cod !== 200) {
                alert('Error fetching weather data.');
                return;
            }

            document.getElementById('city-name').innerText = data.name;
            document.getElementById('temperature').innerText = `Temperature: ${data.main.temp} °C`;
            document.getElementById('description').innerText = `Description: ${data.weather[0].description}`;
            document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;
            document.getElementById('wind-speed').innerText = `Wind Speed: ${data.wind.speed} km/h`;

            fetch(`https://api.unsplash.com/search/photos?query=${city}&client_id=${unsplashApiKey}`)
                .then(response => response.json())
                .then(imageData => {
                    if (imageData.results.length > 0) {
                        const imageUrl = imageData.results[0].urls.full;
                        document.body.style.backgroundImage = `url(${imageUrl})`;
                    } else {
                        document.body.style.backgroundImage = "url('https://example.com/default.jpg')";
                    }
                })
                .catch(error => {
                    console.error('Error fetching background image:', error);
                    document.body.style.backgroundImage = "url('https://example.com/default.jpg')"; 
                });

        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
});

