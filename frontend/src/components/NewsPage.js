import React from 'react';
import Container from '@mui/material/Container';
// import StocksPage from './StocksPage';
import NasdaqNews from './News/NasdaqNews';
function AssetsPage() {
  return (
    <Container sx={{ flexGrow: 1, padding: '16px' }}>
      {/* <h1>Assets</h1> */}
      <NasdaqNews />
      {/* Add content or components specific to the Assets page here */}
      
    </Container>
  );
}

export default AssetsPage;