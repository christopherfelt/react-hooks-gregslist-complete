import React, { useContext, useEffect, useState } from "react";
import { HouseContext } from "../context/HouseState";
import House from "./house";
import ItemInput from "./newItemInput";

const Houses = () => {
  const initialState = {
    year: 0,
    bedrooms: 0,
    bathrooms: 0,
    description: "",
    imgUrl: "",
    price: 0,
    levels: 0,
  };
  const { houses, getHouses, createHouse } = useContext(HouseContext);
  const [allValues, setAllValues] = useState(initialState);

  useEffect(() => {
    getHouses();
  }, []);

  const changeHandler = (e) => {
    setAllValues({ ...allValues, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    createHouse(allValues);
    setAllValues({ ...initialState });
  };

  return (
    <div>
      <form className="form-inline m-2" onSubmit={submitHandler}>
        <ItemInput
          label={"Year"}
          inputType={"integer"}
          inputName={"year"}
          inputValue={allValues.year}
          onChangeEvent={changeHandler}
        />
        <ItemInput
          label={"Bedrooms"}
          inputType={"integer"}
          inputName={"bedrooms"}
          inputValue={allValues.bedrooms}
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
          label={"Level"}
          inputType={"integer"}
          inputName={"levels"}
          inputValue={allValues.levels}
          onChangeEvent={changeHandler}
        />
        <button className="btn btn-secondary" type="submit">
          Submit
        </button>
      </form>
      <div className="card-columns">
        {houses.map((house) => (
          <House key={house.id} house={house} />
        ))}
      </div>
    </div>
  );
};

export default Houses;
