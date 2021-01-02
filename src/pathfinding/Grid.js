import { Button } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import Node from './Node';

function Grid(props) {
    const [grid, setGrid] = useState([]);
    const [side] = useState(32);
    const [clickstate, setClickstate] = useState(1);
    const [ismousedown, setMousedown] = useState(false);
    const [startcoord, setStartcoord] = useState(null);
    const [endcoord, setEndcoord] = useState(null);
    const [isstartset, setStartset] = useState(false);
    const [isendset, setEndset] = useState(false);

    
    useEffect(() => {
        if (grid.length === 0) {
            var temp = [];

            for (let i = 0; i < side; i = i + 1) {
                var row = [];
                for (let j = 0; j < side; j = j + 1) {
                    row.push(i * side + j);
                }
                temp.push(row);
            }
            
            setGrid(temp);
            console.log('resetGrid')
        }

        window.addEventListener('mousedown', event => setMousedown(true));
        window.addEventListener('mouseup', event => setMousedown(false));
        // console.log(grid);
    }, [grid, side, clickstate]);

    function handleSwitchNode(event) {
        setClickstate(event.currentTarget.id);
        console.log('switch lul')
    }

    function handlePathFind() {

    }

    //actions are 'close' or 'open'
    //close indicates to prevent more start/end nodes from being added
    //open indicates to allow start/end node to be added
    //nodetype indicates the type of node the actions above are done to
    function handleSpecialNode(nodetype, action) {
        if (action === 'close') {
            if (nodetype === 0) {
                setStartset(true);
                setClickstate(1);
            } else {
                setEndset(true);
                setClickstate(1);
            }
        } else {
            if (nodetype === 0) {
                setStartset(false);
            } else {
                setEndset(false);
            }
        }
    }

    //Sets the start and end node coordinates for pathfind
    function setSpecialNode(nodetype, result) {
        if (nodetype === 0) {
            setStartcoord(result);
        } else {
            setEndcoord(result);
        }
    }

    //0 for start, 1 for path, 2 for wall, 3 for end
    // console.log(grid);
    //console.log(clickstate);
    //console.log('mousedown is ' + ismousedown)
    return (
        
        <div style = {{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: 'auto'}}>
            <h1 style = {{textAlign: 'center'}}>Pathfinder</h1>
            <div style = {{display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%', height: 'auto', marginTop: '2%', marginBottom: '2%'}}>
                {!isstartset
                    ? <Button id = {0} onClick = {handleSwitchNode} variant = 'outlined' style = {{marginInline: '1%', backgroundColor: 'aliceblue'}}>Start Node</Button>
                    : <Button disabled id = {0} onClick = {handleSwitchNode} variant = 'outlined' style = {{marginInline: '1%', backgroundColor: 'aliceblue'}}>Start Node</Button>
                }
                
                <Button id = {1} onClick = {handleSwitchNode} variant = 'outlined' style = {{marginInline: '1%', backgroundColor: 'aliceblue'}}>Path Node</Button>
                <Button id = {2} onClick = {handleSwitchNode} variant = 'outlined' style = {{marginInline: '1%', backgroundColor: 'aliceblue'}}>Block Node</Button>

                {!isendset
                    ? <Button id = {3} onClick = {handleSwitchNode} variant = 'outlined' style = {{marginInline: '1%', backgroundColor: 'aliceblue'}}>End Node</Button>
                    : <Button disabled id = {3} onClick = {handleSwitchNode} variant = 'outlined' style = {{marginInline: '1%', backgroundColor: 'aliceblue'}}>End Node</Button>
                }
                
            </div>

            <Button variant = 'outlined' onClick = {handlePathFind} style = {{backgroundColor: 'aliceblue', marginBottom: '1%'}}>Find Path</Button>
            
            <div style = {{display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%', height: 'auto'}}>
                <div style={{width: '600px', height: '600px'}}>
                    {grid.map(row => 
                        <div key = {row[0]} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%', height: 'auto'}}>
                            
                            {row.map(box => 
                                <Node 
                                    key = {box} 
                                    id = {box} 
                                    side = {side} 
                                    path = {2} 
                                    clickstate = {clickstate} 
                                    ismousedown = {ismousedown} 
                                    handleSpecialNode = {handleSpecialNode}
                                    setSpecialNode = {setSpecialNode}
                                />
                            )}
                            
                        </div>)}
                </div>
            </div>

        </div>
    )
}

export default Grid