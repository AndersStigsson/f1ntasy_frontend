import { Typography, makeStyles, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import bgImage from '../media/f1bg.svg';
import { useParams } from "react-router-dom";
import fetch from 'node-fetch';
import { HeaderBar } from './HeaderBar';
import { ResultTable } from './ResultTable';

interface Race {
    id: number;
    name: string;
    country: string;
    date: string;
    url : string;
}

const useStyles = makeStyles((theme) => ({
    text: {
        background: "linear-gradient(to bottom,  #4c4c4c 0%,#595959 12%,#666666 25%,#474747 39%,#2c2c2c 50%,#000000 51%,#111111 60%,#2b2b2b 76%,#1c1c1c 91%,#131313 100%)",
        color: "#FFFFFF"
    }
}));


 export const RacePage = () => {
    const classes = useStyles();
    const { id } = useParams<{ id: string }>();
    const [raceInfo, setRaceInfo] = useState<Race>({id: 0, name: "", country:"", date: "", url: ""})
    const [guessResult, setGuessResult] = useState();
    // const idNumber = parseInt(id);
    useEffect(() => {
        fetch(`http://f1ntasy.com:3001/api/races/${id}`)
        .then(res => res.json())
        .then(jsondata => {
            setRaceInfo(jsondata.race[0])
        });
        fetch(`http://f1ntasy.com:3001/api/results/race/${id}`)
        .then(res => res.json())
        .then(jsondata => {
            setGuessResult(jsondata);
        });
    },[])
    
    return (
        <>
            <HeaderBar />
            <Grid container>
                <Grid item md={12} xs={12}>
                    <Typography variant="h4" className={classes.text}>
                        {raceInfo.name}
                    </Typography>
                </Grid>
                <Grid item md={12} xs={12}>
                    <Typography variant="h5" className={classes.text}>
                        {raceInfo.date.replace("T", " ").substring(0,16)}
                    </Typography>
                </Grid>
                <Grid item md={6} xs={12}>
                <ResultTable results={guessResult} />
                </Grid>
                
            </Grid>
        </>
        
    );
}