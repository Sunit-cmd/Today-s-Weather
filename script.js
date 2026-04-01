document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'ff946d71bdab40cea1042151261603';
    const cities = [
        { name: 'New Delhi', id: 'box1' },
        { name: 'New York', id: 'box2' },
        { name: 'London', id: 'box3' },
        { name: 'Sydney', id: 'box4' }
    ];

    cities.forEach(city => {
        fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city.name}`)
            .then(response => response.json())
            .then(data => {
                const box = document.getElementById(city.id);
                if (!box) return;

                const temp = data.current.temp_c;
                const condition = data.current.condition.text;
                const icon = data.current.condition.icon;
                const isDay = data.current.is_day;

                
                box.innerHTML = `
                    <h3>${city.name}</h3>
                    <img src="https:${icon}" alt="${condition}">
                    <p><strong>${temp}°C</strong></p>
                    <p>${condition}</p>
                `;

                // Set a highly reliable default Pexels image (sunny)
                let bgImage = 'url("https://images.pexels.com/photos/54319/pexels-photo-54319.jpeg")'; 
                let textColor = 'white';
                
                const conditionLower = condition.toLowerCase();

                if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
                    bgImage = 'url("https://images.pexels.com/photos/125510/pexels-photo-125510.jpeg")'; 
                } else if (conditionLower.includes('cloud') || conditionLower.includes('overcast')) {
                    bgImage = isDay ? 'url("https://images.pexels.com/photos/158163/clouds-cloudporn-weather-lookup-158163.jpeg")' : 'url("https://images.pexels.com/photos/414515/pexels-photo-414515.jpeg")'; 
                } else if (conditionLower.includes('sunny') || conditionLower.includes('clear')) {
                    bgImage = isDay ? 'url("https://images.pexels.com/photos/54319/pexels-photo-54319.jpeg")' : 'url("https://images.pexels.com/photos/113850/pexels-photo-113850.jpeg")'; 
                } else if (conditionLower.includes('snow') || conditionLower.includes('sleet')) {
                    bgImage = 'url("https://images.pexels.com/photos/730256/pexels-photo-730256.jpeg")'; 
                    textColor = '#2d3436'; 
                } else if (conditionLower.includes('mist') || conditionLower.includes('fog')) {
                    bgImage = 'url("https://images.pexels.com/photos/167682/pexels-photo-167682.jpeg")'; 
                    textColor = '#2d3436';
                } else if (conditionLower.includes('thunder')) {
                    bgImage = 'url("https://images.pexels.com/photos/1114688/pexels-photo-1114688.jpeg")'; 
                }
                
                box.style.backgroundImage = bgImage;
                box.style.backgroundSize = 'cover';
                box.style.backgroundPosition = 'center';
                box.style.color = textColor;
                
                box.style.textShadow = textColor === 'white' ? '2px 2px 4px rgba(0,0,0,0.8)' : 'none';
            })
            .catch(error => {
                console.error(`Error fetching weather for ${city.name}:`, error);
                const box = document.getElementById(city.id);
                if (box) {
                    box.innerHTML = `<h3>${city.name}</h3><p>Weather unavailable</p>`;
                }
            });
    });
});
