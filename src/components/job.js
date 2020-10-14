import React from "react";
import { Link } from "react-router-dom";

const job = ({ job }) => {
  return (
    <div className="card">
      <div className="card-body">
        <Link to={{ pathname: `/jobdetail/${job.id}` }}>
          <img
            src="//placehold.it/200x200/"
            className="img-fluid"
            alt="car"
          ></img>
        </Link>
        <Link to={{ pathname: `/jobdetail/${job.id}` }}>
          <p className="card-text">{job.description}</p>
        </Link>
        <h5 className="card-title">{job.jobTitle}</h5>
        {/* <button className="btn btn-primary" onClick={() => history.push(`/cardetail/${house.id}`)}>Go to Details</button> */}
      </div>
    </div>
  );
};

export default job;
