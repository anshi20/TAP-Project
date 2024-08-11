import React, { useState, useEffect } from 'react';
import './NasdaqNews.css'; // Import the CSS file

// Replace this with your NewsAPI Key
const NEWS_API_KEY = '6d9b1ef540ae4d0f9740726d51c67d8a';

const NasdaqNews = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `https://newsapi.org/v2/everything?q=NASDAQ&apiKey=${NEWS_API_KEY}`
                );
                const data = await response.json();
                if (data.articles) {
                    setArticles(data.articles);
                } else {
                    setError('No news articles found.');
                }
            } catch (err) {
                setError('Failed to fetch news.');
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (loading) return <div className="news-loading">Loading...</div>;
    if (error) return <div className="news-error">{error}</div>;

    return (
        <div className="news-container" >
            <h1>NASDAQ News</h1>
            {articles.length === 0 ? (
                <p>No news articles available.</p>
            ) : (
                <div className="news-grid">
                    {articles.slice(0, 17).map((article, index) => (
                        <div key={index} className="news-box">
                            <h2>
                                <a href={article.url} target="_blank" rel="noopener noreferrer">
                                    {article.title}
                                </a>
                            </h2>
                            <p><strong>Source:</strong> {article.source.name}</p>
                            <p><strong>Published:</strong> {new Date(article.publishedAt).toLocaleDateString()}</p>
                            <p>{article.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NasdaqNews;
