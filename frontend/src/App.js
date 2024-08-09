// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrimarySearchAppBar from './components/PrimarySearchAppBar/PrimarySearchAppBar';
import StickySidebar from './components/StickySidebar/StickySidebar';
import Box from '@mui/material/Box';

// Import pages
import Main from './Main'; // Import the new Main.js
import AssetsPage from './components/AssetsPage';
import TransactionsPage from './components/TransactionsPage';
import StocksPage from './components/StocksPage';

function App() {
  return (
    <Router>
      <Box>
        <PrimarySearchAppBar />
        <Box sx={{ display: 'flex' }}>
          <StickySidebar />        
          <Routes>
            <Route path="/" element={<Main />} /> {/* Use Main.js as the landing page */}
            <Route path="/assets" element={<AssetsPage />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/stocks" element={<StocksPage />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
