import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UsersSlice";
import axios from "axios";

// Function to load state from local or session storage
const loadState = () => {
  try {
    // Try local storage first
    const localState = localStorage.getItem("reduxState");
    if (localState) {
      return JSON.parse(localState);
    }
    // Fallback to session storage
    const sessionState = sessionStorage.getItem("reduxState");
    if (sessionState) {
      return JSON.parse(sessionState);
    }
    return undefined;
  } catch (error) {
    return undefined;
  }
};

// Function to save state based on "Remember Me" preference
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    const rememberMe = state.user?.rememberMe ?? true;

    if (rememberMe) {
      localStorage.setItem("reduxState", serializedState);
      sessionStorage.removeItem("reduxState");
    } else {
      sessionStorage.setItem("reduxState", serializedState);
      localStorage.removeItem("reduxState");
    }
  } catch (error) {
    // Ignore write errors
  }
};

const preloadedState = loadState();

// Set axios header IMMEDIATELY if token exists in preloaded state
if (preloadedState?.user?.token) {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${preloadedState.user.token}`;
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
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${state.user.token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
});

export default store;
