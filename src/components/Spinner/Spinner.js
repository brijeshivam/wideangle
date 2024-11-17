import React from 'react'
import loading from './loading.gif'

const Spinner = ()=> {
    return (
            <img className="my-3 mx-auto" src={loading} alt="loading" />
    )
}

export default Spinner