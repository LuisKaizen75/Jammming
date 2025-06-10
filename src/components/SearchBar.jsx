import React, { useState } from 'react'

function SearchBar({setQuery}){
    const [value, setValue] = useState('')

    function handleSubmit(e){
        e.preventDefault();
        setQuery(value);
        setValue("");
    }

    return(
        <>
        <form onSubmit={handleSubmit}>
            <h2>Look for a song</h2>
            <input type="text" name='song' id='song' value={value} placeholder='Song title'onChange={({target})=>setValue(target.value)}/>
            <button type="submit">Search</button>
        </form>
        </>
    )
}

export default SearchBar