import React from 'react'
import loading from './loader.gif'

const Spinner = ()=> {
    return (
            <img className="my-3 mx-auto" src={loading} width="50px" height="50px" alt="loading" />
    )
}

export default Spinner