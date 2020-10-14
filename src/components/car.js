import React from "react";
import { useHistory, Link } from "react-router-dom";

const Car = ({ car }) => {
  //   const history = useHistory();

  return (
    <div className="card">
      <div className="card-body">
        <Link to={{ pathname: `/cardetail/${car.id}` }}>
          <img src={car.imgUrl} className="img-fluid" alt="car"></img>
        </Link>
        <Link to={{ pathname: `/cardetail/${car.id}` }}>
          <p className="card-text">{car.description}</p>
        </Link>
        <h5 className="card-title">{car.price}</h5>
        {/* <button className="btn btn-primary" onClick={() => history.push(`/cardetail/${car.id}`)}>Go to Details</button> */}
      </div>
    </div>
  );
};

export default Car;
