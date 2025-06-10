import React, {useState} from "react";

function Track({info, button, updatePlaylistItems, removeItem}){
    //console.log(info);
   
    const {id, name, artist, album} = info;
    if (button) {
        return(
        <li className="song">
        <div className="song-header">
            <h2>Title: {name}</h2>
            <button onClick={()=>{updatePlaylistItems(id, name, artist, album)}} className="add-button">+</button>
        </div>
            <h3>Artist: {artist}</h3>
            <h4>Album: {album}</h4>
        </li>
        )
    } else{
        return(
        <li className="song">
            <div className="song-header">
                <h2>Title: {name}</h2>
                <button onClick={()=>{removeItem(id)}} className="minus-button">-</button>
            </div>
            <h3>Artist: {artist}</h3>
            <h4>Album: {album}</h4>
        </li>
        )
    }
}

export default Track