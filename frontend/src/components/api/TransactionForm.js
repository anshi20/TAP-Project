import React, { useState, useEffect } from 'react';

const TransactionForm = () => {
    const [ticker, setTicker] = useState('AAPL'); // Default ticker value
    const [apiKey, setApiKey] = useState('53f0f2a6407c465aaee989a464d20198'); // Default API key
    const [message, setMessage] = useState(''); // State to handle messages (success/error)
    const [allTransactions, setAllTransactions] = useState([]); // State to hold all transactions
    const [specificTransaction, setSpecificTransaction] = useState(null); // State to hold specific transaction
    const [symbol, setSymbol] = useState(''); // State for the specific transaction symbol

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://127.0.0.1:5000/transactions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ticker, api_key: apiKey }), // Send ticker and API key
        });

        const data = await response.json();

        if (response.ok) {
            setMessage(`Success: ${data.message}`);
            fetchAllTransactions(); // Refresh the list of transactions
            setTicker('AAPL'); // Reset to default ticker
            setApiKey('53f0f2a6407c465aaee989a464d20198'); // Reset to default API key
        } else {
            setMessage(`Error: ${data.message}`);
        }
    };

    const fetchAllTransactions = async () => {
        const response = await fetch('http://127.0.0.1:5000/transactions', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        if (response.ok) {
            setAllTransactions(data.transactions);
        } else {
            setMessage(`Error fetching transactions: ${data.message}`);
        }
    };

    const fetchSpecificTransaction = async () => {
        const response = await fetch(`http://127.0.0.1:5000/transactions/${symbol}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        if (response.ok) {
            setSpecificTransaction(data); // Store the specific transaction
            setMessage(''); // Clear previous messages
        } else {
            setMessage(`Error fetching transaction: ${data.message}`);
            setSpecificTransaction(null); // Reset specific transaction on error
        }
    };

    const deleteTransaction = async () => {
        const response = await fetch(`http://127.0.0.1:5000/transactions/${symbol}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        if (response.ok) {
            setMessage(`Success: ${data.message}`);
            fetchAllTransactions(); // Refresh the list of transactions
            setSpecificTransaction(null); // Clear specific transaction details
            setSymbol(''); // Clear the input for symbol
        } else {
            setMessage(`Error deleting transaction: ${data.message}`);
        }
    };

    useEffect(() => {
        fetchAllTransactions(); // Fetch all transactions when component mounts
    }, []);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={ticker}
                    onChange={(e) => setTicker(e.target.value)}
                    placeholder="Enter ticker"
                    required
                />
                <input
                    type="text"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter API Key"
                    required
                />
                <button type="submit">Add Transaction</button>
            </form>
            {message && <p>{message}</p>} {/* Display the message */}

            <h2>Fetch Specific Transaction</h2>
            <input
                type="text"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                placeholder="Enter transaction symbol"
            />
            <button onClick={fetchSpecificTransaction}>Get Transaction</button>
            <button onClick={deleteTransaction}>Delete Transaction</button>

            {specificTransaction && (
                <div>
                    <h3>Transaction Details:</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Symbol</th>
                                <th>Currency</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{specificTransaction.name}</td>
                                <td>{specificTransaction.price}</td>
                                <td>{specificTransaction.symbol}</td>
                                <td>{specificTransaction.currency}</td>
                                <td>{specificTransaction.date_time}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}

            <h2>All Transactions</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Symbol</th>
                        <th>Currency</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {allTransactions.map((transaction) => (
                        <tr key={transaction.symbol}>
                            <td>{transaction.name}</td>
                            <td>{transaction.price}</td>
                            <td>{transaction.symbol}</td>
                            <td>{transaction.currency}</td>
                            <td>{transaction.date_time}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionForm;
