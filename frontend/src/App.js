import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrimarySearchAppBar from './components/PrimarySearchAppBar/PrimarySearchAppBar';
import StickySidebar from './components/StickySidebar/StickySidebar';
import Box from '@mui/material/Box';


// Import pages
import AssetsPage from './components/AssetsPage';
import TransactionsPage from './components/TransactionsPage'; // Ensure this component exists
import StocksPage from './components/StocksPage'; // Ensure this component exists
import Main from './Main'; // Import the new Main.js


function App() {
  return (
    <Router>
      <Box>
        <PrimarySearchAppBar />
        <Box sx={{ display: 'flex' }}>
          <StickySidebar />
          {/* <Container sx={{ flexGrow: 1, padding: '16px' }}> */}
            <Routes>
              <Route path="/" element={<Main />
                
              } />
              <Route path="/assets" element={<AssetsPage />} />
              <Route path="/transactions" element={<TransactionsPage />} />
              <Route path="/stocks" element={<StocksPage />} />
            </Routes>
          {/* </Container> */}
        </Box>
      </Box>
    </Router>
  );
}

export default App;
