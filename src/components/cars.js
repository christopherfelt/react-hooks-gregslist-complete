import React, {createFactory, useContext, useEffect, useState} from 'react';
import {GlobalContext} from "../context/GlobalState";
import Car from "./car";

const Cars = () => {

    const { cars, getCars, createCar } = useContext(GlobalContext);
    const [allValues, setAllValues] = useState({
        model: '',
        make: '',
        description: '',
        imgUrl: '',
        price: 0,
        year: 0,
    });

    const changeHandler = e => {
        setAllValues({...allValues, [e.target.name]:e.target.value})
    }

    const submitHandler = e => {
        e.preventDefault();
        console.log("test")
        createCar(allValues);
    }



    useEffect(() => {
        getCars();
        createCar();
    }, [] )


    return (
        <div>
            <form className="form-inline m-2" onSubmit={submitHandler} >
                <div className="form-group m-2">
                    <label htmlFor="model">Model: </label>
                    <input type="text" id="model" name="model" onChange={changeHandler}/>
                </div>
                <div className="form-group m-2">
                    <label htmlFor="make">Make: </label>
                    <input type="text" id="make" name="make" onChange={changeHandler} />
                </div>
                <div className="form-group m-2">
                    <label htmlFor="description">Description: </label>
                    <input type="text"/>
                </div>
                <div className="form-group m-2">
                    <label htmlFor="img-url">Image Url: </label>
                    <input type="text"/>
                </div>
                <div className="form-group m-2">
                    <label htmlFor="price">Price: </label>
                    <input type="integer"/>
                </div>
                <div className="form-group m-2">
                    <label htmlFor="year">Year:  </label>
                    <input type="integer"/>
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
