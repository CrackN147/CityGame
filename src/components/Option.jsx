import React from 'react'

const Option = (props) => {
    const processAnswer = (e, id) => {
        e.preventDefault() || e.stopPropagation();
        if (!props.history) {
            props.submitAnswer(id)
        }
    }
    return (
        <button className={`col-3 border text-center mx-1 ${props.submitAnswer ? 'btn btn-outline-secondary' : ''}`}
            disabled={([1,2].includes(props.gameStatus) || props.history) ? true : false}
            onClick={(e) => processAnswer(e, props.data.ID)}>
            <p className="m-1">{`${props.data.City},`}</p>
            <p className="m-1">{props.data.Country}</p>
            {([1,2].includes(props.gameStatus) || props.history) &&
                <p>
                    <span>{!props.settings.Units ? props.data.Temperature : props.convertUnits(props.data.Temperature)}</span>
                    <span>{!props.settings.Units ? ' C' : ' F'}</span>
                </p>
            }
        </button>
    )
}

export default Option