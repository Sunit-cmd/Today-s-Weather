document.addEventListener('DOMContentLoaded', async () => {
    const newsGrid = document.getElementById('newsGrid');
    const newsLoader = document.getElementById('newsLoader');
    const errorMessage = document.getElementById('errorMessage');

    // Helper to get API key from config.js or .env file
    async function getApiKey() {
        // 1. Check if global config exists (works for local files via script tag)
        if (window.APP_CONFIG && window.APP_CONFIG.GNEWS_API_KEY) {
            return window.APP_CONFIG.GNEWS_API_KEY;
        }

        // 2. Fallback to parsing .env file (for servers/build environments)
        try {
            const response = await fetch('.env');
            if (!response.ok) return null;
            const text = await response.text();
            const lines = text.split('\n');
            for (const line of lines) {
                const [key, value] = line.split('=');
                if (key.trim() === 'GNEWS_API_KEY') {
                    return value.trim();
                }
            }
        } catch (error) {
            console.warn('Unable to read .env file directly (expected on file:// protocol).');
            return null;
        }
        return null;
    }

    async function fetchNews(apiKey) {
        if (!apiKey) {
            showError('API Key not found in .env file. Please ensure .env is valid and accessible.');
            return;
        }

        // Query for climate, thunderstorm, and unusual weather events
        const query = 'climate OR thunderstorm OR "extreme weather" OR "weather alert"';
        const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&token=${apiKey}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.errors ? data.errors[0] : 'Failed to fetch news');
            }

            displayNews(data.articles);
        } catch (error) {
            console.error('Error fetching news:', error);
            showError('Unable to load news. Please check your API key and connection.');
        } finally {
            newsLoader.style.display = 'none';
        }
    }

    function displayNews(articles) {
        if (articles.length === 0) {
            showError('No weather-related news found at the moment.');
            return;
        }

        newsGrid.innerHTML = articles.map(article => `
            <div class="news-card">
                <img src="${article.image || 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg'}" alt="${article.title}" class="news-image" onerror="this.src='https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg'">
                <div class="news-content">
                    <span class="news-source">${article.source.name}</span>
                    <h3 class="news-title">${article.title}</h3>
                    <p class="news-description">${article.description}</p>
                    <div class="news-footer">
                        <span class="news-date">${new Date(article.publishedAt).toLocaleDateString()}</span>
                        <a href="${article.url}" target="_blank" class="read-more">Read Full Story →</a>
                    </div>
                </div>
            </div>
        `).join('');
    }

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        newsLoader.style.display = 'none';
    }

    const apiKey = await getApiKey();
    fetchNews(apiKey);
});
