import axios from "axios";

const URL = process.env.REACT_APP_BACKEND_URL;

// ------------------------------------ Get user data ------------------------------------

export const GET_USER_START = "GET_USER_START";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILURE = "GET_USER_FAILURE";

export const getUserData = () => dispatch => {
  dispatch({ type: GET_USER_START });
  axios
    .get(`${URL}/api/users`)
    .then(res => {
      dispatch({ type: GET_USER_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({
        type: GET_USER_FAILURE,
        payload: err.message.includes("Network Error") ? { message: err.message } : err.response.data 
      });
    });
};
