import { useEffect, useState } from "react";
import fetch from 'node-fetch';

interface Race {
    id: number;
    name: string;
    country: string;
    date: string;
    url : string;
    circuitmap: string;
}

export const UseRaceList = () =>  {
    const [raceList, setRaceList] = useState<Array<Race>>([]);

    useEffect(() => {
        fetch("http://f1ntasy.com:3001/api/races/all")
        .then(res => res.json())
        .then(json => {
            setRaceList(json.races);
        })
    },[]);

    return { raceList };

}