import React from 'react';
import StockWatchlist from './watchlist/StockWatchlist';
import Container from '@mui/material/Container';

function StocksPage() {
  return (
    <Container sx={{ flexGrow: 1, padding: '16px' }}>
      {/* <h1>Stocks Page</h1> */}
      {/* Add content or components specific to the Assets page here */}
      <StockWatchlist />
    </Container>
  );
}

export default StocksPage;
