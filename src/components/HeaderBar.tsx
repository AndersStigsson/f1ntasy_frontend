import { AppBar, Grid, IconButton, makeStyles, Menu, MenuItem, Toolbar, fade, Typography, InputBase, Button, Link,} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { DriversList } from "./DriversList";
import { Podium } from "./Podium";
import logo from '../media/f1ntasy_nofont.svg';
import fetch from 'node-fetch';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

interface Race {
    id: number;
    name: string;
    country: string;
    date: string;
    url : string;
}

const useStyles = makeStyles((theme) => ({
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

export const HeaderBar = () => {
    const [raceList, setRaceList] = useState<Race[]>([]);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const classes = useStyles();
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        fetch("http://f1ntasy.com:3001/api/races/all")
        .then(res => res.json())
        .then(json => {
            setRaceList(json.races);
        })
    }, [])

    return (
    <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
            <img src={logo} className={classes.logo}></img>
            <Typography className={classes.title} variant="h6" noWrap>
            </Typography>
            {/* <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                className={classes.icon}
            >
                <AccountCircleIcon fontSize="large" />
            </IconButton> */}
            <Button
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                className={classes.icon}
                // variant="h5"
                // component="span"
            >
                Races
                <KeyboardArrowDownIcon ></KeyboardArrowDownIcon>
            </Button>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {raceList.map((race, index) => {
                    return <Link key={race.id} href={`/race/${race.id}`}><MenuItem  onClick={handleClose}>{race.name}</MenuItem></Link>
                })}
                
            </Menu>
            </Toolbar>
        </AppBar>
    </div>
    )
}