import React from "react";
import Track from "./Track"

function Tracklist(props){
    let tracks = []
    if (props.tracks){
        tracks = props.tracks
        return(
        <>
        <ol>{tracks.map(track => <Track key={track.id} info={track} button={props.button} updatePlaylistItems={props.updatePlaylistItems} removeItem={props.removeItem}/>)}</ol>
        </>
        )
    } else {
        return(
        <>
        </>
        )
    }
}

export default Tracklist