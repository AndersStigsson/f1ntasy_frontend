import { Card, CardActionArea, CardContent, CardMedia, Grid, ListItem, Typography, List, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction } from "@material-ui/core";
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Driver } from "./SelectionPage";
import { SaveButton } from "./SaveButton";


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
  flag: {
        width: theme.spacing(6),
        height: theme.spacing(6),
  },
  driverHead:{
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  driverListItem: {
      backgroundColor: "rgb(0,0,0,0.7)",
      '&:hover' : {
        backgroundColor: 'rgb(0,29,54)',
      }
  },
  driverListItemText: {
      color: "#C4C4C4"
  }
}));



export const DriversList = (props : any) => {
    const classes = useStyles();
    var drivers = props.drivers;
    // drivers.sort((a:Driver,b:Driver) => a.top5 > b.top5 ? 1: -1)

    return(
        <Grid container>
            <Grid item xs={12}>
                <SaveButton />
            </Grid>
            <List >
            {
                drivers.map((driver:Driver) => {
                        return (<DriverCard classes={driver.top5 ? classes.top5 : ""} key={driver.lname} click={props.click} name={`${driver.fname} ${driver.lname}`} team={driver.teamname} image={driver.image} driver={driver}></DriverCard>)
                    
                })
            }
            </List>
            <Grid item xs={12}>
                <SaveButton />
            </Grid>
        </Grid>
    )
}


export const DriverCard = (props: any) => {
    const classes = useStyles();
    var driver = props.driver;

    function handleClick(){
        props.click(driver); 
    }
    
    return(
        <ListItem onClick={handleClick} className={classes.driverListItem}>
            <ListItemAvatar>
                <Avatar src={props.image} className={classes.driverHead}>
                </Avatar>
            </ListItemAvatar>
            <ListItemText className={classes.driverListItemText}>
            {props.name}, {props.team}
            </ListItemText>
            <Avatar variant="square" src={driver.flag}>
            </Avatar>
            
        </ListItem>
    )
}