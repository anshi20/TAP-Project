import * as React from 'react'
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
import SellStockPopup from '../SellStockPopUp';
import Button from '@mui/material/Button';


import axios from 'axios'

export default function DropDown({ symbol, row, refresh, setrefresh }) {
    const [open, setOpen] = React.useState(false);
    const [stockData, setstockData] = React.useState([])
    const [sellStockSelected, setsellStockSelected] = React.useState()


    React.useEffect(() => {
        // if(open){
        const getStockData = async () => {
            const response = await axios.get(`http://127.0.0.1:5000/stock_history/${symbol}`)
            console.log(response.data)
            setstockData(response.data)
        }
        getStockData()
        // }
    }, [])

    return (
        <TableBody>
            {sellStockSelected && (
                <SellStockPopup
                    setsellStockSelected={setsellStockSelected}
                    sellStockSelected={sellStockSelected}
                    refresh={refresh} setrefresh={setrefresh}
                />
            )}
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.symbol}
                </TableCell>
                <TableCell >{row.name}</TableCell>
                <TableCell align="right">{row.avg_cost}</TableCell>
                <TableCell align="right">{row.volume}</TableCell>
                <TableCell align="right">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setsellStockSelected(row)}
                    >
                        Sell
                    </Button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                History
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Buy/Sell</TableCell>
                                        <TableCell align="right">Units</TableCell>
                                        <TableCell align="right">Price ($)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {stockData && stockData.map((historyRow) => (
                                        <TableRow key={historyRow.transaction_timestamp}>
                                            <TableCell component="th" scope="row">
                                                {historyRow.transaction_timestamp}
                                            </TableCell>
                                            {historyRow.transaction_type == "BUY" ?
                                                <TableCell sx={{
                                                    color: '#008000',
                                                }}>{historyRow.transaction_type}</TableCell> :
                                                <TableCell sx={{
                                                    color: '#FF0000',
                                                }}>{historyRow.transaction_type}</TableCell>}
                                            <TableCell align="right">{historyRow.volume}</TableCell>
                                            <TableCell align="right">
                                                {historyRow.price}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </TableBody>
    )
}