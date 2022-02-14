import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import todosReducer from "./features/todos";

export const store = createStore(
  combineReducers({ todos: todosReducer }),
  composeWithDevTools(applyMiddleware(thunk))
);
