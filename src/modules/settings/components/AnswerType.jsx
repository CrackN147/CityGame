import React from 'react'

const AnswerType = (props) => {
    return (
        <div className="col-2 d-inline-block text-center align-middle">
            <i className={`${props.data.Result ? 'bi-check-circle' : 'bi-x-circle'} fs-2 d-block m-4`}></i>
        </div>
    )
}

export default AnswerType


