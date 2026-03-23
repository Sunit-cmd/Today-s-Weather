# 🌦️ Smart City Weather Dashboard

A modern weather dashboard that goes beyond basic temperature display by providing **smart recommendations like "What to Wear"** based on real-time weather conditions.

---

## 🚀 Features

- 🔍 **Search by City** – Get weather details for any city worldwide  
- 📍 **Auto Location Detection** – Uses browser Geolocation API to fetch local weather  
- 📅 **5-Day Forecast** – Plan ahead with extended weather predictions  
- 👕 **Smart Suggestions** – “What to Wear” advice based on conditions  
  - 🌧️ Rain > 20% → "Carry an umbrella!"  
  - ❄️ Cold → "Wear a jacket"  
  - ☀️ Hot → "Light clothes recommended"  
- 🎨 **Dynamic UI**  
  - Background color changes based on temperature  
  - Weather-based icons for better visualization  

---

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS, JavaScript  
- **API:** OpenWeatherMap API  
- **Browser API:** Geolocation API  

---

## 🌐 API Used

- Weather data is fetched from: https://openweathermap.org/api

---

## ⚙️ Installation & Setup

1. Clone the repository
git clone https://github.com/your-username/smart-weather-dashboard.git

2. Navigate to the project folder
cd smart-weather-dashboard

3. Get your API key from OpenWeatherMap

4. Add your API key in the JavaScript file:
const API_KEY = "your_api_key_here";

5. Run the project  
Simply open `index.html` in your browser 🚀

---

## 📍 Geolocation Feature

This app uses the browser's Geolocation API to:
- Detect user’s current location  
- Automatically load local weather on startup  

> ⚠️ Make sure location access is enabled in your browser

---

## 🧠 Smart Logic Example

if (rainProbability > 20) {
  advice = "Bring an umbrella!";
} else if (temperature < 15) {
  advice = "Wear warm clothes!";
} else if (temperature > 30) {
  advice = "Stay hydrated & wear light clothes!";
}

---

## 📌 Future Improvements

- 🌍 Add map integration  
- 📊 Weather charts and analytics  
- 🌙 Dark mode support  
- 📱 Fully responsive mobile UI  

---

## 🤝 Contributing

Contributions are welcome!  
Feel free to fork the repo and submit a pull request.

---

## 📄 License

This project is open-source and available under the MIT License.

---

## ⭐ Acknowledgements

- Thanks to OpenWeatherMap for providing the weather API  
