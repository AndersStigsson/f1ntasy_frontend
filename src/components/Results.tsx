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
    head: {
        background: "linear-gradient(to bottom,  #4c4c4c 0%,#595959 12%,#666666 25%,#474747 39%,#2c2c2c 50%,#000000 51%,#111111 60%,#2b2b2b 76%,#1c1c1c 91%,#131313 100%)",
        color: "#FFFFFF"
      },
}));

const capitalizeFirstLetter = (word: string) => {
    return word.substring(0,1).toUpperCase() + word.substring(1);
}

 export const Results = (props : any) => {
    const classes = useStyles();
    const [guessResult, setGuessResult] = useState<any>();
    // const idNumber = parseInt(id);
    
    useEffect(() => {
        fetch(`http://f1ntasy.com:3001/api/results/all`)
        .then(res => res.json())
        .then(jsondata => {
            console.log(jsondata);
            setGuessResult(jsondata);
        });
    },[])

    if(guessResult === undefined || guessResult.userPoints === undefined || guessResult.error){
        return null;
    }

    return (
        <div className={classes.image}>
            <HeaderBar />

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow >
                            <TableCell className={classes.head}>
                                Username
                            </TableCell>
                            <TableCell className={classes.head}>
                                Number correct position
                            </TableCell>
                            <TableCell className={classes.head}>
                                Number correct top 5
                            </TableCell>
                            <TableCell className={classes.head}>
                                Total points
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.keys(guessResult.userPoints).map((user : any) => {
                        
                        return(
                            <TableRow>
                                <TableCell>
                                    {capitalizeFirstLetter(user)}
                                </TableCell>
                                <TableCell>
                                    {guessResult.userPoints[user].correctPos}
                                </TableCell>
                                <TableCell>
                                    {guessResult.userPoints[user].correctTop5}
                                </TableCell>
                                <TableCell>
                                    {guessResult.userPoints[user].totalPoints}
                                </TableCell>
                            </TableRow>
                        )
                        
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>       
    );
}