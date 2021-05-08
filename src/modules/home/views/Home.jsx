import React, {useState, useEffect, useContext} from 'react'
import {Link} from 'react-router-dom'

import {DataContext} from '../../../contexts/data'

import {Option} from '../components'

const Home = () => {
    const {generateNewGame, currentGameData}            = useContext(DataContext)

    const initial = () => {
        if (currentGameData === null) {
            generateNewGame()
        }
    }

    useEffect(initial)

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
                    <h1 className="fs-2">Whitch city is hotter?</h1>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <p className="fs-5">Score <span>{0}</span></p>
                </div>
            </div>
            <div className="row">
                {currentGameData &&
                    currentGameData.map((data,i) => (
                        <Option {...{data}} key={i} />
                    ))
                }
            </div>
        </div>
    )
};

export default Home;
