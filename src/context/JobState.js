import React, { createContext, useReducer } from "react";
import JobAppReducer from "./JobAppReducer";
import axios from "axios";

const initialState = {
  job: {},
  jobs: [],
  error: null,
  loading: true,
};

let api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  headers: {
    "Content-type": "application/json",
  },
});

export const JobContext = createContext(initialState);

export const JobProvider = ({ children }) => {
  const [state, dispatch] = useReducer(JobAppReducer, initialState);

  async function getJobs() {
    try {
      let res = await api.get("jobs/");
      dispatch({
        type: "GET_JOBS",
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: "JOB_ERROR",
        payload: error,
      });
    }
  }

  async function getJob(jobId) {
    try {
      let res = await api.get("jobs/" + jobId);
      dispatch({
        type: "GET_JOB",
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: "JOB_ERROR",
        payload: error,
      });
    }
  }

  async function createJob(jobData) {
    try {
      await api.post("jobs/", jobData);
      getJobs();
    } catch (error) {
      dispatch({
        type: "JOB_ERROR",
        payload: error,
      });
    }
  }

  async function updateJob(jobData) {
    try {
      await api.put("jobs/" + jobData.id, jobData);
      getJob(jobData.id);
    } catch (error) {
      dispatch({
        type: "JOB_ERROR",
        payload: error,
      });
    }
  }

  async function deleteJob(jobId) {
    try {
      await api.delete("jobs/" + jobId);
      getJobs();
    } catch (error) {
      dispatch({
        type: "JOB_ERROR",
        payload: error,
      });
    }
  }

  return (
    <JobContext.Provider
      value={{
        job: state.job,
        jobs: state.jobs,
        error: state.error,
        loading: state.loading,
        getJobs,
        getJob,
        createJob,
        updateJob,
        deleteJob,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};
