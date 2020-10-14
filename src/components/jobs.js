import React, { useContext, useEffect, useState } from "react";
import { JobContext } from "../context/JobState";
import Job from "./job";
import ItemInput from "./newItemInput";

const Jobs = () => {
  const initialState = {
    company: "",
    description: "",
    jobTitle: "",
    hours: 0,
    rate: 0,
    imgUrl: "",
  };

  const { jobs, getJobs, createJob } = useContext(JobContext);
  const [allValues, setAllValues] = useState(initialState);

  useEffect(() => {
    getJobs();
  }, []);

  const changeHandler = (e) => {
    setAllValues({ ...allValues, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    createJob(allValues);
    setAllValues({ ...initialState });
  };

  return (
    <div>
      <form className="form-inline m-2" onSubmit={submitHandler}>
        <ItemInput
          label={"Company"}
          inputType={"integer"}
          inputName={"company"}
          inputValue={allValues.company}
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
          label={"Job Title"}
          inputType={"text"}
          inputName={"jobTitle"}
          inputValue={allValues.jobTitle}
          onChangeEvent={changeHandler}
        />
        <ItemInput
          label={"Hours"}
          inputType={"float"}
          inputName={"hours"}
          inputValue={allValues.hours}
          onChangeEvent={changeHandler}
        />
        <ItemInput
          label={"Rate"}
          inputType={"integer"}
          inputName={"rate"}
          inputValue={allValues.rate}
          onChangeEvent={changeHandler}
        />
        <ItemInput
          label={"Image Url"}
          inputType={"text"}
          inputName={"imgUrl"}
          inputValue={allValues.imgUrl}
          onChangeEvent={changeHandler}
        />
        <button className="btn btn-secondary" type="submit">
          Submit
        </button>
      </form>
      <div className="card-columns">
        {jobs.map((job) => (
          <Job key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default Jobs;
