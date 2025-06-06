import React, {useState} from "react";
import Track from "./Track"

function Tracklist(props){
    let tracks = []
    if (props.tracks){
        tracks = props.tracks
        return(
        <>
        <p>Tracklist</p>
        <ol>{tracks.map(track => <Track key={track.id} info={track} button={props.button} updatePlaylistItems={props.updatePlaylistItems}/>)}</ol>
        </>
        )
    } else {
        return(
        <>
        <p>Tracklist</p>
        </>
        )
    }
}

export default Tracklist