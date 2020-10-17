import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import Car from "./car";
import ItemInput from "./newItemInput";
import { useAuth0 } from "@auth0/auth0-react";

const Cars = () => {
  const { isAuthenticated, user } = useAuth0();

  const initialState = {
    model: "",
    make: "",
    description: "",
    imgUrl: "",
    price: 0,
    year: 0,
    created_by: "",
  };
  const { cars, getCars, createCar } = useContext(GlobalContext);
  const [allValues, setAllValues] = useState(initialState);

  useEffect(() => {
    getCars();
  }, []);

  const changeHandler = (e) => {
    setAllValues({ ...allValues, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    createCar(allValues);
    setAllValues({ ...initialState });
  };

  return (
    <div>
      {isAuthenticated && (
        <form className="form-inline m-2" onSubmit={submitHandler}>
          <ItemInput
            label={"Model"}
            inputType={"text"}
            inputName={"model"}
            inputValue={allValues.model}
            onChangeEvent={changeHandler}
          />

          <ItemInput
            label={"Make"}
            inputType={"text"}
            inputName={"make"}
            inputValue={allValues.make}
            onChangeEvent={changeHandler}
          />

          <ItemInput
            label={"Description"}
            inputType={"text"}
            inputName={"description"}
            inputValue={allValues.description}
            onChangeEvent={changeHandler}
          />

          <ItemInput
            label={"Image Url"}
            inputType={"text"}
            inputName={"imgUrl"}
            inputValue={allValues.imgUrl}
            onChangeEvent={changeHandler}
          />

          <ItemInput
            label={"Price"}
            inputType={"integer"}
            inputName={"price"}
            inputValue={allValues.price}
            onChangeEvent={changeHandler}
          />

          <ItemInput
            label={"Year"}
            inputType={"integer"}
            inputName={"year"}
            inputValue={allValues.year}
            onChangeEvent={changeHandler}
          />

          <button className="btn btn-secondary" type="submit">
            Submit
          </button>
        </form>
      )}
      <div className="card-columns">
        {cars.map((car) => (
          <Car key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
};

export default Cars;
