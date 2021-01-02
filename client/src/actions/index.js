import streams from "../apis/streams";
import history from "../history";
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  EDIT_STREAM,
  DELETE_STREAM,
  FETCH_STREAM,
  FETCH_STREAMS,
} from "./types";

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

export const createStream = (formValues) => async (dispach, getState) => {
  const { userId } = getState().auth;
  const response = await streams.post("/streams", { ...formValues, userId });

  dispach({ type: CREATE_STREAM, payload: response.data });
  history.push("/");
};

export const fetchStreams = (formValues) => async (dispach) => {
  const response = await streams.get("/streams");

  dispach({ type: FETCH_STREAMS, payload: response.data });
};

export const fetchStream = (id) => async (dispach) => {
  const response = await streams.get(`/streams/${id}`);

  dispach({ type: FETCH_STREAM, payload: response.data });
};

export const deleteStream = (id) => async (dispach) => {
  await streams.delete(`/streams/${id}`);

  dispach({ type: DELETE_STREAM, payload: id });
  history.push("/");
};

export const editStream = (id, formValues) => async (dispach) => {
  const response = await streams.patch(`/streams/${id}`, formValues);

  dispach({ type: EDIT_STREAM, payload: response.data });
  history.push("/");
};
