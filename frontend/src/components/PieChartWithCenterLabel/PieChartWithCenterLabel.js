import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import './PieChartWithCenterLabel.css'; // Import the CSS file

// Data for the pie chart
const data = [
  { value: 5, label: 'Finance' },
  { value: 10, label: 'Tech' },
  { value: 15, label: 'Energy' },
  { value: 20, label: 'Others' },
];

const size = {
  width: 400,
  height: 300,
};

function PieCenterLabel({ children }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <text className="pie-center-label" x={left + width / 2} y={top + height / 2}>
      {children}
    </text>
  );
}

export default function PieChartWithCenterLabel() {
  return (
    <PieChart series={[{ data, innerRadius: 60 }]} {...size}>
      <PieCenterLabel>Sectors</PieCenterLabel>
    </PieChart>
  );
}