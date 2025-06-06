import React, {useState} from "react";

function Track({info, button, updatePlaylistItems, removeItem}){
    //console.log(info);
   
    const {id, name, artist, album} = info;
    if (button) {
        return(
        <li>
        <h1>{name}</h1>
        <h2>{artist}</h2>
        <h3>{album}</h3>
        <button onClick={()=>{updatePlaylistItems(id, name, artist, album)}}>+</button>
        </li>
        )
    } else{
        return(
        <li>
        <h1>{name}</h1>
        <h2>{artist}</h2>
        <h3>{album}</h3>
        <button onClick={()=>{removeItem(id)}}>-</button>
        </li>
        )
    }
}

export default Track