import React, {useState} from "react";

function Track({info, button, updatePlaylistItems, removeItem}){
    //console.log(info);
   
    const {id, name, artist, album} = info;
    if (button) {
        return(
        <li>
        <h2>{name}</h2>
        <h3>{artist}</h3>
        <h4>{album}</h4>
        <button onClick={()=>{updatePlaylistItems(id, name, artist, album)}}>+</button>
        </li>
        )
    } else{
        return(
        <li>
        <h2>{name}</h2>
        <h3>{artist}</h3>
        <h4>{album}</h4>
        <button onClick={()=>{removeItem(id)}}>-</button>
        </li>
        )
    }
}

export default Track