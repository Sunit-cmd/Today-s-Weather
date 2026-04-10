document.addEventListener('DOMContentLoaded', () => {
    // 1. Get API Key from global config fallback
    const apiKey = (window.APP_CONFIG && window.APP_CONFIG.WEATHER_API_KEY) ? window.APP_CONFIG.WEATHER_API_KEY : 'ff946d71bdab40cea1042151261603';

    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            const query = document.getElementById('citySearch').value;
            if (query.trim() !== '') {
                window.location.href = `weather.html?city=${encodeURIComponent(query)}`;
            }
        });
    }

    const urlParams = new URLSearchParams(window.location.search);
    const city = urlParams.get('city');

    if (!city) {
        document.getElementById('wCity').innerText = "No city provided. Please search a city.";
        return;
    }

    fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(city)}&days=5`)
        .then(response => {
            if (!response.ok) {
                return response.json().then(errData => {
                    throw new Error(errData.error ? errData.error.message : `HTTP ${response.status}`);
                });
            }
            return response.json();
        })
        .then(data => {
            if (data.error) {
                document.getElementById('wCity').innerText = `Error: ${data.error.message}`;
                return;
            }

            document.getElementById('wCity').innerText = data.location.name + ', ' + data.location.country;
            document.getElementById('wTemp').innerText = data.current.temp_c + '°C';
            document.getElementById('wCondition').innerText = data.current.condition.text;
            
            const iconImg = document.getElementById('wIcon');
            iconImg.src = 'https:' + data.current.condition.icon;
            iconImg.style.display = 'block';

            document.getElementById('wHumidity').innerText = `💧 Humidity: ${data.current.humidity}%`;
            document.getElementById('wWind').innerText = `💨 Wind: ${data.current.wind_kph} km/h`;

            const conditionLower = data.current.condition.text.toLowerCase();
            const isDay = data.current.is_day;
            
            let bgImage = 'url("https://images.pexels.com/photos/54319/pexels-photo-54319.jpeg")'; 
            let textColor = 'white';

            if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
                bgImage = 'url("https://images.pexels.com/photos/125510/pexels-photo-125510.jpeg")'; 
            } else if (conditionLower.includes('cloud') || conditionLower.includes('overcast')) {
                bgImage = isDay ? 'url("https://images.pexels.com/photos/158163/clouds-cloudporn-weather-lookup-158163.jpeg")' : 'url("https://images.pexels.com/photos/414515/pexels-photo-414515.jpeg")'; 
            } else if (conditionLower.includes('sunny') || conditionLower.includes('clear')) {
                const dayBg = 'url("https://images.pexels.com/photos/296234/pexels-photo-296234.jpeg")'; 
                const nightBg = 'url("https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg")';
                bgImage = isDay ? dayBg : nightBg;
                textColor = isDay ? '#2d3436' : 'white';
            } else if (conditionLower.includes('snow') || conditionLower.includes('sleet')) {
                bgImage = 'url("https://images.pexels.com/photos/730256/pexels-photo-730256.jpeg")'; 
                textColor = '#2d3436'; 
            } else if (conditionLower.includes('mist') || conditionLower.includes('fog')) {
                bgImage = 'url("https://images.pexels.com/photos/1287075/pexels-photo-1287075.jpeg")';
            } else if (conditionLower.includes('thunder')) {
                bgImage = 'url("https://images.pexels.com/photos/1114688/pexels-photo-1114688.jpeg")'; 
            }

            const container = document.getElementById('weatherContainer');
            container.style.backgroundImage = bgImage;
            
            const detailBox = document.getElementById('detailBox');
            detailBox.style.color = textColor;
            if (textColor === 'white') {
                detailBox.style.textShadow = '2px 2px 4px rgba(0,0,0,0.8)';
            }

            if (data.forecast && data.forecast.forecastday) {
                data.forecast.forecastday.forEach((day, index) => {
                    const fcItem = document.getElementById(`fc-${index}`);
                    if (fcItem) {
                        fcItem.style.color = textColor;
                        fcItem.style.textShadow = textColor === 'white' ? '1px 1px 3px rgba(0,0,0,0.8)' : 'none';
                        
                        const dateObj = new Date(day.date);
                        fcItem.querySelector('.fc-date').textContent = dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
                        
                        const img = fcItem.querySelector('.fc-icon');
                        img.src = 'https:' + day.day.condition.icon;
                        img.alt = day.day.condition.text;
                        img.style.display = 'inline-block';
                        
                        fcItem.querySelector('.fc-temps').textContent = `${day.day.maxtemp_c}° / ${day.day.mintemp_c}°`;
                        fcItem.querySelector('.fc-cond').textContent = day.day.condition.text;
                    }
                });
            }
        })
        .catch(error => {
            console.error(error);
            document.getElementById('wCity').innerText = "Network Error";
        });
});
