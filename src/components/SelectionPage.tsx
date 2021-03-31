import { AppBar, Grid, makeStyles, Toolbar} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { DriversList } from "./DriversList";
import { Podium } from "./Podium";
import bgImage from '../media/f1bg.svg';
import logo from '../media/f1ntasy_nofont.svg';
import fetch from 'node-fetch';
export type Driver = {
    fname: string,
    lname: string,
    country: string,
    short: string,
    url: string,
    flag: string, 
    // team: "media" | "selected" | "mcl" | "hft" | "aft" | "amr" | "arr" | "fer" | "mer" | "rbr" | "sat" | "wil", 
    team:string,
    image:string, 
    top5: boolean, 
    guessedPosition: number,
    logo:string,
    teamname: string
}

const useStyles = makeStyles((theme) => ({
    image: {
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover"
    },
    logo: {
        width: theme.spacing(45),
    },
    toolbar: {
        height: theme.spacing(5)
    }
}));


export const SelectionPage = (props: any) => {

    const [drivers, setDrivers] = useState([
        {fname: "Lewis", lname:"Hamilton", country: "", short: "", url:"", flag: "", team : "mer", teamname: "", logo: "", image:"", top5: false, guessedPosition: 0}, 
        {fname: "Max", lname:"Verstappen", country: "", short: "", url:"", flag: "", team: "rbr", teamname: "", logo: "", image:"" , top5: false, guessedPosition: 0},
        {fname: "Valtteri", lname:"Bottas", country: "", short: "", url:"", flag: "", team: "mer", teamname: "", logo: "", image:"", top5: false, guessedPosition: 0},
        {fname: "Sergio", lname:"Perez", country: "", short: "", url:"", flag: "", team: "rbr", teamname: "", logo: "", image:"", top5: false, guessedPosition: 0},
        {fname: "Lando", lname:"Norris", country: "", short: "", url:"", flag: "", team: "mcl", teamname: "", logo: "", image:"", top5: false, guessedPosition: 0},
        {fname: "Daniel", lname:"Ricciardo", country: "", short: "", url:"", flag: "", team: "mcl", teamname: "", logo: "", image:"", top5: false, guessedPosition: 0},
        {fname: "Lance", lname:"Stroll", country: "", short: "", url:"", flag: "", team: "amr", teamname: "", logo: "", image:"", top5: false, guessedPosition: 0},
        {fname: "Sebastian", lname:"Vettel", country: "", short: "", url:"", flag: "", team: "amr", teamname: "", logo: "", image:"", top5: false, guessedPosition: 0},
        {fname: "Esteban", lname:"Ocon", country: "", short: "", url:"", flag: "", team: "aft", teamname: "", logo: "", image:"", top5: false, guessedPosition: 0},
        {fname: "Fernando", lname:"Alonso", country: "", short: "", url:"", flag: "", team: "aft", teamname: "", logo: "", image:"", top5: false, guessedPosition: 0},
        {fname: "Charles", lname:"Leclerc", country: "", short: "", url:"", flag: "", team: "fer", teamname: "", logo: "", image:"", top5: false, guessedPosition: 0},
        {fname: "Carlos", lname:"Sainz", country: "", short: "", url:"", flag: "", team: "fer", teamname: "", logo: "", image:"", top5: false, guessedPosition: 0},
        {fname: "Pierre", lname:"Gasly", country: "", short: "", url:"", flag: "", team: "sat", teamname: "", logo: "", image:"", top5: false, guessedPosition: 0},
        {fname: "Yuki", lname:"Tsunoda", country: "", short: "", url:"", flag: "", team: "sat", teamname: "", logo: "", image:"", top5: false, guessedPosition: 0},
        {fname: "Kimi", lname:"Raikkonen", country: "", short: "", url:"", flag: "", team: "arr", teamname: "", logo: "", image:"", top5: false, guessedPosition: 0},
        {fname: "Antonio", lname:"Giovinazzi", country: "", short: "", url:"", flag: "", team: "arr", teamname: "", logo: "", image:"", top5: false, guessedPosition: 0},
        {fname: "Mick", lname:"Schumacher", country: "", short: "", url:"", flag: "", team: "hft", teamname: "", logo: "", image:"", top5: false, guessedPosition: 0},
        {fname: "Nikita", lname:"Mazepin", country: "", short: "", url:"", flag: "", team: "hft", teamname: "", logo: "", image:"", top5: false, guessedPosition: 0},
        {fname: "George", lname:"Russell", country: "", short: "", url:"", flag: "", team: "wil", teamname: "", logo: "", image:"", top5: false, guessedPosition: 0},
        {fname: "Nicholas", lname:"Latifi", country: "", short: "", url:"", flag: "", team: "wil", teamname: "", logo: "", image:"", top5: false, guessedPosition: 0},
    ]);
    
    const [top5, setTop5] = useState(Array<Driver>(5));
    const [selectedPosition, setSelectedPosition] = useState(-1);
    const classes = useStyles();

    useEffect(() => {
        fetch("http://f1ntasy.com:3001/api/drivers/all")
        .then(res => res.json())
        .then(json => {
            setDrivers(json.drivers);
        })
    },[])

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
                    item.lname === driver.lname 
                    ? {...item, top5 : driver.top5} 
                    : prevDriverOnPosition !== undefined && item.lname === prevDriverOnPosition.lname 
                    ? {...item, top5: !prevDriverOnPosition.top5}
                    : item 
            ));
            
            
            setSelectedPosition(-1);
            
            
        } else {
            console.error("Only 5 drivers can be selected, please remove one if you want to change");
        }
        
    }
    function handlePodiumClicked(position: number){
        setSelectedPosition(position);
    }
    return (
        
        <div className={classes.image}>

            <Grid container>
                <AppBar position="static">
                    
                    <Toolbar className={classes.toolbar}>
                    <img src={logo} className={classes.logo}></img>
                    </Toolbar>
                </AppBar>
                <Grid item xs={6}>
                
                    <DriversList click={handleDriverClicked} drivers={drivers} />
                </Grid>
                <Grid item xs={6}>
                    <Podium click={handlePodiumClicked} drivers={top5} selectedPosition={selectedPosition}/>
                </Grid>
            </Grid>
        </div>
    )
}