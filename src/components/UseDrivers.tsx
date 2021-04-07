import { useEffect, useState } from "react";
import fetch from 'node-fetch';

type Driver = {
    fname: string,
    lname: string,
    country: string,
    short: string,
    url: string,
    flag: string, 
    // team: "media" | "selected" | "mcl" | "hft" | "aft" | "amr" | "arr" | "fer" | "mer" | "rbr" | "sat" | "wil", 
    team:string,
    image:string, 
    top5: boolean, 
    guessedPosition: number,
    logo:string,
    teamname: string
}

export const UseDrivers = () =>  {

    const [drivers, setDrivers] = useState<Array<Driver>>([]);

    useEffect(() => {
        fetch("http://f1ntasy.com:3001/api/drivers/all")
        .then(res => res.json())
        .then(json => {
            setDrivers(json.drivers);

        })
    },[]);

    return { drivers, setDrivers }

}