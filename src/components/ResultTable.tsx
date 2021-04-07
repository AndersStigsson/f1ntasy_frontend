import { Typography, makeStyles, Grid, Table, TableHead, TableCell, TableBody, TableRow, TableContainer, Paper } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import bgImage from '../media/f1bg.svg';
import { useParams } from "react-router-dom";
import fetch from 'node-fetch';
import { HeaderBar } from './HeaderBar';


const useStyles = makeStyles((theme) => ({
    image: {
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        height: "100vh"
    },
}));

const capitalizeFirstLetter = (word: string) => {
    return word.substring(0,1).toUpperCase() + word.substring(1);
}

 export const ResultTable = (props : any) => {
    const classes = useStyles();
    console.log(props.results)
    if(props.results === undefined || props.results.error){
        return null;
    }
    return (
        <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>
                        Username
                    </TableCell>
                    <TableCell>
                        Number correct position
                    </TableCell>
                    <TableCell>
                        Number correct top 5
                    </TableCell>
                    <TableCell>
                        Total points
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {Object.keys(props.results.userPoints).map((user : any) => {
                   
                   return(
                       <TableRow>
                        <TableCell>
                            {capitalizeFirstLetter(user)}
                        </TableCell>
                        <TableCell>
                            {props.results.userPoints[user].correctPos}
                        </TableCell>
                        <TableCell>
                            {props.results.userPoints[user].correctTop5}
                        </TableCell>
                        <TableCell>
                            {props.results.userPoints[user].totalPoints}
                        </TableCell>
                    </TableRow>
                   )
                   
                })}
            </TableBody>
        </Table>
        </TableContainer>       
    );
}