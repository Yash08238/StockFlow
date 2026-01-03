import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UsersSlice";
import axios from "axios";

// Function to load state from local storage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

// Function to save state to local storage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("reduxState", serializedState);
  } catch (error) {
    // Ignore write errors
  }
};

const preloadedState = loadState();

// Set axios header IMMEDIATELY if token exists in preloaded state
if (preloadedState?.user?.token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${preloadedState.user.token}`;
}

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState, // Provide preloaded state
});

// Subscribe to store updates and save state to local storage
store.subscribe(() => {
  const state = store.getState();
  saveState(state);
  
  // Sync axios authorization header with Redux token state
  if (state.user.token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${state.user.token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
});

export default store;
