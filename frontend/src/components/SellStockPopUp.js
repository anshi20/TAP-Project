import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

const SellStockPopup = ({ setsellStockSelected, sellStockSelected, refresh, setrefresh }) => {
    console.log(sellStockSelected)
    const [quantity, setQuantity] = useState(1);
    const [latestPrice, setlatestPrice] = useState()
    const [err, seterr] = useState()

    const handleSell = async () => {
        if (quantity > sellStockSelected.volume) {
            seterr("Selling quantity more than available")
        } else {
            const response = await axios.post("http://127.0.0.1:5000/sell", { name: sellStockSelected.name, symbol: sellStockSelected.symbol, current_price: Number(latestPrice), volume: Number(quantity) })
            console.log(response.data)
            if (response.data) {
                setrefresh(!refresh)
                setsellStockSelected();
            }
        }
    };
    useEffect(() => {
        const getLatestPrice = async () => {
            if(!sellStockSelected) return
            const priceResponse = await axios.get('https://api.twelvedata.com/time_series', {
                params: {
                    apikey: "e1bc70cf081c45e49b2b88b25873f2c6",
                    symbol: sellStockSelected.symbol,
                    interval: '1min',
                    outputsize: 1,
                },
            });
            const price = await priceResponse.data?.values?.[0]?.close || 'N/A';
            console.log(price)
            setlatestPrice(price)
        }
        getLatestPrice()
    }, [sellStockSelected])
    return (
        <Dialog open={true}>
            <DialogTitle>Sell {sellStockSelected.symbol}'s Stocks</DialogTitle>
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
            <div style={{paddingLeft:'20px'}}>Current Price: {latestPrice}</div>
            {err ? <div style={{ color: "#FF0000" }}>{err}</div> : ""}
            <DialogActions>
                <Button onClick={() => setsellStockSelected()} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleSell} color="primary">
                    Sell
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SellStockPopup;
