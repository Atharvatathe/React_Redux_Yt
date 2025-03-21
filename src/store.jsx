import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import {thunk} from "redux-thunk";

//Define Action Types: stateDomain & Event
const ADD_TASK = "task/add";
const DELETE_TASK = "task/delete";
const FETCH_TASK = "task/fetch";

const initialState = {
  task: [],
};

// step 1: create simple reducer function
const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        task: [...state.task, action.payload],
      };

    case DELETE_TASK:
      const updatedTask = state.task.filter((item, index) => {
        return index !== action.payload;
      });
      return {
        ...state,
        task: updatedTask,
      };

    case FETCH_TASK:
      return { ...state, task: [...state.task, ...action.payload] };

    default:
      return state;
  }
};

// step 2: create the redux store using the reducer
export const store = createStore(
  taskReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

//step 3: Log the initial state
// The getState method is synchronous function that returns the current state of redux application. It include the entire state of the application, including akk the reducers and their respective state.

console.log("initial state:", store.getState());

// step 5: create action creators

export const addTask = (data) => {
  return { type: ADD_TASK, payload: data };
};

export const deleteTask = (data) => {
  return { type: DELETE_TASK, payload: data };
};

export const fetchTask = () => {
  return async (dispatch) => {
    try {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=3"
      );

      const task = await res.json();
      dispatch({ type: FETCH_TASK, payload: task.map((curTask) => curTask.title) });
    } catch (error) {
      console.log(error);
    }
  };
};

//step 4: Dispatch action to add task
store.dispatch(addTask("Buy Apple"));
console.log("updated state:", store.getState());

store.dispatch(addTask("Buy Banana"));
console.log("updated state:", store.getState());

store.dispatch(addTask("Buy Mango"));
console.log("updated state:", store.getState());

store.dispatch(deleteTask(0));
console.log("deleted state:", store.getState());
