import React, { useState } from 'react'
import Tracklist from './Tracklist'

function Playlist({tracks}) {
    return(
        <>
        <p>Playlist</p>
        <Tracklist tracks={tracks} button={false}/>
        </>
    )
}

export default Playlist