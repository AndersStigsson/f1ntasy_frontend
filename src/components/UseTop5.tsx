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

export const UseTop5 = () =>  {

    const [top5, setTop5] = useState<Array<Driver>>([]);


    return { top5, setTop5 }

}