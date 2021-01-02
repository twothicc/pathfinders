import React, { useState } from 'react';

function Node(props) {
    const [pathstate, setPathstate] = useState(props.path);
    const [side] = useState(props.side);
    

    //handleSpecialNode has to be implemented in both drag and click
    function handlePathDrag(event) {
        //console.log(event.target.attributes.path.value);
        event.preventDefault();
        if (props.ismousedown) {
            if (props.clickstate === '0' || props.clickstate === '3') {
                setPathstate(parseInt(props.clickstate));
                props.handleSpecialNode(parseInt(props.clickstate), 'close');
                props.setSpecialNode(parseInt(props.clickstate), props.id);
            } else {
                if (event.target.attributes.path.value === '0' || event.target.attributes.path.value === '3') {
                    props.handleSpecialNode(parseInt(props.clickstate), 'open')
                    props.setSpecialNode(parseInt(event.target.attributes.path.value), null);
                    setPathstate(parseInt(props.clickstate));
                    
                } else {
                    setPathstate(parseInt(props.clickstate));
                }
            }
        } else {}
    }

    function handlePathClick(event) {
        event.preventDefault();
        if (props.clickstate === '0' || props.clickstate === '3') {
            setPathstate(parseInt(props.clickstate));
            props.handleSpecialNode(parseInt(props.clickstate), 'close');
            props.setSpecialNode(parseInt(props.clickstate), props.id);
        } else {
            if (event.target.attributes.path.value === '0' || event.target.attributes.path.value === '3') {
                props.handleSpecialNode(parseInt(event.target.attributes.path.value), 'open')
                props.setSpecialNode(parseInt(event.target.attributes.path.value), null);
                setPathstate(parseInt(props.clickstate));
            } else {
                setPathstate(parseInt(props.clickstate));
            }
        }

    }

    //console.log('clickstate is now ' + props.clickstate)
    switch (pathstate) {
        case 0:
            return (
                <div
                    id = {props.id}
                    path = {pathstate}
                    style = {{height: `${600/side}px`, width: `${600/side}px`, backgroundColor: 'DarkGreen', outline: `${600/(side * 10)}px solid white`}}
                    onMouseEnter = {handlePathDrag}
                    onClick = {handlePathClick}
                />
            )
        case 1:
            return (
                <div 
                    id = {props.id}
                    path = {pathstate}
                    style = {{height: `${600/side}px`, width: `${600/side}px`, backgroundColor: 'AliceBlue', outline: `${600/(side * 10)}px solid white`}}
                    onMouseEnter = {handlePathDrag}
                    onClick = {handlePathClick}
                />
            )
        case 2:
            return (
                <div 
                    id = {props.id}
                    path = {pathstate}
                    style = {{height: `${600/side}px`, width: `${600/side}px`, backgroundColor: 'blue', outline: `${600/(side * 10)}px solid white`}}
                    onMouseEnter = {handlePathDrag}
                    onClick = {handlePathClick}
                />
            )
        case 3:
            return (
                <div 
                    id = {props.id}
                    path = {pathstate}
                    style = {{height: `${600/side}px`, width: `${600/side}px`, backgroundColor: 'DarkRed', outline: `${600/(side * 10)}px solid white`}}
                    onMouseEnter = {handlePathDrag}
                    onClick = {handlePathClick}
                />
            )
        default:
            break;
    }
    
}

export default Node