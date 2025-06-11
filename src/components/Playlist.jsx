import React from 'react'
import Tracklist from './Tracklist'

function Playlist({tracks, removeItem}) {
    return(
        <>
            <Tracklist tracks={tracks} button={false} removeItem={removeItem}/>
        </>
    )
}

export default Playlist