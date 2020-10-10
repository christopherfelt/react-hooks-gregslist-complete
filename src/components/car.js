import React from 'react';
import {useHistory} from 'react-router-dom'

import {GlobalContext} from "../context/GlobalState"


const Car = ({ car }) => {

    const history = useHistory();

    return (
        <div className="card">
            <div className="card-body">
                <img src={car.imgUrl} className="img-fluid" alt="car image" ></img>
                <p className="card-text"> {car.description} </p>
                <h5 className="card-title">{car.price}</h5>
                <button className="btn btn-primary" onClick={() => history.push(`/cardetail/${car.id}`)}  >Go to Details</button>
                <button className="btn btn-danger">X</button>
            </div>
        </div>
    );
}

export default Car;
