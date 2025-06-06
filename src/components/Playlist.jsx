import React, { useState } from 'react'
import Tracklist from './Tracklist'

function Playlist({tracks, removeItem}) {
    return(
        <>
        <p>Playlist</p>
        <Tracklist tracks={tracks} button={false} removeItem={removeItem}/>
        </>
    )
}

export default Playlist