import { AppBar, makeStyles, Menu, MenuItem, Toolbar, Typography, Button, Link, Hidden, Drawer, useTheme, Divider, List, ListItem, ListItemIcon, ListItemText,} from "@material-ui/core";
import React, { useEffect, useState } from "react";

import logo from '../media/f1ntasy_nofont.svg';
import fetch from 'node-fetch';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import IconButton from "@material-ui/core/IconButton";
import StorageIcon from '@material-ui/icons/Storage';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import { UseRaceList } from "./GetRaceList";
import { UseTeamList } from "./UseTeams";
interface Race {
    id: number;
    name: string;
    country: string;
    date: string;
    url : string;
}
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    logo: {
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(45),
        },
        width: theme.spacing(30),
    },
    // toolbar: {
    //     height: theme.spacing(5)
    // },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    menuButton: {
        [theme.breakpoints.up('sm')]: {
            display: "none"
        },
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
        color: "#FFFFFF",
        textDecoration: "none"
    },
    icon: {
        height: theme.spacing(5)
    },
    headerText: {
        color: "#FFFFFF"
    },
    headerBarDesktop: {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    drawerHeader: {
        display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    hide: {
        display: 'none',
    },
    nextRace: {
        color: "#FFFFFF",
        textDecoration: "none"
    }
}));

export const HeaderBar = () => {
    // const [raceList, setRaceList] = useState<Race[]>([]);

    const [nextRace, setNextRace] = useState<Race>();
    const [anchorElRaces, setAnchorElRaces] = useState<null | HTMLElement>(null);
    const [anchorElTeams, setAnchorElTeams] = useState<null | HTMLElement>(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const openTeams = Boolean(anchorElTeams);
    const openRaces = Boolean(anchorElRaces);
    const classes = useStyles();
    const {raceList} = UseRaceList();
    const {teamList} = UseTeamList();
    const handleMenuRaces = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElRaces(event.currentTarget);
    };

    const handleMenuTeams = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElTeams(event.currentTarget);
    };
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const [openDrawer, setOpen] = useState(false);

    const handleDrawerOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
        setAnchorElRaces(null);
        setAnchorElTeams(null);
    }
  
    const handleDrawerClose = () => {
      setOpen(false);
    };

    useEffect(() => {
        fetch("http://f1ntasy.com:3001/api/races/next")
        .then(res => res.json())
        .then(json => {
            setNextRace(json.race[0]);
        });
    }, [])
    if(raceList === undefined) {
        return null;
    }
    // const container = window !== undefined ? () => window().document.body : undefined;
    return (
    <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
                <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, (openTeams || openRaces) && classes.hide)}
                >
                    <MenuIcon />
                </IconButton>
                <Link href="/frontpage"> <img src={logo} className={classes.logo}></img></Link>
                
                    <Typography className={classes.title} variant="h6" noWrap >
                        <Link  href={`/race/${nextRace?.id}`} className={classes.nextRace}>
                            Next race: {nextRace?.name} on {nextRace !== undefined && new Date(nextRace?.date).toLocaleString("SV-SE").substring(0,16)}
                        </Link>
                    </Typography>
                
                <Link href={"/standings"} className={classes.headerBarDesktop}>
                    <Button 
                        className={classes.headerText}
                    >
                        Standings
                    </Button>
                </Link>
                <Button
                    aria-label="Teams"
                    aria-controls="menu-appbar-teams"
                    aria-haspopup="true"
                    onClick={handleMenuTeams}
                    color="inherit"
                    className={`${classes.icon} ${classes.headerBarDesktop}`}
                    // variant="h5"
                    // component="span"
                >
                    Teams
                    <KeyboardArrowDownIcon ></KeyboardArrowDownIcon>
                </Button>
                <Menu
                    id="menu-appbar-teams"
                    anchorEl={anchorElTeams}
                    open={openTeams}
                    onClose={handleClose}
                >
                    {teamList.map((team, index) => {
                        return <Link key={team.short} href={`/team/${team.short}`}><MenuItem  onClick={handleClose}>{team.name}</MenuItem></Link>
                    })}
                    
                </Menu>
                <Button
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenuRaces}
                    color="inherit"
                    className={`${classes.icon} ${classes.headerBarDesktop}`}
                    // variant="h5"
                    // component="span"
                >
                    Races
                    <KeyboardArrowDownIcon ></KeyboardArrowDownIcon>
                </Button>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorElRaces}
                    open={openRaces}
                    onClose={handleClose}
                >
                    {raceList.map((race, index) => {
                        return <Link key={race.id} href={`/race/${race.id}`}><MenuItem  onClick={handleClose}>{race.name}</MenuItem></Link>
                    })}
                    
                </Menu>
                <Drawer
                    className={classes.drawer}
                    anchor="left"
                    open={openDrawer}
                    onClose={handleDrawerClose}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <List>
                        <ListItem button component="a" href="/standings" >
                            <ListItemIcon>
                                <StorageIcon /> 
                            </ListItemIcon>
                            <ListItemText>
                                Standings
                            </ListItemText>
                        </ListItem>
                        <ListItem button component="a" href="/teams" >
                            <ListItemIcon>
                                <AllInclusiveIcon />
                            </ListItemIcon>
                            <ListItemText>
                                Teams
                            </ListItemText>
                        </ListItem>
                        <ListItem button component="a" href="/races" >
                            <ListItemIcon>
                                <AllInclusiveIcon />
                            </ListItemIcon>
                            <ListItemText>
                                Races
                            </ListItemText>
                        </ListItem>
                    </List>
                </Drawer>
            
            </Toolbar>
        </AppBar>
    </div>
    )
}