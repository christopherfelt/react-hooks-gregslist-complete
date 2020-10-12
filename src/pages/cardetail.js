import React, {useContext, useEffect, useState} from 'react';
import {GlobalContext} from "../context/GlobalState"
import {useHistory} from "react-router-dom"
import "../components/carStyle.css"

import Item from "../components/item"

const CarDetail = ({match:{params:{carId}}}) => {

    const {car, getCar, updateCar, deleteCar} = useContext(GlobalContext);

    useEffect(() => {
        getCar(carId);
        console.log(car)
    }, [])

    const history = useHistory();

    const initialState = {
        id: car.id,
        model: car.model,
        make: car.make,
        description: car.description,
        imgUrl: car.imgUrl,
        price: car.price,
        year: car.year,
    }

    const editState = {
        modelEdit: false,
        makeEdit: false,
        descriptionEdit: false,
        imgUrlEdit: false,
        priceEdit: false,
        yearEdit: false,
    }

    const [allValues, setAllValues] = useState(initialState);
    const [editValues, setEditValues] = useState(editState);

    const changeHandler = e => {
        setAllValues({...allValues, [e.target.name]: e.target.value})
    }

    const editHandler = e => {
        setEditValues({...editValues, [e.target.name]:!editValues[e.target.name]})
    }

    const submitHandler = e => {
        setEditValues({...editValues, [e.target.name]:!editValues[e.target.name]})
        updateCar(allValues)
    }

    const deleteHandler = e => {
        history.push("/")
        deleteCar(carId)
    }

    return (
        
        <div className="container">
            <div className="row m-3">
                <div className="col-8 d-flex justify-content-center">
                    <div className="border text-left p-2">
                        <div className="d-flex justify-content-between">
                            <div>
                                <img src="//placehold.it/200X200" className="img-fluid" alt=""></img>
                            </div>
                            <div className="align-self-center button">
                                <button className="btn btn-danger" onClick={deleteHandler}>Delete</button>
                            </div>
                        </div>

                        <Item edit={editValues.descriptionEdit} itemName={"Description"}
                            itemValue={car.description} inputValue={allValues.description} 
                            onEditEvent={editHandler} onChangeEvent={changeHandler}
                            onSubmitEvent={submitHandler}/>

                        <Item edit={editValues.makeEdit} itemName={"Make"}
                            itemValue={car.make} inputValue={allValues.make}
                            onEditEvent={editHandler} onChangeEvent={changeHandler}/>

                        <Item edit={editValues.modelEdit} itemName={"Model"}
                            itemValue={car.model} inputValue={allValues.model}
                            onEditEvent={editHandler} onChangeEvent={changeHandler}/>

                        <Item edit={editValues.priceEdit} itemName={"Price"}
                            itemValue={car.price} inputValue={allValues.price}
                            onEditEvent={editHandler} onChangeEvent={changeHandler}/>

                        <Item edit={editValues.yearEdit} itemName={"Year"}
                            itemValue={car.year} inputValue={allValues.year}
                            onEditEvent={editHandler} onChangeEvent={changeHandler}/>

                    </div>
                </div>
            </div>
        </div>


    );
}

export default CarDetail;
