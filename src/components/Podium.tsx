import { Card, CardActionArea, CardContent, CardMedia, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { Driver } from "./SelectionPage";
import { PodiumPlace } from "./PodiumPlace";
interface PodiumProps{
    drivers: Driver[];
    click: (position: number) => void;
    selectedPosition: number;
};

const useStyles = makeStyles({
    DriverPosition: {
        height: "150px"
    },
    media: {
        // height: 180,
      },
});

const positions: string[] = ["Winner", "Second Place", "Third Place", "Fourth Place", "Fifth Place"]

export const Podium = (props: PodiumProps) => {
    const classes = useStyles();
    var drivers = props.drivers;
    const position = props.selectedPosition;
    var j = 0;
    return(
        <Grid container>
            <PodiumPlace selectedPosition={position} click={props.click} position={0} driver={drivers[0]}></PodiumPlace>
            <PodiumPlace selectedPosition={position} click={props.click} position={1} driver={drivers[1]}></PodiumPlace>
            <PodiumPlace selectedPosition={position} click={props.click} position={2} driver={drivers[2]}></PodiumPlace>
            <PodiumPlace selectedPosition={position} click={props.click} position={3} driver={drivers[3]}></PodiumPlace>
            <PodiumPlace selectedPosition={position} click={props.click} position={4} driver={drivers[4]}></PodiumPlace>
        </Grid>
    )
}


/*
{drivers.map((driver) => {
    if(driver.top5){
        return(
            <>
            <Grid item xs={4}></Grid>
                <Grid item xs={4}>
                    <Typography variant="h2">{positions[driver.guessedPosition]}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Card onClick={(e: any) => handleDriverClicked(e, driver)}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image={driver.image}
                            >

                            </CardMedia>
                        </CardActionArea>
                        <CardContent>
                            <Typography>Name: {driver.name}</Typography>
                            <Typography>Team: {driver.team}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                
            </>
        )
    }

})}



*/