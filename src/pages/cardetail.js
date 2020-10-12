import React, {useContext, useEffect, useState} from 'react';
import {GlobalContext} from "../context/GlobalState"

import Item from "../components/item"

const CarDetail = ({match:{params:{carId}}}) => {

    const {car, getCar, updateCar} = useContext(GlobalContext);

    useEffect(() => {
        getCar(carId);
    }, [])

    const initialState = {
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
        console.log("editHandler-Parent")
    }

    const submitHandler = e => {
        updateCar(allValues)
        console.log("submitHandler - parent")
    }





    return (
        
        <div className="container">
            <div className="row m-3">
                <div className="col-8 d-flex justify-content-center">
                    <div className="">
                        <img src="//placehold.it/200X200" className="img-fluid" alt=""></img>
                        {/* <div className="m-2">
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
                        </div> */}

                        <Item edit={editValues.descriptionEdit} itemName={"Description"}
                            itemValue={car.description} inputValue={allValues.description} 
                            onEditEvent={editHandler} onChangeEvent={changeHandler}/>

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

                        {/* <div>
                            <button className="btn btn-info d-inline m-1" onClick={editHandler}>Edit</button>
                            <button className="btn btn-danger d-inline m-1">Danger</button>
                        </div> */}
                        
                    </div>
                </div>
            </div>
        </div>


    );
}

export default CarDetail;
