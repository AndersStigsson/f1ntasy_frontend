import { Typography, makeStyles, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import bgImage from '../media/f1bg.svg';
import { useParams } from "react-router-dom";
import fetch from 'node-fetch';
import { HeaderBar } from './HeaderBar';
import { ResultTable } from './ResultTable';
import { UseDrivers } from './UseDrivers';
import { UseSelectedPosition } from './UseSelectedPosition';
import { UseTop5 } from './UseTop5';
import { Driver } from './SelectionPage';
import { DriversList } from './DriversList';
import { Podium } from './Podium';

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
    },
    image: {
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover"
    },
    logo: {
        width: theme.spacing(45),
    },
    toolbar: {
        height: theme.spacing(5)
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    appBar: {
        flexGrow: 1
    },
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    icon: {
        height: theme.spacing(5)
    }
}));


 export const RacePage = () => {
    const classes = useStyles();
    const { id } = useParams<{ id: string }>();
    const [raceInfo, setRaceInfo] = useState<Race>({id: 0, name: "", country:"", date: "", url: ""})
    const [guessResult, setGuessResult] = useState();
    const { drivers, setDrivers } = UseDrivers();
    const { top5, setTop5} = UseTop5();
    const {selectedPosition, setSelectedPosition, handlePodiumClicked} = UseSelectedPosition();
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
    },[]);




    
    function handleDriverClicked( driver: Driver){
        if(selectedPosition > -1){
            
            var tempTop5 = [...top5];
            var prevDriverOnPosition = tempTop5[selectedPosition];
            var driverPosition = -1;
            var i = 0;
            for(var drive of tempTop5){
                if(drive !== undefined && driver.lname === drive.lname){
                    driverPosition = i 
                    break;
                }
                i++;
            }
            
            console.log(driverPosition)
            if( driverPosition > -1){
                var tempDriver = tempTop5[selectedPosition];
                tempTop5[driverPosition] = tempDriver;
            } else {
                driver.top5 = !driver.top5;
            }
            tempTop5[selectedPosition] = driver;
            
            setTop5(tempTop5);

            setDrivers(
                drivers.map(item => 
                    item.id === driver.id 
                    ? {...item, top5 : driver.top5} 
                    : prevDriverOnPosition !== undefined && item.id === prevDriverOnPosition.id 
                    ? {...item, top5: !prevDriverOnPosition.top5}
                    : item 
            ));
            
            
            setSelectedPosition(-1);
            
            
        } else {
            console.error("Only 5 drivers can be selected, please remove one if you want to change");
        }
        
    }
    // function handlePodiumClicked(position: number){
    //     setSelectedPosition(position);
    // }
    var lastGuessTime = new Date();
    lastGuessTime.setHours(lastGuessTime.getHours()-24)
    if(new Date(raceInfo.date) >= lastGuessTime){
        return (
            <div className={classes.image}>
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
                    <Grid item xs={6}>
                    
                        <DriversList click={handleDriverClicked} drivers={drivers} />
                    </Grid>
                    <Grid item xs={6}>
                        <Podium click={handlePodiumClicked} handleSelectedPosition={setSelectedPosition} drivers={top5} selectedPosition={selectedPosition}/>
                    </Grid>
                </Grid>
            </div>
        )
    }
    
    
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