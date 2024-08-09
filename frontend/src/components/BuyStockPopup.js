import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const BuyStockPopup = ({ open, handleClose, stock }) => {
  const [quantity, setQuantity] = useState(1);

  const handleBuy = () => {
    console.log(`Buying ${quantity} of ${stock.symbol}`);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Buy {stock.name}</DialogTitle>
      <DialogContent>
        <TextField
          label="Quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleBuy} color="primary">
          Buy
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BuyStockPopup;
