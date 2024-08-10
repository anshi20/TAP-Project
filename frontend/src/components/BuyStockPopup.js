import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

const BuyStockPopup = ({ open, handleClose, stock }) => {
  // console.log(stock)
  const [quantity, setQuantity] = useState(1);
  const [latestPrice, setlatestPrice] = useState()
  const [err, seterr] = useState()
  const handleBuy = async () => {
    // console.log(`Buying ${quantity} of ${stock.symbol}`);
    const money = await axios.get("http://127.0.0.1:5000/get_money");
    console.log(latestPrice*quantity)
    if (latestPrice * quantity > money.data) {
      seterr("Not enough amount")
    } else {
      const response = await axios.post("http://127.0.0.1:5000/buy", { transaction_type: "BUY", name: stock.name, symbol: stock.symbol, price: Number(latestPrice), volume: Number(quantity) })
      console.log(response.data)
      handleClose();
    }

    
  };

  useEffect(() => {
    const getLatestPrice = async () => {
      if (!stock) return
      const priceResponse = await axios.get('https://api.twelvedata.com/time_series', {
        params: {
          apikey: "e1bc70cf081c45e49b2b88b25873f2c6",
          symbol: stock.symbol,
          interval: '1min',
          outputsize: 1,
        },
      });
      const price = await priceResponse.data?.values?.[0]?.close || 'N/A';
      console.log(price)
      setlatestPrice(price)
    }
    getLatestPrice()
  }, [stock])

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
      <div style={{ marginLeft: '20px' }}>Current Price: {latestPrice}</div>
      {err ? <div style={{ color: "#FF0000" , marginLeft: '20px'}}>{err}</div> : ""}
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
