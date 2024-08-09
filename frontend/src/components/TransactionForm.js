import React, { useState } from 'react';

const TransactionForm = () => {
    const [ticker, setTicker] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://127.0.0.1:5000/transactions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ticker }),
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Success:', data.message);
        } else {
            console.error('Error:', data.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={ticker} 
                onChange={(e) => setTicker(e.target.value)} 
                placeholder="Enter ticker" 
                required 
            />
            <button type="submit">Add Transaction</button>
        </form>
    );
};

export default TransactionForm;