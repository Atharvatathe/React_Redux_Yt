import { createStore } from "redux";

//Define Action Types: stateDomain & Event
const ADD_TASK = "task/add";
const DELETE_TASK = "task/delete";

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

    default:
      return state;
  }
};

// step 2: create the redux store using the reducer
const store = createStore(taskReducer);

//step 3: Log the initial state
// The getState method is synchronous function that returns the current state of redux application. It include the entire state of the application, including akk the reducers and their respective state.

console.log("initial state:", store.getState());

//step 4: Dispatch action to add task
store.dispatch({ type: ADD_TASK, payload: "Buy something" });
console.log("updated state:", store.getState());

store.dispatch({ type: ADD_TASK, payload: "Buy something again" });
console.log("updated state:", store.getState());

store.dispatch({ type: DELETE_TASK, payload: 0 });
console.log("updated state:", store.getState());
