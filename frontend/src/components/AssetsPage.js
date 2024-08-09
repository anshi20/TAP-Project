import * as React from 'react';
import Container from '@mui/material/Container';
import SpanningTable from './SpanningTable/SpanningTable';
import axios from 'axios';

function AssetsPage() {
  const [transactionData, settransactionData] = React.useState([])

  React.useEffect(() => {
    const getTransactionData = async () => {
      const response = await axios.get("http://127.0.0.1:5000/all_transactions")
      settransactionData(response.data)
    }
    getTransactionData()
  }, [])
  return (
    <Container sx={{ flexGrow: 1, padding: '16px' }}>
      <h1>Transactions</h1>

      <SpanningTable data={transactionData} />

    </Container>
  );
}

export default AssetsPage;
