import { TableContainer, Table, TableHead, TableCell, TableRow, TableBody, Paper } from '@material-ui/core';
import React from 'react';


export const GuessTable = (props: any) => {
    var driverIdName : any = {};
    for(var driver of props.drivers) {
        driverIdName[driver.id] = `${driver.fname} ${driver.lname}`;
    }
    if(props.guesses === undefined) return null;
    console.log(props.guesses)
    return (
        <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>
                        Username
                    </TableCell>
                    <TableCell>
                        Position 1
                    </TableCell>
                    <TableCell>
                        Position 2
                    </TableCell>
                    <TableCell>
                        Position 3
                    </TableCell>
                    <TableCell>
                        Position 4
                    </TableCell>
                    <TableCell>
                        Position 5
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {props.guesses.guesses.map((user : any) => {
                   
                   return(
                       <TableRow>
                        <TableCell>
                            {(user.username).slice(0,1).toUpperCase() + user.username.slice(1)}
                        </TableCell>
                        <TableCell>
                            {driverIdName[user.pos1]}
                        </TableCell>
                        <TableCell>
                            {driverIdName[user.pos2]}
                        </TableCell>
                        <TableCell>
                            {driverIdName[user.pos3]}
                        </TableCell>
                        <TableCell>
                            {driverIdName[user.pos4]}
                        </TableCell>
                        <TableCell>
                            {driverIdName[user.pos5]}
                        </TableCell>
                    </TableRow>
                   )
                   
                })}
            </TableBody>
        </Table>
        </TableContainer>
    )
}