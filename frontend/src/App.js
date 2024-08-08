import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrimarySearchAppBar from './components/PrimarySearchAppBar/PrimarySearchAppBar';
import StickySidebar from './components/StickySidebar/StickySidebar';
import SimpleLineChart from './components/SimpleLineChart/SimpleLineChart';
import PieChartWithCenterLabel from './components/PieChartWithCenterLabel/PieChartWithCenterLabel';
import SpanningTable from './components/SpanningTable/SpanningTable';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

// Import pages
import AssetsPage from './components/AssetsPage';
import TransactionsPage from './components/TransactionsPage'; // Ensure this component exists
import StocksPage from './components/StocksPage'; // Ensure this component exists

function App() {
  return (
    <Router>
      <Box>
        <PrimarySearchAppBar />
        <Box sx={{ display: 'flex' }}>
          <StickySidebar />
          <Container sx={{ flexGrow: 1, padding: '16px' }}>
            <Routes>
              <Route path="/" element={
                <Box>
                  <Box sx={{ display: 'flex', gap: '16px' }}>
                    <Box sx={{ flex: 1 }}>
                      <SimpleLineChart />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <PieChartWithCenterLabel />
                    </Box>
                  </Box>
                  <SpanningTable />
                </Box>
              } />
              <Route path="/assets" element={<AssetsPage />} />
              <Route path="/transactions" element={<TransactionsPage />} />
              <Route path="/stocks" element={<StocksPage />} />
            </Routes>
          </Container>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
