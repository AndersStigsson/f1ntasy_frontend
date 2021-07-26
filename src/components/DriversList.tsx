import { Card, CardActionArea, CardContent, CardMedia, Grid, ListItem, Typography, List, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction } from "@material-ui/core";
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Driver } from "./SelectionPage";
import { SaveButton } from "./SaveButton";
import { DriverCard } from './DriverCard';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 180,
  },
  top5: {
      backgroundColor: "#C4C4C4"
  },

}));



export const DriversList = (props : any) => {
    const classes = useStyles();
    var drivers = props.drivers;
    // drivers.sort((a:Driver,b:Driver) => a.top5 > b.top5 ? 1: -1)

    return(
        <Grid container>
            <List >
            {
                drivers.map((driver:Driver) => {
                        return (<DriverCard classes={driver.top5 ? classes.top5 : ""} key={driver.lname} click={props.click} name={`${driver.fname} ${driver.lname}`} team={driver.teamname} image={driver.image} driver={driver}></DriverCard>)
                    
                })
            }
            </List>
        </Grid>
    )
}


