import { useEffect, useState } from "react";
import fetch from 'node-fetch';

interface Team {
    short: string;
    name: string;
    color: string;
    logo: string;
    url : string;

}

export const UseTeamList = () =>  {
    const [teamList, setTeamList] = useState<Array<Team>>([]);

    useEffect(() => {
        fetch("http://f1ntasy.com:3001/api/teams/all")
        .then(res => res.json())
        .then(json => {
            setTeamList(json.teams);
        })
    },[]);

    return { teamList };

}