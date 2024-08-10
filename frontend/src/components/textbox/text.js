import React, { useEffect, useState } from 'react';
import TextTile from './TextTile';
import './ThreeTileRow.css';
import axios from 'axios';

const ThreeTileRow = () => {
  const [totalmoney, settotalmoney] = useState(0);
  const [totalinvestment, settotalinvestment] = useState(0);

  useEffect(() => {
    const getMoney = async () => {
      const money = await axios.get("http://127.0.0.1:5000/get_money");
      // console.log(money.data)
      settotalmoney(money.data)
    }
    const getInvestment = async () => {
      const investment = await axios.get("http://127.0.0.1:5000/get_investment");
      settotalinvestment(investment.data)
    }
    getMoney();
    getInvestment();
  }, [])

  return (
    <div className="tile-row">
      <TextTile
        title="Tot. Investment"
        content={totalinvestment}
        // footer="-100"
      />
      <TextTile
        title="Wallet"
        content={totalmoney}
      // footer="  ADD"
      />
      <TextTile
        title="Current Value"
        content="78,886.22"
        // footer="−581.79 (0.73%) 1D"
      />
    </div>
  );
};



export default ThreeTileRow;