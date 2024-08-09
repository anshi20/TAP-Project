// StockRow.js
import React, { useState } from 'react';
import BuyStockPopup from './BuyStockPopup';

const StockRow = ({ stock }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBuyClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <tr>
      <td>{stock.symbol}</td>
      <td>{stock.price}</td>
      <td>{stock.change}</td>
      <td>
        <button onClick={handleBuyClick}>Buy</button>
      </td>
      <BuyStockPopup open={isModalOpen} handleClose={handleCloseModal} stock={stock} />
    </tr>
  );
};

export default StockRow;
