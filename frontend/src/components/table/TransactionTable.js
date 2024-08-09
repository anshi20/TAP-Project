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

export default function TransactionTable() {
    const [stockData, setstockData] = React.useState([])

    React.useEffect(() => {
        const getStockData = async () => {
            const response = await axios.get("http://127.0.0.1:5000/all_holdings")
            console.log(response.data)
            setstockData(response.data)
        }
        getStockData()
    }, [])
    return (
        <div className='mt-20'>
            <TableContainer component={Paper}>
                <Table aria-label="">
                    <TableHead>
                        <TableRow>
                            <TableCell>Symbol</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell >Average Price</TableCell>
                            <TableCell >Volume</TableCell>
                            {/* <TableCell align="right">Total</TableCell> */}
                        </TableRow>
                    </TableHead>
                    {stockData && stockData.map((row) => {
                        console.log(row)
                        return (
                            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                                <TableCell component="th" scope="row">
                                    {row.symbol}
                                </TableCell>
                                <TableCell >{row.name}</TableCell>
                                <TableCell >{row.avg_cost}</TableCell>
                                <TableCell >{row.volume}</TableCell>
                            </TableRow>
                        )
                    })}
                </Table>
            </TableContainer>
        </div>
    );
}