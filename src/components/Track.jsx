import React, {useState} from "react";

function Track({info}){
    console.log(info);
    const {id, name, artist, album} = info;
    return(
        <li>
        <h1>{name}</h1>
        <h2>{artist}</h2>
        <h3>{album}</h3>
        </li>
    )
}

export default Track