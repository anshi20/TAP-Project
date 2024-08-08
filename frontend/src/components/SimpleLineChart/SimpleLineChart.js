import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
];

export default function SimpleLineChart() {
  return (
    <LineChart
      width={800}
      height={300}
      series={[
        { data: pData, label: 'Current' },
        { data: uData, label: 'Invested' },
      ]}
      xAxis={[{ scaleType: 'point', data: xLabels }]}
    />
  );
}