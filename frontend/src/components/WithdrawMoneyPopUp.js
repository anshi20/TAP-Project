import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

const WithdrawMoneyPopUp = ({ setwithdrawMoneyPopUp, settotalmoney, money }) => {
    const [quantity, setQuantity] = useState(1);
    const [err, seterr] = useState()
    const handleBuy = async () => {
        // console.log(quantity)
        // console.log(money)
        if(quantity>money){
            seterr("Not enough money")
        }else{
            const response = await axios.get(`http://127.0.0.1:5000/withdraw_money/${quantity}`)
        // console.log(response.data[0]["money"])
        settotalmoney(response.data[0]["money"])
        setwithdrawMoneyPopUp(false);
        }
    };
    return (
        <Dialog open={true}>
            <DialogTitle>Withdraw Money</DialogTitle>
            <DialogContent>
                <TextField
                    label="Value"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    fullWidth
                    margin="normal"
                />
            </DialogContent>
            {err ? <div style={{ color: "#FF0000", marginLeft: '20px' }}>{err}</div> : ""}
            <DialogActions>
                <Button onClick={() => setwithdrawMoneyPopUp(false)} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleBuy} color="primary">
                    Withdraw
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default WithdrawMoneyPopUp;
