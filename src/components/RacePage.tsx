import { Typography, makeStyles, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import bgImage from '../media/f1bg.svg';
import { useParams } from "react-router-dom";
import fetch from 'node-fetch';
import { HeaderBar } from './HeaderBar';

interface Race {
    id: number;
    name: string;
    country: string;
    date: string;
    url : string;
}

const useStyles = makeStyles((theme) => ({
    image: {
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        height: "100vh"
    },
}));

 export const RacePage = () => {
    const classes = useStyles();
    const { id } = useParams<{ id: string }>();
    const [raceInfo, setRaceInfo] = useState<Race>({id: 0, name: "", country:"", date: "", url: ""})
    // const idNumber = parseInt(id);
    useEffect(() => {
        fetch(`http://f1ntasy.com:3001/api/races/${id}`)
        .then(res => res.json())
        .then(jsondata => {
            setRaceInfo(jsondata.race[0])
        });
    },[])
    
    return (
        <div className={classes.image}>
            <HeaderBar />
            <Grid container>
                <Grid item md={6} xs={6}>
                    <Typography variant="h2">
                        {raceInfo.name}
                    </Typography>
                </Grid>
                <Grid item md={6} xs={6}>
                    <Typography variant="h2">
                        {new Date(raceInfo.date).toLocaleString()}
                    </Typography>
                </Grid>
            </Grid>
        </div>
        
    );
}