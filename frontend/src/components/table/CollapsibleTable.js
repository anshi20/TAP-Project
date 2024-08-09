import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import axios from 'axios';
import DropDown from './DropDown';

export default function CollapsibleTable() {
  const [stockData, setstockData] = React.useState([])
  const [refresh, setrefresh] = React.useState(false)

  React.useEffect(() => {
    const getStockData = async () => {
      const response = await axios.get("http://127.0.0.1:5000/all_holdings")
      console.log(response.data)
      setstockData(response.data)
    }
    getStockData()
  }, [refresh])

  return (
    <TableContainer component={Paper}>
      <Table aria-label="">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Symbol</TableCell>
            <TableCell align="right">Average Price</TableCell>
            <TableCell align="right">Volume</TableCell>
            {/* <TableCell align="right">Total</TableCell> */}
          </TableRow>
        </TableHead>
        {/* <TableBody> */}
        {stockData && stockData.map((row) => {
          console.log(row)
          return (
            <DropDown row={row} symbol={row.symbol} refresh={refresh} setrefresh={setrefresh} />
          )
        })}
        {/* </TableBody> */}
      </Table>
    </TableContainer>
  );
}