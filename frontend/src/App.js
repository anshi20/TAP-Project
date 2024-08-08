import React from 'react';
import PrimarySearchAppBar from './components/PrimarySearchAppBar/PrimarySearchAppBar'; // Updated path
import StickySidebar from './components/StickySidebar/StickySidebar'; // Updated path
import SimpleLineChart from './components/SimpleLineChart/SimpleLineChart'; // Ensure the path is correct
import PieChartWithCenterLabel from './components/PieChartWithCenterLabel/PieChartWithCenterLabel'; // Updated path
import SpanningTable from './components/SpanningTable/SpanningTable'; // Ensure the path is correct
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

// // Import CSS files for the components
// import './components/PrimarySearchAppBar/PrimarySearchAppBar.css';
// import './components/StickySidebar/StickySidebar.css'; // Ensure this path is correct
// // import './components/PieChartWithCenterLabel/PieChartWithCenterLabel.css'; // Ensure this path is correct
// // import './components/SimpleLineChart.css'; // Ensure this path is correct
// // import './components/SpanningTable.css'; // Ensure this path is correct

function App() {
  return (
    <Box>
      <PrimarySearchAppBar />
      <Box sx={{ display: 'flex' }}>
        <StickySidebar />
        <Container sx={{ flexGrow: 1, padding: '16px' }}>
          <Box sx={{ display: 'flex', gap: '16px' }}>
            {/* Flex container for charts */}
            <Box sx={{ flex: 1 }}>
              <SimpleLineChart />
            </Box>
            <Box sx={{ flex: 1 }}>
              <PieChartWithCenterLabel />
            </Box>
          </Box>
          <SpanningTable />
        </Container>
      </Box>
    </Box>
  );
}

export default App;
