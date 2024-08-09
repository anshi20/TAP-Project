import React from 'react';
import CollapsibleTable from './table/CollapsibleTable';
import Container from '@mui/material/Container';
function TransactionsPage() {
  return (
    <Container sx={{ flexGrow: 1, padding: '16px' }}>
      <h1>Transactions Page</h1>
      {/* Add content or components specific to the Assets page here */}
      <box>
        <CollapsibleTable />
      </box>
    </Container>
  );
}

export default TransactionsPage;
