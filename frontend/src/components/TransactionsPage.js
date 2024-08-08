import React from 'react';
import CollapsibleTable from './table/CollapsibleTable';
function TransactionsPage() {
  return (
    <div>
      <h1>Transactions Page</h1>
      {/* Add content or components specific to the Assets page here */}
      <box>
        <CollapsibleTable />
      </box>
    </div>
  );
}

export default TransactionsPage;
