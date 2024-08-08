import React from 'react';
import './StockWatchlist.css'; // Import the CSS file

const stocks = [
    { name: 'Apple Inc.', price: 175.05, change: 1.24 },
    { name: 'Google LLC', price: 2801.12, change: -0.67 },
    { name: 'Microsoft Corp.', price: 339.67, change: 0.85 },
    { name: 'Amazon.com Inc.', price: 133.32, change: 2.19 },
    { name: 'Tesla Inc.', price: 709.11, change: -1.30 }
];

const StockWatchlist = () => {
    return (
        <div className="container">
            <h1>Stock Watchlist</h1>
            <table className="stock-table">
                <thead>
                    <tr>
                        <th>Company Name</th>
                        <th>Market Price</th>
                        <th>1D Change (%)</th>
                    </tr>
                </thead>
                <tbody>
                    {stocks.map((stock, index) => (
                        <tr key={index}>
                            <td>{stock.name}</td>
                            <td className="price">${stock.price.toFixed(2)}</td>
                            <td className={`change ${stock.change > 0 ? 'positive' : stock.change < 0 ? 'negative' : 'neutral'}`}>
                                {stock.change.toFixed(2)}%
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StockWatchlist;
