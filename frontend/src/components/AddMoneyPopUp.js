import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

const AddMoneyPopUp = ({ setaddMoneyPopUp, settotalmoney }) => {
    const [quantity, setQuantity] = useState(1);
    const [err, seterr] = useState()
    const handleBuy = async () => {
        const response = await axios.get(`http://127.0.0.1:5000/add_money/${quantity}`)
        // console.log(response.data)
        settotalmoney(response.data[0]["money"])
        setaddMoneyPopUp(false);
    };
    return (
        <Dialog open={true}>
            <DialogTitle>Add Money</DialogTitle>
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
                <Button onClick={() => setaddMoneyPopUp(false)} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleBuy} color="primary">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddMoneyPopUp;
