import { Button, Grid, Link, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { UseRaceList } from "./GetRaceList";
import bgImage from '../media/f1bg.svg';
import { HeaderBar } from "./HeaderBar";
const useStyles = makeStyles((theme) => ({
    image: {
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        height: "100vh"
    },
    raceText: {
        color: "#FFFFFF",
        flexGrow: 1,
    },
    raceButton: {
        background: "linear-gradient(to bottom,  #4c4c4c 0%,#595959CD 12%,#666666CD 25%,#474747CD 39%,#2c2c2cCD 50%,#000000CD 51%,#111111CD 60%,#2b2b2bCD 76%,#1c1c1cCD 91%,#131313CD 100%)",
        color: "#FFFFFF"
    }
}));

export const RaceListPage = () => {
    const {raceList} = UseRaceList();
    const classes = useStyles();
    return (
        <div className={classes.image}>
            <HeaderBar />
            <Grid container>
                {raceList.map((race) => {
                    return (
                        <Grid item xs={12} className={classes.raceButton}>
                            <Button component="a"  key={race.id} href={`/race/${race.id}`} >
                                <Typography className={classes.raceText}>
                                    {race.name}
                                </Typography>
                                
                            </Button>
                        </Grid>
                    )
                })}
            </Grid>
            
        </div>
    );
}