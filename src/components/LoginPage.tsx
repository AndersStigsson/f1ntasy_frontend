import { Button, Card, CardActionArea, CardMedia, Grid, makeStyles, TextField } from "@material-ui/core";
import React, { useState } from "react";
import logo from '../media/f1ntasy_nofont.svg';
import fetch from 'node-fetch';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    LoginPage: {
        // height: "300px",
        // width: "550px"
        backgroundColor: "#FA6607"
    },
    loginButton: {
        // marginTop: "50px",
        // marginLeft: "50px"
        paddingTop: theme.spacing(2),
        paddingLeft: theme.spacing(2)
    },
    media: {
        height: theme.spacing(24),
        [theme.breakpoints.down('sm')]: {
            height: theme.spacing(12),
        },

    }
}));


export const LoginPage = (props: any) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    const classes = useStyles();

    const handleUsernameChange = (e : any) => {
        if(e.key !== undefined){
            if(e.key === "Enter"){
                handleLogin();
            }
        } else {
        
            setUsername(e.target.value);
        }
        
    }

    const handlePasswordchange = (e: any) => {
        if(e.key === "Enter"){
            handleLogin();
        } else {
            setPassword(e.target.value);
        }
        
    }

    const handleLogin = () => {
        //Send login to backend
        fetch("http://f1ntasy.com:3001/api/users/login",{
            body: JSON.stringify({username: username, password: password}),
            method: "POST",
            headers: {"content-type": "application/json"}
        }).then((res : any) => res.json())
        .then((json : any) => {
            if(json.loggedIn){
                console.log("Successfully logged in");
                history.push("/frontpage")
            } else {
                console.log("Wrong username or password");
            }
        })
    }
    return (
        <Grid container>
        
        
            <Grid item md={3}>
            </Grid>
            <Grid item md={6} xs={12}>
                <Card className={classes.LoginPage}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={logo}
                        >

                        </CardMedia>
                    </CardActionArea>
                    <Grid container>
                        <Grid item xs={4}>
                            <TextField label="Username" onChange={handleUsernameChange}  onKeyPress={handleUsernameChange}>

                            </TextField>
                        </Grid>
                        
                        <Grid item xs={4}>
                            <TextField label="Password" onChange={handlePasswordchange} onKeyPress={handlePasswordchange} type="password" >
                                
                            </TextField>
                        </Grid>
                        <Grid item xs={12} className={classes.loginButton}>
                            <Button variant="contained" onClick={handleLogin} >
                                Log in
                            </Button>
                        </Grid>
                    </Grid>
                </Card>
                
            </Grid>
            <Grid item md={3}>

            </Grid>
        </Grid>
    )
}