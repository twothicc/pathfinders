import { Button, TextField } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import Node from './Node';

function Grid(props) {
    const [grid, setGrid] = useState([]);
    const [side, setSide] = useState(16);
    const [formside, setFormside] = useState(16);
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
                    row.push([i * side + j, 2]);
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
    }

    function handlePathFind() {
        function findxindex(id) {
            return id % side;
        }

        function findyindex(id) {
            return (id - id % side) / side;
        }

        const start = [findxindex(startcoord), findyindex(startcoord)];
        const end = [findxindex(endcoord), findyindex(endcoord)];

        findpath(start, end);
    }

    function changeNodeState(xycoord) {
        var temp = [];
        for (let row of grid) {
            let mini = [];
            for (let column of row) {
                mini.push(column);
            }
            temp.push(mini);
        }
        temp[xycoord[1]][xycoord[0]][1] = 4;
        console.log('changed node to 4 at ' + xycoord);
        setGrid(temp);
    }

    function findpath(curr, target) {
        console.log(curr + ' and ' + target)
        //check if curr is equal to end
        if (curr[0] === target[0] && curr[1] === target[1]) {
            console.log('exit found at ' + curr);
        } else {
            //up down left right
            const paths = [curr[1] - 1, curr[1] + 1, curr[0] - 1, curr[0] + 1];
            var closed_options = 0;
            //check if paths can be taken
            for (let i = 0; i < paths.length; i = i + 1) {
                paths[i] = [paths[i] >= 0, paths[i]];
            }
            
            //first two are edits made to the y coord, so just add on the x coord
            for (let i = 0; i < 2; i = i + 1) {
                if (paths[i][0]) {
                    if (curr[0] === target[0] && paths[i][1] === target[1]) {
                        console.log('exit found at ' + [curr[0], paths[i][1]]);
                    } else {
                        if (grid[paths[i][1]][curr[0]][1] === 1) {
                            let new_curr = [curr[0], paths[i][1]];
                            
                            setTimeout(() => {
                                changeNodeState(new_curr);
                                findpath(new_curr, target);
                            }, 250);
                            
                        } else {
                            closed_options += 1;
                        }
                    }
                } else {
                    closed_options += 1;
                }
            }
            //last two are edits made to x coord, so just add on the y coord
            for (let i = 2; i < 4; i = i + 1) {
                if (paths[i][0]) {
                    if (paths[i][1] === target[0] && curr[1] === target[1]) {
                        console.log('exit found at ' + [paths[i][1], curr[1]]);
                    } else {
                        if (grid[curr[1]][paths[i][1]][1] === 1) {
                            let new_curr = [paths[i][1], curr[1]];
                            
                            
                            setTimeout(() => {
                                changeNodeState(new_curr);
                                findpath(new_curr, target);
                            }, 250);
                        } else {
                            closed_options += 1;
                        }
                    }
                } else {
                    closed_options += 1;
                }
            }

            if (closed_options === 4) {
                console.log('path ended at ' + curr);
            }
        }
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

    function handleResetGrid() {
        var temp = [];

        for (let i = 0; i < side; i = i + 1) {
            var row = [];
            for (let j = 0; j < side; j = j + 1) {
                row.push([i * side + j, 2]);
            }
            temp.push(row);
        }
        
        setGrid(temp);
        console.log('resetGrid');

        setStartcoord(null);
        setEndcoord(null);
        setStartset(false);
        setEndset(false);

        console.log('resetStartEndNodes');
    }

    //Sets the start and end node coordinates for pathfind
    function setSpecialNode(nodetype, result) {
        if (nodetype === 0) {
            setStartcoord(result);
        } else {
            setEndcoord(result);
        }
    }

    function updateGrid(node_id, node_state) {
        var temp = grid;
        var mod = node_id % side;
        temp[(node_id - mod) / side][mod][1] = node_state
        //console.log('node at ' + node_id + 'has been set to ' + node_state);
        setGrid(temp);
    }

    function handleFormsideChange(event) {
        setFormside(event.target.value);
    }

    function handleSideChange(event) {
        
        var temp = [];
        for (let i = 0; i < formside; i = i + 1) {
            var row = [];
            for (let j = 0; j < formside; j = j + 1) {
                row.push([i * formside + j, 2]);
            }
            temp.push(row);
        }
        setGrid(temp);
        
        setSide(formside);
        
    }

    //0 for start, 1 for path, 2 for wall, 3 for end
    // console.log(grid);
    //console.log(clickstate);
    //console.log('mousedown is ' + ismousedown)

    return (
        
        <div style = {{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: 'auto'}}>
            <h1 style = {{textAlign: 'center'}}>Pathfinder</h1>
            <TextField type = 'number' label = 'adjust sides' value = {formside} onChange = {handleFormsideChange}/>
            <Button variant = 'outlined' style = {{backgroundColor: 'aliceblue'}} onClick = {handleSideChange}>Change Side</Button>
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
            
            <div style = {{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', height: 'auto', justifyContent: 'center', marginBottom: '1%'}}>
                <Button variant = 'outlined' onClick = {handlePathFind} style = {{backgroundColor: 'aliceblue', marginInline: '1%'}}>Find Path</Button>
                <Button variant = 'outlined' onClick = {handleResetGrid} style = {{backgroundColor: 'aliceblue', marginInline: '1%'}}>Reset Grid</Button>
            </div>
            
            <div style = {{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '600px', height: '600px', marginBottom: '5%'}}>
                
                    {grid.map(row => 
                        <div key = {row[0][0]} style={{width: '100%', height: 'auto', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            {row.map(box => 
                                <Node 
                                    key = {box[0]} 
                                    id = {box[0]} 
                                    side = {600 / side} 
                                    path = {box[1]} 
                                    clickstate = {clickstate} 
                                    ismousedown = {ismousedown} 
                                    handleSpecialNode = {handleSpecialNode}
                                    setSpecialNode = {setSpecialNode}
                                    updateGrid = {updateGrid}
                                />
                            )}
                        </div>
                        )}
                
            </div>

        </div>
    )
}

export default Grid