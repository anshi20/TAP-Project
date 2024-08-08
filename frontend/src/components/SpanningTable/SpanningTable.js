import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { visuallyHidden } from '@mui/utils';

// Constants
const TAX_RATE = 0.07;

// Utility Functions
function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

// Data
const rows = [
  createRow('Paperclips (Box)', 100, 1.15),
  createRow('Paper (Case)', 10, 45.99),
  createRow('Waste Basket', 2, 17.99),
];

// Calculate totals
const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

export default function SpanningTable() {
  const [search, setSearch] = React.useState('');
  const [order, setOrder] = React.useState('asc'); // 'asc' or 'desc'
  const [orderBy, setOrderBy] = React.useState('desc'); // column to sort by

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  // Handle request to sort by a specific column
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Sort the rows
  const sortedRows = React.useMemo(() => {
    return rows
      .filter((row) => row.desc.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => {
        if (orderBy === 'desc') {
          return order === 'asc'
            ? a[orderBy] - b[orderBy]
            : b[orderBy] - a[orderBy];
        } else {
          return order === 'asc'
            ? a[orderBy] - b[orderBy]
            : b[orderBy] - a[orderBy];
        }
      });
  }, [order, orderBy, search]);

  return (
    <Paper sx={{ padding: '16px' }}>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        value={search}
        onChange={handleSearchChange}
        sx={{ marginBottom: '16px' }}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="spanning table">
          <TableHead>
            {/* <TableRow>
              <TableCell align="center" colSpan={3} sx={{ backgroundColor: '#f0f0f0' }}>
                Details
              </TableCell>
              <TableCell align="right" sx={{ backgroundColor: '#f0f0f0' }}>Price</TableCell>
            </TableRow> */}
            <TableRow>
              <TableCell
                sx={{
                  backgroundColor: '#e0e0e0',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
                onClick={() => handleRequestSort('desc')}
                sortDirection={orderBy === 'desc' ? order : false}
              >
                Name
                {orderBy === 'desc' ? (
                  <span style={visuallyHidden}>
                    {order === 'asc' ? 'sorted ascending' : 'sorted descending'}
                  </span>
                ) : null}
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  backgroundColor: '#e0e0e0',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
                onClick={() => handleRequestSort('qty')}
                sortDirection={orderBy === 'qty' ? order : false}
              >
                Qty.
                {orderBy === 'qty' ? (
                  <span style={visuallyHidden}>
                    {order === 'asc' ? 'sorted ascending' : 'sorted descending'}
                  </span>
                ) : null}
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  backgroundColor: '#e0e0e0',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
                onClick={() => handleRequestSort('unit')}
                sortDirection={orderBy === 'unit' ? order : false}
              >
                Price
                {orderBy === 'unit' ? (
                  <span style={visuallyHidden}>
                    {order === 'asc' ? 'sorted ascending' : 'sorted descending'}
                  </span>
                ) : null}
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  backgroundColor: '#e0e0e0',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
                onClick={() => handleRequestSort('price')}
                sortDirection={orderBy === 'price' ? order : false}
              >
                Current
                {orderBy === 'price' ? (
                  <span style={visuallyHidden}>
                    {order === 'asc' ? 'sorted ascending' : 'sorted descending'}
                  </span>
                ) : null}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows.map((row) => (
              <TableRow key={row.desc}>
                <TableCell>{row.desc}</TableCell>
                <TableCell align="right">{row.qty}</TableCell>
                <TableCell align="right">{row.unit}</TableCell>
                <TableCell align="right">{ccyFormat(row.price)}</TableCell>
              </TableRow>
            ))}
            {/* <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
            </TableRow> */}
            {/* <TableRow>
              <TableCell>Tax</TableCell>
              <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
              <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
            </TableRow> */}
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
