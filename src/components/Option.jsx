import React from 'react'

const Option = (props) => {
    const processAnswer = (e, id) => {
        e.preventDefault() || e.stopPropagation();
        return props.submitAnswer ? props.submitAnswer(id) : false
    }
    return (
        <div className={`col-3 border text-center mx-1 ${props.submitAnswer ? 'btn btn-outline-secondary' : ''}`}
            onClick={(e) => processAnswer(e, props.data.ID)}>
            <p className="m-1">{`${props.data.City},`}</p>
            <p className="m-1">{props.data.Country}</p>
            {([1,2].includes(props.gameStatus) || props.history) &&
                <p>
                    <span>{!props.settings.Units ? props.data.Temperature : props.convertUnits(props.data.Temperature)}</span>
                    <span>{!props.settings.Units ? ' C' : ' F'}</span>
                </p>
            }
        </div>
    )
}

export default Option