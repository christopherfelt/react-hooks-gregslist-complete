import React, {createFactory, useContext, useEffect, useState} from 'react';
import {GlobalContext} from "../context/GlobalState";
import Car from "./car";

const Cars = () => {

    const initialState = {
        model: '',
        make: '',
        description: '',
        imgUrl: '',
        price: 0,
        year: 0,
    }
    const { cars, getCars, createCar } = useContext(GlobalContext);
    const [allValues, setAllValues] = useState(initialState);


    const changeHandler = e => {
        setAllValues({...allValues, [e.target.name]:e.target.value})
    }

    const submitHandler = e => {
        e.preventDefault();
        createCar(allValues);
        setAllValues({...initialState})
    }



    useEffect(() => {
        getCars();
    }, [] )


    return (
        <div>
            <form className="form-inline m-2" onSubmit={submitHandler} >
                <div className="form-group m-2">
                    <label htmlFor="model">Model: </label>
                    <input type="text" id="model" name="model" value={allValues.model} onChange={changeHandler}/>
                </div>
                <div className="form-group m-2">
                    <label htmlFor="make">Make: </label>
                    <input type="text" id="make" name="make" value={allValues.make} onChange={changeHandler} />
                </div>
                <div className="form-group m-2">
                    <label htmlFor="description">Description: </label>
                    <input type="text" id="description" name="description" value={allValues.description} onChange={changeHandler}/>
                </div>
                <div className="form-group m-2">
                    <label htmlFor="img-url">Image Url: </label>
                    <input type="text" id="imgUrl" name="imgUrl" value={allValues.imgUrl} onChange={changeHandler}/>
                </div>
                <div className="form-group m-2">
                    <label htmlFor="price">Price: </label>
                    <input type="integer" id="price" name="price" value={allValues.price} onChange={changeHandler}/>
                </div>
                <div className="form-group m-2">
                    <label htmlFor="year">Year:  </label>
                    <input type="integer" id="year" name="year" value={allValues.year} onChange={changeHandler}/>
                </div>
                <button className="btn btn-secondary" type="submit" > Submit </button>
            </form>
            <div className="card-columns">
                {cars.map((car) => (
                    <Car key={car.id} car={car} />
                ))}
            </div>
        </div>

    );
}

export default Cars;
