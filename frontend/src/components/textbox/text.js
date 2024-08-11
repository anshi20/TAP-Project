import React, { useEffect, useState } from 'react';
import TextTile from './TextTile';
import './ThreeTileRow.css';
import axios from 'axios';
import AddMoneyPopUp from '../AddMoneyPopUp';
import WithdrawMoneyPopUp from '../WithdrawMoneyPopUp';
import { Button } from '@mui/material';

const ThreeTileRow = () => {
  const [totalmoney, settotalmoney] = useState(0);
  const [totalinvestment, settotalinvestment] = useState(0);
  const [addMoneyPopUp, setaddMoneyPopUp] = useState(false);
  const [withdrawMoneyPopUp, setwithdrawMoneyPopUp] = useState(false);

  useEffect(() => {
    const getMoney = async () => {
      const money = await axios.get("http://127.0.0.1:5000/get_money");
      settotalmoney(money.data);
    };
    const getInvestment = async () => {
      const investment = await axios.get("http://127.0.0.1:5000/get_investment");
      settotalinvestment(investment.data);
    };
    getMoney();
    getInvestment();
  }, []);

  // Format numbers to 2 decimal places
  const formatNumber = (number) => {
    return number.toFixed(2);
  };

  return (
    <div className="tile-row">
      {addMoneyPopUp ?
        <AddMoneyPopUp setaddMoneyPopUp={setaddMoneyPopUp} settotalmoney={settotalmoney} /> : ""}
      {withdrawMoneyPopUp ?
        <WithdrawMoneyPopUp setwithdrawMoneyPopUp={setwithdrawMoneyPopUp} settotalmoney={settotalmoney}  money={totalmoney}/> : ""}
      <TextTile
        title="Tot. Investment"
        content={formatNumber(totalinvestment)}
      />
      <TextTile
        title="Current Value"
        content="78,886.22"
      />
      <TextTile
        title="Wallet"
        content={formatNumber(totalmoney)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => setaddMoneyPopUp(true)}
      >
        Add
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setwithdrawMoneyPopUp(true)}
      >
        Withdraw
      </Button>
    </div>
  );
};

export default ThreeTileRow;
