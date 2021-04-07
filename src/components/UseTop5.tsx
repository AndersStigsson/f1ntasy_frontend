import { useEffect, useState } from "react";
import fetch from 'node-fetch';
import { Driver } from "./SelectionPage";



export const UseTop5 = () =>  {

    const [top5, setTop5] = useState<Array<Driver>>([]);


    return { top5, setTop5 }

}