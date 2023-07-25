import axios from "axios";
import store from "../store";

export const getApi = () => {
  const newState = store.getState();
  const token = newState ? newState.auth.token : null;
  return axios.create({
    baseURL: "http://localhost:8070/",
    headers: {
      Authorization: token ? "Bearer " + token : null,
      "Content-type": "application/json",
    },
  });
};
