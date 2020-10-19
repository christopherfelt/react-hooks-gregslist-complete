import React, { createContext, useReducer } from "react";
import JobAppReducer from "./JobAppReducer";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

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
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

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
      if (isAuthenticated) {
        console.log(jobData);
        const token = await getAccessTokenSilently();
        const options = {
          method: "post",
          url: "http://127.0.0.1:8000/api/jobs/create",
          data: jobData,
          headers: {
            Authorization: "Bearer " + token,
            "Content-type": "application/json",
          },
        };
        await axios(options);
        getJobs();
      } else {
        console.log("You are not authenticated to make this request");
      }
    } catch (error) {
      dispatch({
        type: "Job_ERROR",
        payload: error,
      });
    }
  }

  async function updateJob(jobData) {
    try {
      if (isAuthenticated) {
        console.log(jobData);
        const token = await getAccessTokenSilently();
        const options = {
          method: "put",
          url:
            "http://127.0.0.1:8000/api/jobs/" + jobData.id + "/updateordelete",
          data: jobData,
          headers: {
            Authorization: "Bearer " + token,
            "Content-type": "application/json",
          },
        };
        await axios(options);
        getJob(jobData.id);
        getJobs();
      } else {
        console.log("You are not authenticated to make this request");
      }
    } catch (error) {
      dispatch({
        type: "Job_ERROR",
        payload: error,
      });
    }
  }

  async function deleteJob(jobId) {
    try {
      if (isAuthenticated) {
        console.log(jobId);
        const token = await getAccessTokenSilently();
        const options = {
          method: "delete",
          url: "http://127.0.0.1:8000/api/jobs/" + jobId + "/updateordelete",
          headers: {
            Authorization: "Bearer " + token,
            "Content-type": "application/json",
          },
        };
        await axios(options);
        getJobs();
      } else {
        console.log("You are not authenticated to make this request");
      }
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
