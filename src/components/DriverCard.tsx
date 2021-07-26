import { makeStyles, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    flag: {
        display: "block",
        [theme.breakpoints.down('sm')]: {
            display: "none"
        },
        width: theme.spacing(8),
        height: theme.spacing(6),
        paddingLeft: theme.spacing(2)
    },
    flagMobile: {
        display: "none",
        [theme.breakpoints.down('sm')]: {
            display: "block"
        },
        width: theme.spacing(3),
        height: theme.spacing(3),
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
        [theme.breakpoints.down('sm')]: {
            display: "none"
        },
        color: "#C4C4C4"
    },
    driverListItemTextMobile: {
        display: "none",
        [theme.breakpoints.down('sm')]: {
            display: "block"
        },
        color: "#C4C4C4"
    }
}));

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
            <ListItemText className={classes.driverListItemTextMobile}>
            {driver.short}, {props.team}
            </ListItemText>
            <Avatar variant="square" src={driver.flag} className={classes.flag}>
            </Avatar>
            <Avatar variant="square" src={driver.flag} className={classes.flagMobile}>
            </Avatar>
            
        </ListItem>
    )
}