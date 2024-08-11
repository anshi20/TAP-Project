import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrimarySearchAppBar from './components/PrimarySearchAppBar/PrimarySearchAppBar';
import StickySidebar from './components/StickySidebar/StickySidebar';
import Box from '@mui/material/Box';


// Import pages
import AssetsPage from './components/AssetsPage';
import TransactionsPage from './components/TransactionsPage'; // Ensure this component exists
import StocksPage from './components/StocksPage'; // Ensure this component exists
import NewsPage from './components/NewsPage'; 
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
              <Route path="/transactions" element={<AssetsPage />} />
              <Route path="/portfolio" element={<TransactionsPage />} />
              <Route path="/stocks" element={<StocksPage />} />
              <Route path="/news" element={<NewsPage />} />
            </Routes>
          {/* </Container> */}
        </Box>
      </Box>
    </Router>
  );
}

export default App;
