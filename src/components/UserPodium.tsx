import { Grid, makeStyles, Typography} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import bgImage from '../media/f1bg.svg';
import fetch from 'node-fetch';
import { HeaderBar } from "./HeaderBar";
import podiumImage from "../media/podium.svg";



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
    },
    podium: {
    	backgroundImage: `url(${podiumImage})`,
	position: "absolute",
	top: "20%",
	backgroundSize: "cover",
	height: "80%",
	width: "50%"
    },
    fullSize: {
    	height: "95vh",
    	width: "100vw"
    },
    winner: {
    	textAlign: "center",
	backgroundColor: "gold",
	fontSize: "24px"
    },
    second : {
    	textAlign: "left",
	backgroundColor: "silver",
	paddingLeft: "10px",
	fontSize: "20px"
    },
    third: {
    	textAlign: "right",
	backgroundColor: "orange",
	marginTop: "10px"
    },
    rightSideText: {
    	width: "40%",
	position: "absolute",
	right: "0%",
    	textAlign: "right",
	paddingRight: "10px",
	backgroundColor: "white"
}
}));


export const UserPodium = (props: any) => {
	const classes = useStyles();
	return (

		<div className={classes.fullSize}>
			<HeaderBar />
			<div className={classes.rightSideText}>
				<Typography variant="h4">
					Ny säsong, nu kör vi!
				</Typography>
			</div>
		</div>
	)
}
