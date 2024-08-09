import React from 'react';
import TextTile from './TextTile';
import './ThreeTileRow.css';

function ThreeTileRow() {
  return (
    <div className="tile-row">
      <TextTile
        title="Tot. Investment"
        content="90000"
        footer="-100"
      />
      <TextTile
        title="Nifty 50"
        content="24,117.00"
        footer="−180.50 (0.74%) 1D"
      />
      <TextTile
        title="Sensex"
        content="78,886.22"
        footer="−581.79 (0.73%) 1D"
      />
    </div>
  );
}

export default ThreeTileRow;
