import React, { useContext, useEffect, useState } from "react";
import { JobContext } from "../context/JobState";
import { useHistory } from "react-router-dom";
import "../components/carStyle.css";

import Item from "../components/item";

const JobDetail = ({
  match: {
    params: { jobId },
  },
}) => {
  const { getJob } = useContext(JobContext);

  useEffect(() => {
    getJob(jobId);
  }, []);

  const { job, updateJob, deleteJob } = useContext(JobContext);

  const history = useHistory();

  const initialState = {
    id: job.id,
    description: job.description,
    company: job.company,
    jobTitle: job.jobTitle,
    hours: job.hours,
    rate: job.rate,
    imgUrl: job.imgUrl,
  };

  const editState = {
    companyEdit: false,
    jobTitleEdit: false,
    hoursEdit: false,
    descriptionEdit: false,
    rateEdit: false,
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
    console.log(allValues);
    updateJob(allValues);
  };

  const deleteHandler = (e) => {
    history.push("/jobs");
    deleteJob(jobId);
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
              itemValue={job.description}
              inputValue={allValues.description}
              onEditEvent={editHandler}
              onChangeEvent={changeHandler}
              onSubmitEvent={submitHandler}
            />

            <Item
              edit={editValues.companyEdit}
              itemName={"Company"}
              itemValue={job.company}
              inputValue={allValues.company}
              onEditEvent={editHandler}
              onChangeEvent={changeHandler}
            />

            <Item
              edit={editValues.jobtitleEdit}
              itemName={"JobTitle"}
              itemValue={job.jobTitle}
              inputValue={allValues.jobTitle}
              onEditEvent={editHandler}
              onChangeEvent={changeHandler}
            />

            <Item
              edit={editValues.hoursEdit}
              itemName={"Hours"}
              itemValue={job.hours}
              inputValue={allValues.hours}
              onEditEvent={editHandler}
              onChangeEvent={changeHandler}
            />

            <Item
              edit={editValues.rateEdit}
              itemName={"Rate"}
              itemValue={job.rate}
              inputValue={allValues.rate}
              onEditEvent={editHandler}
              onChangeEvent={changeHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
