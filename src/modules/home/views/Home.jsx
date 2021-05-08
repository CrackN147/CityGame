import React, {useContext} from 'react'
import {Link} from 'react-router-dom'

import {DataContext} from '../../../contexts/data'

import {Option} from '../../../components'

const Home = () => {
    const {generateNewGame, currentGameData, settings, convertUnits, score, submitAnswer, gameStatus}            = useContext(DataContext)

    return (
        <div className="container my-5">
            <div className="row my-2">
                <div className="col-1">
                    <Link to={`/settings`} className="btn btn-primary">
                        Settings
                    </Link>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <h1 className="fs-2">
                        {gameStatus === 1 ? 'You WON!' : gameStatus === 2 ? 'You LOST!' : 'Whitch city is hotter?'}
                    </h1>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <p className="fs-5">
                        Score: <span>{score}</span>
                    </p>
                </div>
            </div>
            <div className="row">
                {currentGameData &&
                    currentGameData.map((data,i) => (
                        <Option {...{data, settings, convertUnits, submitAnswer, gameStatus}} key={i} />
                    ))
                }
            </div>
            {[1,2].includes(gameStatus) &&
                <div className="row">
                    <div className="col">
                        <button type="button" className="btn btn-primary mt-3" onClick={generateNewGame}>
                            Next cities
                        </button>
                    </div>
                </div>
            }
            
        </div>
    )
};

export default Home;
