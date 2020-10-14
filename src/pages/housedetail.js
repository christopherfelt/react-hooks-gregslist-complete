import React, { useContext, useEffect, useState } from "react";
import { HouseContext } from "../context/HouseState";
import { useHistory } from "react-router-dom";
import "../components/carStyle.css";

import Item from "../components/item";

const HouseDetail = ({
  match: {
    params: { houseId },
  },
}) => {
  const { getHouse } = useContext(HouseContext);

  useEffect(() => {
    getHouse(houseId);
  }, []);

  const { house, updateHouse, deleteHouse } = useContext(HouseContext);

  const history = useHistory();

  const initialState = {
    id: house.id,
    year: house.year,
    bedrooms: house.bedrooms,
    bathrooms: house.bathrooms,
    description: house.description,
    imgUrl: house.description,
    price: house.price,
    levels: house.levels,
  };

  const editState = {
    yearEdit: false,
    bedroomsEdit: false,
    bathroomsEdit: false,
    descriptionEdit: false,
    imgUrlEdit: false,
    priceEdit: false,
    levelsEdit: false,
  };

  const [allValues, setAllValues] = useState(initialState);
  const [editValues, setEditValues] = useState(editState);

  const changeHandler = (e) => {
    setAllValues({ ...allValues, [e.target.name]: e.target.value });
  };

  const editHandler = (e) => {
    setEditValues({
      ...editValues,
      [e.target.name]: !editValues[e.target.name],
    });
  };

  const submitHandler = (e) => {
    setEditValues({
      ...editValues,
      [e.target.name]: !editValues[e.target.name],
    });
    updateHouse(allValues);
  };

  const deleteHandler = (e) => {
    history.push("/houses");
    deleteHouse(houseId);
  };

  return (
    <div className="container">
      <div className="row m-3">
        <div className="col-8 d-flex justify-content-center">
          <div className="border text-left p-2">
            <div className="d-flex justify-content-between">
              <div>
                <img
                  src="//placehold.it/200X200"
                  className="img-fluid"
                  alt=""
                ></img>
              </div>
              <div className="align-self-center button">
                <button className="btn btn-danger" onClick={deleteHandler}>
                  Delete
                </button>
              </div>
            </div>

            <Item
              edit={editValues.descriptionEdit}
              itemName={"Description"}
              itemValue={house.description}
              inputValue={allValues.description}
              onEditEvent={editHandler}
              onChangeEvent={changeHandler}
              onSubmitEvent={submitHandler}
            />

            <Item
              edit={editValues.bedroomsEdit}
              itemName={"bedrooms"}
              itemValue={house.bedrooms}
              inputValue={allValues.bedrooms}
              onEditEvent={editHandler}
              onChangeEvent={changeHandler}
            />

            <Item
              edit={editValues.bathroomsEdit}
              itemName={"bathrooms"}
              itemValue={house.bathrooms}
              inputValue={allValues.bathrooms}
              onEditEvent={editHandler}
              onChangeEvent={changeHandler}
            />

            <Item
              edit={editValues.priceEdit}
              itemName={"Price"}
              itemValue={house.price}
              inputValue={allValues.price}
              onEditEvent={editHandler}
              onChangeEvent={changeHandler}
            />

            <Item
              edit={editValues.yearEdit}
              itemName={"Year"}
              itemValue={house.year}
              inputValue={allValues.year}
              onEditEvent={editHandler}
              onChangeEvent={changeHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseDetail;
