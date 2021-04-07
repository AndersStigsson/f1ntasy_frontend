import { useEffect, useState } from "react";


function handlePodiumClicked(position: number, setSelectedPosition : any){
    setSelectedPosition(position);
}

export const UseSelectedPosition = () =>  {

    const [selectedPosition, setSelectedPosition] = useState(-1);


    return { selectedPosition, setSelectedPosition, handlePodiumClicked }

}