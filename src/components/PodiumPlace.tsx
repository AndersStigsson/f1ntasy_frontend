import { Card, CardActionArea, CardContent, CardMedia, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { Driver } from "./SelectionPage";

interface PodiumPlaceProps {
    position: number;
    driver: Driver;
    click: (position: number, handleSelectedPosition: any) => void;
    selectedPosition: number;
    handleSelectedPosition: any;
}

const positions: string[] = ["1st", "2nd", "3rd", "4th", "5th"]

const useStyles = makeStyles((theme) => ({
    media: {
        alignContent: "right"
      },
    selected: {
        border: "6px solid black",
    },
    logo: {
        width: theme.spacing(10),
        position: "absolute",
        "@media screen and (max-width: 900px)": {
            right: "0",
            top: "0"            
        },
        right: "15",
        top: "10"

    },
    position: {
        paddingLeft: theme.spacing(3),
        color: "#000000",
    },
    mcl: {
        // backgroundColor: "#ff9800"
        border: `${theme.spacing(1)}px solid #ff9800`
    },
    hft: {
        border: `${theme.spacing(1)}px solid #ffffff`
    },
    aft: {
        border: `${theme.spacing(1)}px solid #0090ff`
    },
    amr: {
        border: `${theme.spacing(1)}px solid #006f62`
    },
    arr: {
        border: `${theme.spacing(1)}px solid #900000`
    },
    fer: {
        border: `${theme.spacing(1)}px solid #dc0000`
    },
    mer: {
        border: `${theme.spacing(1)}px solid #00d2be`
    },
    rbr: {
        border: `${theme.spacing(1)}px solid #0600ef`,
    },
    sat: {
        border: `${theme.spacing(1)}px solid #2b4562`
    },
    wil: {
        border: `${theme.spacing(1)}px solid #00faff`
    },
    first: {
        background: "linear-gradient(to bottom,  #fceabb 0%,#fccd4d 50%,#f8b500 51%,#fbdf93 100%)"
    },
    second: {
        background: "linear-gradient(to bottom,  #f2f6f8 0%,#d8e1e7 50%,#b5c6d0 51%,#e0eff9 100%)"
    },
    third: {
        background: "linear-gradient(to bottom,  #f3e2c7 0%,#c19e67 50%,#b68d4c 51%,#e9d4b3 100%)"
    },
    fourth: {
        background: "linear-gradient(to bottom,  #4c4c4c 0%,#595959 12%,#666666 25%,#474747 39%,#2c2c2c 50%,#000000 51%,#111111 60%,#2b2b2b 76%,#1c1c1c 91%,#131313 100%)",
        color: "#FFFFFF"
    },
    fifth: {
        background: "linear-gradient(to bottom,  #4c4c4c 0%,#595959 12%,#666666 25%,#474747 39%,#2c2c2c 50%,#000000 51%,#111111 60%,#2b2b2b 76%,#1c1c1c 91%,#131313 100%)",
        color: "#FFFFFF"
    }

}));

export const PodiumPlace = (props: PodiumPlaceProps) => {
    const classes = useStyles();
    const selected = props.position === props.selectedPosition;
    function handlePodiumClicked(){
        props.click(props.position, props.handleSelectedPosition);
    }

    let positionClasses : any = [classes.first, classes.second, classes.third, classes.fourth, classes.fifth]

    if(props.driver === undefined) {
        return(
            <>
            <Grid item xs={props.position === 4 ? 1: 3}></Grid>
                <Grid item md={4} xs={12}>
                    <Typography variant="h2" className={`${classes.position} ${positionClasses[props.position]}`}>{positions[props.position]}</Typography>
                    <Card className={selected? classes.selected : ""} onClick={handlePodiumClicked} >
                    <CardActionArea>
                        <CardMedia
                            
                            // className={classes.media}
                        >

                        </CardMedia>
                    </CardActionArea>
                    <CardContent>
                    </CardContent>
                </Card>
            </Grid>    
        </>
        )
    }
    let teamClasses : any = {
        "mcl": classes.mcl, 
        "hft": classes.hft,
        "aft":classes.aft,
        "amr":classes.amr,
        "arr": classes.arr,
        "fer": classes.fer,
        "mer":classes.mer,
        "rbr":classes.rbr,
        "sat":classes.sat,
        "wil":classes.wil
    }
    
    return(
        <>
            <Grid item md={props.position === 4 ? 1: 3}></Grid>
            <Grid item md={4} xs={12}>
            <Typography variant="h2" className={`${classes.position} ${positionClasses[props.position]}`}>{positions[props.position]}</Typography>
                <Card className={selected? classes.selected : ""} onClick={handlePodiumClicked} >
                    <CardActionArea>
                        <CardMedia
                            // className={classes.media}
                            // image={props.driver.image}
                            className={teamClasses[props.driver.team]}
                            
                            >
                                <img alt="driver" src={props.driver.image}></img>
                                <img alt="team" src={props.driver.logo} className={classes.logo}></img>
                            <Typography>Name: {`${props.driver.fname} ${props.driver.lname}`}</Typography>
                            <Typography>Team: {props.driver.teamname}</Typography>
                        </CardMedia>
                        
                    </CardActionArea>
                </Card>

            </Grid>
        </>
    )
}