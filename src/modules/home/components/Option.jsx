import React from 'react'

const Option = (props) => {
    return (
        <div className="col-3 border btn btn-outline-secondary mx-1">
            <p className="m-1">{`${props.data.City},`}</p>
            <p className="m-1">{props.data.Country}</p>
            <p>{props.data.Temperature}</p>
        </div>
    )
}

export default Option