import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import authReducer from "../reducers/auth";
import turktool from "../reducers/index";

import committedBoxes from "../reducers/committedBoxes";
import imageProps from "../reducers/imageProps";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      turktool: combineReducers({
        committedBoxes,
        imageProps
      })
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
