//1
// import { createStore, applyMiddleware, compose } from "redux";

// import thunkMiddleware from "redux-thunk";

// import rootReducer from "./reducers/rootReducer";

// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(
//   rootReducer,
//   composeEnhancer(applyMiddleware(thunkMiddleware))
// );

// export default store;

import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers/rootReducer";
import thunkMiddleware from "redux-thunk";

const composeEnhancer = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;

const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunkMiddleware))
);

export default store;
