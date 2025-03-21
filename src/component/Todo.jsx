import { MdDeleteForever } from "react-icons/md";
import { useSelector } from "react-redux";

export const Todo = () => {
  const task = useSelector((state) => state.task); // using useSelector hook we can access data from store

  return (
    <div className="container">
      <div className="todo-app">
        <h1>
          <i className="fa-regular fa-pen-to-square"></i>To-do List:
        </h1>
        <div className="row">
          <form>
            <input type="text" id="input-box" placeholder="Add a new task" />
            <button>Add Task</button>
          </form>
        </div>
        <ul id="list-container">
          {task.map((curentTask, index) => {
            return (
              <li key={index}>
                <p>
                  {index}: {curentTask}
                </p>
                <div>
                  <MdDeleteForever className="icon-style" />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
