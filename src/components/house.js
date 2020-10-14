import React from "react";
import { Link } from "react-router-dom";

const house = ({ house }) => {
  return (
    <div className="card">
      <div className="card-body">
        <Link to={{ pathname: `/housedetail/${house.id}` }}>
          <img
            src="//placehold.it/200x200/"
            className="img-fluid"
            alt="car"
          ></img>
        </Link>
        <Link to={{ pathname: `/housedetail/${house.id}` }}>
          <p className="card-text">{house.description}</p>
        </Link>
        <h5 className="card-title">{house.price}</h5>
        {/* <button className="btn btn-primary" onClick={() => history.push(`/cardetail/${house.id}`)}>Go to Details</button> */}
      </div>
    </div>
  );
};

export default house;
