import React, { useState, useEffect } from 'react';

function Node(props) {
    const [pathstate, setPathstate] = useState(props.path)
    const side = props.side;
    
    useEffect(() => {
        setPathstate(props.path);
    }, [props.path])

    //handleSpecialNode has to be implemented in both drag and click
    function handlePathDrag(event) {
        //console.log(event.target.attributes.path.value);
        event.preventDefault();
        if (props.ismousedown) {
            if (props.clickstate === '0' || props.clickstate === '3') {
                setAndUpdatePathstate(parseInt(props.clickstate));
                props.handleSpecialNode(parseInt(props.clickstate), 'close');
                props.setSpecialNode(parseInt(props.clickstate), props.id);
            } else {
                if (event.target.attributes.path.value === '0' || event.target.attributes.path.value === '3') {
                    props.handleSpecialNode(parseInt(props.clickstate), 'open')
                    props.setSpecialNode(parseInt(event.target.attributes.path.value), null);
                    setAndUpdatePathstate(parseInt(props.clickstate));
                    
                } else {
                    setAndUpdatePathstate(parseInt(props.clickstate));
                }
            }
        } else {}
    }

    function handlePathClick(event) {
        event.preventDefault();
        if (props.clickstate === '0' || props.clickstate === '3') {
            setAndUpdatePathstate(parseInt(props.clickstate));
            props.handleSpecialNode(parseInt(props.clickstate), 'close');
            props.setSpecialNode(parseInt(props.clickstate), props.id);
        } else {
            if (event.target.attributes.path.value === '0' || event.target.attributes.path.value === '3') {
                props.handleSpecialNode(parseInt(event.target.attributes.path.value), 'open')
                props.setSpecialNode(parseInt(event.target.attributes.path.value), null);
                setAndUpdatePathstate(parseInt(props.clickstate));
            } else {
                setAndUpdatePathstate(parseInt(props.clickstate));
            }
        }

    }

    function setAndUpdatePathstate(state) {
        setPathstate(state);
        props.updateGrid(props.id, state);
    }

    //console.log('clickstate is now ' + props.clickstate)
    switch (pathstate) {
        case 0:
            return (
                <div
                    id = {props.id}
                    path = {pathstate}
                    style = {{height: `${side}px`, width: `${side}px`, backgroundColor: 'DarkGreen', outline: `${side / 10}px solid white`}}
                    onMouseEnter = {handlePathDrag}
                    onClick = {handlePathClick}
                />
            )
        case 1:
            return (
                <div 
                    id = {props.id}
                    path = {pathstate}
                    style = {{height: `${side}px`, width: `${side}px`, backgroundColor: 'AliceBlue', outline: `${side / 10}px solid white`}}
                    onMouseEnter = {handlePathDrag}
                    onClick = {handlePathClick}
                />
            )
        case 2:
            return (
                <div 
                    id = {props.id}
                    path = {pathstate}
                    style = {{height: `${side}px`, width: `${side}px`, backgroundColor: 'blue', outline: `${side / 10}px solid white`}}
                    onMouseEnter = {handlePathDrag}
                    onClick = {handlePathClick}
                />
            )
        case 3:
            return (
                <div 
                    id = {props.id}
                    path = {pathstate}
                    style = {{height: `${side}px`, width: `${side}px`, backgroundColor: 'DarkRed', outline: `${side / 10}px solid white`}}
                    onMouseEnter = {handlePathDrag}
                    onClick = {handlePathClick}
                />
            )
        case 4:
            return (
                <div
                    id = {props.id}
                    path = {pathstate}
                    style = {{height: `${side}px`, width: `${side}px`, backgroundColor: 'black', outline: `${side / 10}px solid aliceblue`}}
                    onMouseEnter = {handlePathDrag}
                    onClick = {handlePathClick}
                />
            )
        default:
            break;
    }
    
}

export default Node