// src/Main.js
import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import SimpleLineChart from './components/SimpleLineChart/SimpleLineChart';
import PieChartWithCenterLabel from './components/PieChartWithCenterLabel/PieChartWithCenterLabel';
import SpanningTable from './components/SpanningTable/SpanningTable';
import ThreeTileRow from './components/textbox/text';

function Main() {
  return (
    <Container sx={{ flexGrow: 1, padding: '16px' }}>
      <ThreeTileRow />
      <Box sx={{ display: 'flex', gap: '16px' }}>
        <Box sx={{ flex: 1 }}>
          <SimpleLineChart />
        </Box>
        <Box sx={{ flex: 1 }}>
          <PieChartWithCenterLabel />
        </Box>
      </Box>                
      <SpanningTable />
    </Container>
  );
}

export default Main;
