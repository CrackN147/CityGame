import React, {useContext} from 'react'
import {Link} from 'react-router-dom'

import {DataContext} from '../../../contexts/data'

import {Option} from '../../../components'

import {AnswerType} from '../components'

const Settings = (props) => {
    const {settings, updateSetingsUnits, history, convertUnits, clearData}            = useContext(DataContext)

    return (
        <div className="container my-5">
            <div className="row my-2">
                <div className="col-1">
                    <Link to={`/`} className="btn btn-primary">
                        Back
                    </Link>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <h1 className="fs-2">Settings</h1>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <h2 className="fs-4 mt-3">Clear All Data</h2>
                    <button className="btn btn-warning" onClick={clearData}>
                        Clear
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <h2 className="fs-4 mt-3">Units</h2>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="units" id="radioOne" checked={!settings.Units} 
                            onChange={() => updateSetingsUnits(false)}
                        />
                        <label className="form-check-label" htmlFor="radioOne">
                            Celsius
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="units" id="radioTwo" checked={settings.Units} 
                            onChange={() => updateSetingsUnits(true)}
                        />
                        <label className="form-check-label" htmlFor="radioTwo">
                            Fahrenheit
                        </label>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <h2 className="fs-4 mt-3 mb-2">History</h2>
                        {(history && history.length > 0) &&
                            history.map((data, i) => (
                                <div className="row" key={i}>
                                    {data.map((entrie, n) => (
                                        !entrie.Country ? 
                                            <AnswerType {...{data: entrie}} key={`historyList${Math.floor(Math.random() * 10000)}${n}`} />
                                        :
                                            <Option {...{data: entrie, settings, convertUnits, history: true}} key={`historyList${Math.floor(Math.random() * 10000)}${n}`} />
                                    ))}
                                </div>
                            ))
                        }
                </div>
            </div>
        </div>
    )
};

export default Settings;
