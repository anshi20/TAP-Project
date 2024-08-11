import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StockTable from './StockTable';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import BuyStockPopup from './BuyStockPopup';
import Container from '@mui/material/Container';
const StocksPage = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const apiKey = '9ea112040b274b1f94dd6a08f714d4f5';

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get('https://api.twelvedata.com/stocks', {
          params: {
            apikey: apiKey,
            exchange: 'NASDAQ',
          },
        });

        const stocksData = response.data.data
          .filter(stock => stock.symbol && stock.symbol.length > 1)
          .map(stock => ({
            symbol: stock.symbol,
            name: stock.name,
            currency: stock.currency,
            exchange: stock.exchange,
            price: null,
          }));

          setStocks(stocksData)

        // Fetch current price for each stock
        // const stocksWithPrices = await Promise.all(stocksData.map(async (stock) => {
        //   try {
        //     const priceResponse = await axios.get('https://api.twelvedata.com/time_series', {
        //       params: {
        //         apikey: apiKey,
        //         symbol: stock.symbol,
        //         // interval: '1min',
        //         outputsize: 1, // Get only the latest data
        //       },
        //     });
        //     console.log(priceResponse.data)
        //     const latestPrice = await priceResponse.data?.values?.[0]?.close || 'N/A';
        //     return { ...stock, price: latestPrice };
        //   } catch {
        //     return { ...stock, price: 'N/A' };
        //   }
        // }));

        // setStocks(stocksWithPrices);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch stock data');
        setLoading(false);
      }
    };

    fetchStockData();
  }, [apiKey]);

  const filteredStocks = stocks
    .filter(stock => 
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, 10);

  const handleClickOpen = (stock) => {
    setSelectedStock(stock);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedStock(null);
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Container sx={{ flexGrow: 1, padding: '16px' }}>
      <h1>Stocks</h1>
      <Box mb={2}>
        <TextField 
          label="Search by Symbol or Name" 
          variant="outlined" 
          fullWidth 
          value={searchTerm} 
          onChange={e => setSearchTerm(e.target.value)} 
        />
      </Box>
      {Array.isArray(filteredStocks) && filteredStocks.length > 0 ? (
        <StockTable 
          stocks={filteredStocks} 
          onBuyClick={handleClickOpen} 
        />
      ) : (
        <p>No stock data available</p>
      )}
      {selectedStock && (
        <BuyStockPopup 
          open={open} 
          handleClose={handleClose} 
          stock={selectedStock} 
        />
      )}
    </Container>
  );
};

export default StocksPage;
