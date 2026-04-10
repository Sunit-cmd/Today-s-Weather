document.addEventListener('DOMContentLoaded', () => {
    // 1. Get API Key from global config fallback
    const apiKey = (window.APP_CONFIG && window.APP_CONFIG.WEATHER_API_KEY) ? window.APP_CONFIG.WEATHER_API_KEY : 'ff946d71bdab40cea1042151261603';
    
    const cities = [
        { name: 'New Delhi', id: 'box1' },
        { name: 'New York', id: 'box2' },
        { name: 'London', id: 'box3' },
        { name: 'Sydney', id: 'box4' }
    ];

    const fetchWeatherForBox = (cityName, boxId) => {
        if (!cityName) return;
        fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(cityName)}`)
            .then(response => {
                if (!response.ok) {
                    return response.json().then(errData => {
                        throw new Error(errData.error ? errData.error.message : `HTTP ${response.status}`);
                    });
                }
                return response.json();
            })
            .then(data => {
                const box = document.getElementById(boxId);
                if (!box) return;

                if (data.error) {
                    box.innerHTML = `<h3>Error</h3><p>${data.error.message}</p>`;
                    return;
                }
                // ... (rest of the display logic remains same)
                const temp = data.current.temp_c;
                const condition = data.current.condition.text;
                const icon = data.current.condition.icon;
                const isDay = data.current.is_day;
                const humidity = data.current.humidity;
                const wind = data.current.wind_kph;
                const actualName = data.location.name;
                
                box.querySelector('.city-name').textContent = actualName;
                const img = box.querySelector('.weather-icon');
                img.src = 'https:' + icon;
                img.alt = condition;
                img.style.display = 'block';
                box.querySelector('.temp').textContent = temp + '°C';
                box.querySelector('.condition').textContent = condition;
                box.querySelector('.extra').textContent = `💧 ${humidity}% | 💨 ${wind} km/h`;

                let bgImage = 'url("https://images.pexels.com/photos/54319/pexels-photo-54319.jpeg")'; 
                let bgColor = 'transparent';
                let textColor = 'white';
                
                const conditionLower = condition.toLowerCase();

                if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
                    bgImage = 'url("https://images.pexels.com/photos/125510/pexels-photo-125510.jpeg")'; 
                } else if (conditionLower.includes('cloud') || conditionLower.includes('overcast')) {
                    bgImage = isDay ? 'url("https://images.pexels.com/photos/158163/clouds-cloudporn-weather-lookup-158163.jpeg")' : 'url("https://images.pexels.com/photos/414515/pexels-photo-414515.jpeg")'; 
                } else if (conditionLower.includes('sunny') || conditionLower.includes('clear')) {
                    const dayBg = 'url("https://images.pexels.com/photos/296234/pexels-photo-296234.jpeg")'; 
                    const nightBg = 'url("https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg")';
                    bgImage = isDay ? dayBg : nightBg;
                    bgColor = 'transparent';
                    textColor = isDay ? '#2d3436' : 'white';
                } else if (conditionLower.includes('snow') || conditionLower.includes('sleet')) {
                    bgImage = 'url("https://images.pexels.com/photos/730256/pexels-photo-730256.jpeg")'; 
                    textColor = '#2d3436'; 
                } else if (conditionLower.includes('mist') || conditionLower.includes('fog')) {
                    bgImage = 'url("https://images.pexels.com/photos/1287075/pexels-photo-1287075.jpeg")';
                    bgColor = 'transparent';
                    textColor = 'white';
                } else if (conditionLower.includes('thunder')) {
                    bgImage = 'url("https://images.pexels.com/photos/1114688/pexels-photo-1114688.jpeg")'; 
                }
                
                box.style.backgroundImage = bgImage;
                box.style.backgroundColor = bgColor;
                box.style.backgroundSize = 'cover';
                box.style.backgroundPosition = 'center';
                box.style.color = textColor;
                
                box.style.textShadow = textColor === 'white' ? '2px 2px 4px rgba(0,0,0,0.8)' : 'none';
            })
            .catch(error => {
                console.error(`Error fetching weather for ${cityName}:`, error);
                const box = document.getElementById(boxId);
                if (box) {
                    box.innerHTML = `<h3>${cityName}</h3><p style="font-size: 14px; color: #ff7675;">Error: ${error.message}</p>`;
                }
            });
    };

    cities.forEach(city => fetchWeatherForBox(city.name, city.id));

    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            const query = document.getElementById('citySearch').value;
            if (query.trim() !== '') {
                window.location.href = `weather.html?city=${encodeURIComponent(query)}`;
            }
        });
    }

    const contactForm = document.getElementById('fakeContactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = contactForm.querySelector('input[type="text"]').value;
            alert(`Thanks for reaching out, ${name}! Your message has been "sent" successfully.`);
            contactForm.reset();
        });
    }
});
