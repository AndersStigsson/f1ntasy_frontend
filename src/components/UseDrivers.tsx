import { useEffect, useState } from "react";
import fetch from 'node-fetch';
import { Driver } from "./SelectionPage";


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