import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import React from "react";
import Thead from '../Thead/Thead';
import { makeStyles } from '@mui/styles';
import Tbody from '../Tbody/Tbody';


const useStyles = makeStyles({
    table: {
        minWidth: 1200,
        // tableLayout: 'fixed',   
    },
  });


export default function DataTable() {

    const classes = useStyles();

    return (
        <TableContainer className="refferals__table-container" component={Paper}>
            <Table className={classes.table}>
                <Thead />
                <Tbody/>
            </Table>
        </TableContainer>
    );
}
