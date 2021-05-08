import React from 'react'
import {Link} from 'react-router-dom'

const Settings = () => {

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
                    <h1 className="fs-2">Whitch city is hotter?</h1>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <p className="fs-5">Score <span>{0}</span></p>
                </div>
            </div>
            <div className="row">

            </div>
        </div>
    )
};

export default Settings;
