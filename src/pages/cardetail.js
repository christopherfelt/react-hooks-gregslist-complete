import React, {useContext, useEffect, useState} from 'react';
import {GlobalContext} from "../context/GlobalState"

const CarDetail = ({match:{params:{carId}}}) => {

    const initialState = {
        model: '',
        make: '',
        description: '',
        imgUrl: '',
        price: 0,
        year: 0,
    }

    const editState = {
        modelEdit: false,
        makeEdit: false,
        descriptionEdit: false,
        imgUrlEdit: false,
        priceEdit: false,
        yearEdit: false,
    }

    const {car, getCar} = useContext(GlobalContext);
    const [allValues, setAllValues] = useState(initialState);
    const [editValues, setEditValues] = useState(editState);


    const changeHandler = e => {
        setAllValues({...allValues, [e.target.name]: e.target.value})
    }

    const editHandler = e => {
        setEditValues({...editValues, [e.target.name]:!editValues[e.target.name]})
    }


    useEffect(() => {
        getCar(carId);
    }, [])


    return (
        
        <div className="container">
            <div className="row m-3">
                <div className="col-8 d-flex justify-content-center">
                    <div className="">
                        <img src="//placehold.it/200X200" className="img-fluid" alt=""></img>
                        <div className="m-2">
                            <h6 className="d-inline mr-2">Description:</h6>
                            {editValues.descriptionEdit ? 
                            <div className="d-inline">
                                <input type="text" id="description" name="model" value={allValues.model} onChange={changeHandler}/>
                                <button className="btn btn-info btn-sm d-inline m-1">Submit</button>
                                <button className="btn btn-danger btn-sm d-inline m-1" name="descriptionEdit" onClick={editHandler}>Cancel</button>
                            </div>
                            :
                            <div className="d-inline">
                                <p className="d-inline">{car.description}</p>
                                <button className="btn btn-info btn-sm d-inline m-1" name="descriptionEdit" onClick={editHandler}>Edit</button>
                            </div>
                            }
                        </div>
                        <div>
                            <h6 className="d-inline mr-2">Make:</h6>
                            <p className="d-inline">{car.make}</p>
                        </div>
                        <div className="m-2">
                            <h6 className="d-inline mr-2">Model:</h6>
                            <p className="d-inline">{car.model}</p>
                        </div>
                        <div className="m-2">
                            <h6 className="d-inline mr-2">Price:</h6>
                            <p className="d-inline">{car.price}</p>
                        </div>
                        <div className="m-2">
                            <h6 className="d-inline mr-2">Year:</h6>
                            <p className="d-inline">{car.year}</p>
                        </div>
                        <div>
                            <button className="btn btn-info d-inline m-1" onClick={editHandler}>Edit</button>
                            <button className="btn btn-danger d-inline m-1">Danger</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>


    );
}

export default CarDetail;
