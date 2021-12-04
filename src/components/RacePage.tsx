import { Typography, makeStyles, Grid, Button, Link, Card, CardMedia, CardHeader, Avatar } from '@material-ui/core';
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
import { SaveButton } from './SaveButton';
import { GuessTable } from './GuessTable';
import { createNotEmittedStatement } from 'typescript';

interface Race {
    id: number;
    name: string;
    country: string;
    date: string;
    url : string;
    circuitmap: string;
    quali: string;
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
    },
    circuitCard: {
        marginTop: theme.spacing(5),
        background: "rgba(255,255,255,0.5)"
    },
    circuitCardHeader: {
        background: "rgba(255,255,255,0.8)"
    },
    circuitCardMedia: {
        
    },
    circuitMobile: {
        display: "none",
        width: "100%",
        [theme.breakpoints.down('sm')]: {
            display: "block"
        },
    }, 
    circuitImage: {
        display: 'none',
        width: "100%",
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    }
}));

function secondsToDhms(seconds: number) {
    console.log(seconds);
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600*24));
    var h = Math.floor(seconds % (3600*24) / (3600));
    var m = Math.floor(seconds % (3600) / (60));
    var s = Math.floor(seconds % (60));
    var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
    var hDisplay = h > -1 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute " : " minutes ") : "";
    // var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return dDisplay + hDisplay + mDisplay;
}

 export const RacePage = () => {
    const classes = useStyles();
    const { id } = useParams<{ id: string }>();
    const [raceInfo, setRaceInfo] = useState<Race>({id: 0, name: "", country:"", date: "", url: "", circuitmap: "", quali: ""})
    const [guessResult, setGuessResult] = useState();
    const [everyGuess, setEveryGuess] = useState();
    const [userGuess, setUserGuess] = useState();
    const [quali, setQuali] = useState("");
    const [lastGuessTime, setLastGuessTime] = useState(new Date());
    const [manuallyChanged, setManuallyChanged] = useState(false);
    const [timeUntilDeadline, setTimeUntilDeadline] = useState(0);
    const { drivers, setDrivers } = UseDrivers();
    const { top5, setTop5} = UseTop5();
    const {selectedPosition, setSelectedPosition, handlePodiumClicked} = UseSelectedPosition();


    // const idNumber = parseInt(id);
    useEffect(() => {
        var tempLastGuessTime = new Date();
        fetch(`http://f1ntasy.com:3001/api/races/${id}`)
        .then(res => res.json())
        .then(jsondata => {
            setRaceInfo(jsondata.race[0])
            setQuali(jsondata.race[0].quali);
            
            if(jsondata.race[0].quali === null){
                var tempDate = new Date(jsondata.race[0].date)
                tempDate.setHours(tempDate.getHours()-24)
                tempLastGuessTime = tempDate;
                setLastGuessTime(tempDate);
            } else {
                setLastGuessTime(new Date(jsondata.race[0].quali));
                tempLastGuessTime = new Date(jsondata.race[0].quali);
            }
            console.log(lastGuessTime);
            setTimeUntilDeadline(tempLastGuessTime.getTime() - new Date().getTime())
        });
        fetch(`http://f1ntasy.com:3001/api/results/race/${id}`)
        .then(res => res.json())
        .then(jsondata => {
            setGuessResult(jsondata);
        });
        fetch(`http://f1ntasy.com:3001/api/guesses/race/${id}`)
        .then(res => res.json())
        .then(jsondata => {
            setEveryGuess(jsondata);
        });
        fetch(`http://f1ntasy.com:3001/api/guesses/race/${id}?username=${localStorage.getItem("userid")}`)
        .then(res => res.json())
        .then(jsondata => {

            if(jsondata.guesses.length > 0){
                var basePoint = jsondata.guesses[0];
                var tempTop5 = [];
                var guesses = [basePoint.pos1, basePoint.pos2, basePoint.pos3, basePoint.pos4, basePoint.pos5]
                for(var driver of drivers){
                    if(guesses.includes(driver.id)) {
                        var position = guesses.indexOf(driver.id);
                        tempTop5[position] = driver;
                        setTop5(tempTop5);
                    }
                }
                setManuallyChanged(true);
            }
            
        })
        const interval = setInterval(() => {
            setTimeUntilDeadline(tempLastGuessTime.getTime() - new Date().getTime())
        }, 60000);
        return () => clearInterval(interval);
    },[manuallyChanged, quali]);
    
    console.log(`last guess time is ${lastGuessTime}`);
    const handleSubmit = (raceId: number, guesses : Array<Driver>) => {
        var user = localStorage.getItem("userid");
        var userhash = localStorage.getItem("token");

        var bodyBuild = {raceId: raceId, user: user, guesses: guesses, userhash: userhash};
        fetch(`http://f1ntasy.com:3001/api/guesses/add`,{
            method: "POST",
            body: JSON.stringify(bodyBuild),
            headers: { 'Content-Type': 'application/json' },
        }).then(res => res.json())
        .then(json => {
            if(json.error) {
                window.alert("STOP TRYING TO FOOL ME!");
            } else {
                if(parseInt(json.result.affectedRows) > 0) {
                    window.alert("Succesfully added guess")
                } else {
                    window.alert("Something went wrong, please try again");
                }
            }
            
        })
    }


    
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
    // var lastGuessTime = new Date(raceInfo.date);
    // if(raceInfo.quali !== null) {
    //     lastGuessTime = new Date(raceInfo.quali);
    // } else {
    //     lastGuessTime.setHours(lastGuessTime.getHours()-24) 
    // }
    if(timeUntilDeadline - (lastGuessTime.getTime() - new Date().getTime()) > 250 || timeUntilDeadline === 0) {
        setTimeUntilDeadline(lastGuessTime.getTime() - new Date().getTime())
        console.log(lastGuessTime.getTime() - new Date().getTime())
    }
    
    
    
    if(new Date(raceInfo.date) >= lastGuessTime && new Date() < lastGuessTime){
        return (
            <div className={classes.image}>
                <HeaderBar />
                <Grid container>
                    <Grid item md={12} xs={12}>
                        <Grid item md={12} xs={12}>
                            <Typography variant="h4" className={classes.text}>
                                {raceInfo.name} <Link href={raceInfo.url} target={"_blank"}>Read More </Link>  Deadline in: {secondsToDhms(timeUntilDeadline/1000)}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <Typography variant="h5" className={classes.text}>
                            {new Date(raceInfo.date).toLocaleString("SV-SE").substring(0,16)}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" onClick={() => handleSubmit(raceInfo.id, top5)}>Submit</Button>
                        <DriversList click={handleDriverClicked} drivers={drivers} />
                        <Button variant="contained" onClick={() => handleSubmit(raceInfo.id, top5)}>Submit</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Podium click={handlePodiumClicked} handleSelectedPosition={setSelectedPosition} drivers={top5} selectedPosition={selectedPosition}/>
                        <Card className={classes.circuitCard}>
                            <CardHeader
                                title="Circuit Information"
                                subheader={new Date(raceInfo.date).toLocaleString("SV-SE").substring(0,16)}
                                className={classes.circuitCardHeader}
                            />
                            <CardMedia className={classes.circuitCardMedia}>
                                <img src={raceInfo.circuitmap} className={classes.circuitImage} />
                                <img src={raceInfo.circuitmap} className={classes.circuitMobile} />
                            </CardMedia>

                        </Card>
                        
                    </Grid>
                </Grid>
            </div>
        )
    }

    var resultDate = new Date(raceInfo.date);
    resultDate.setHours(resultDate.getHours() + 2);
    if(new Date(raceInfo.date) > new Date() && new Date(raceInfo.date) > lastGuessTime && new Date() < resultDate){
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
                    <Grid item md={12} xs={12}>
                        <GuessTable guesses={everyGuess} drivers={drivers} afterRace={false} />    
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
                <Grid item md={6} xs={12}>
                    <GuessTable guesses={everyGuess} drivers={drivers} afterRace={true} />    
                </Grid>
                
            </Grid>
        </>
        
    );
}
