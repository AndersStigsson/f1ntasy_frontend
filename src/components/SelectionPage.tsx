import { Grid, makeStyles} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { DriversList } from "./DriversList";
import { Podium } from "./Podium";
import bgImage from '../media/f1bg.svg';
import fetch from 'node-fetch';
import { HeaderBar } from "./HeaderBar";
import { UseDrivers } from "./UseDrivers";
import { UseTop5 } from "./UseTop5";
import { UseSelectedPosition } from "./UseSelectedPosition";
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


export const SelectionPage = (props: any) => {

    const { drivers, setDrivers } = UseDrivers();
    const { top5, setTop5} = UseTop5();
    const {selectedPosition, setSelectedPosition, handlePodiumClicked} = UseSelectedPosition();
    // const [top5, setTop5] = useState(Array<Driver>(5));
    // const [selectedPosition, setSelectedPosition] = useState(-1);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const classes = useStyles();


    
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
    // function handlePodiumClicked(position: number){
    //     setSelectedPosition(position);
    // }
    return (
        
        <div className={classes.image}>
            <HeaderBar />
            <Grid container>
                
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