import React, { useState, useEffect, useRef } from 'react';

// Replace this with your Twelve Data API Key
const TWELVE_DATA_API_KEY = '53f0f2a6407c465aaee989a464d20198';

// Function to create the TradingView widget
const createTradingViewWidget = (symbol, container) => {
    if (!window.TradingView) {
        console.error('TradingView library not loaded');
        return;
    }
    new window.TradingView.widget({
        autosize: true,
        symbol: symbol,
        interval: 'D',
        container_id: container,
        datafeed: new window.Datafeeds.UDFCompatibleDatafeed(`https://api.twelvedata.com/time_series?interval=1day&symbol=${symbol}&apikey=${TWELVE_DATA_API_KEY}`),
        library_path: 'https://s3.tradingview.com/',
        locale: 'en',
        disabled_features: ['header_widget', 'timeframes_toolbar'],
        enabled_features: ['study_templates'],
    });
};

const StockChart = () => {
    const [symbol, setSymbol] = useState('AAPL'); // Default symbol
    const chartContainerRef = useRef(null);

    // Initialize chart on mount and whenever the symbol changes
    useEffect(() => {
        if (chartContainerRef.current) {
            createTradingViewWidget(symbol, chartContainerRef.current.id);
        }
    }, [symbol]);

    // Handle search input
    const handleSearch = () => {
        const inputSymbol = document.getElementById('symbolInput').value.toUpperCase();
        if (inputSymbol) {
            setSymbol(inputSymbol);
        } else {
            alert('Please enter a company symbol.');
        }
    };

    // Handle Enter key for search input
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSearch();
        }
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>TradingView Chart with Symbol Search</h1>
            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    id="symbolInput"
                    placeholder="Enter company symbol (e.g., AAPL)"
                    onKeyPress={handleKeyPress}
                />
                <button onClick={handleSearch} style={{ marginLeft: '10px' }}>
                    Show Chart
                </button>
            </div>
            <div
                id="chartContainer"
                ref={chartContainerRef}
                style={{ margin: '0 auto', width: '80%', height: '500px' }}
            ></div>
        </div>
    );
};

export default StockChart;
