import React, { useState } from "react";
import "./Todo.scss";
import classNames from "classnames";

export const Todo = () => {
  const [todo, setTodo] = useState([]);
  const [value, setValue] = useState("");
  const [itemCounter, setItemCounter] = useState(0);
  const [filter, setFilter] = useState("all");

  function handleSubmit(e) {
    e.preventDefault();
    if (value.trim() !== "") {
      setTodo([{ text: value, checked: false }, ...todo]);
      setItemCounter(todo.length + 1);
    }
    setValue("");
  }

  function handleDelete(id) {
    const updatedTodo = todo.filter((_, index) => index !== id);
    setTodo(updatedTodo);
    setItemCounter(updatedTodo.filter((item) => !item.checked).length);
  }

  function handleCheck(id) {
    const updatedTodo = todo.map((item, index) =>
      index === id ? { ...item, checked: !item.checked } : item
    );
    setTodo(updatedTodo);
    setItemCounter(updatedTodo.filter((item) => !item.checked).length);
  }

  function handleFilterChange(selectedFilter) {
    setFilter(selectedFilter);
  }

  return (
    <div className="main-todo">
      <form className="inp-div" onSubmit={handleSubmit}>
        <div className="circle"></div>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Create new todo..."
        />
      </form>
      <div className="todo-list">
        {todo.map((item, i) => {
          const isActive = !item.checked;
          const isCompleted = item.checked;

          if (
            filter === "all" ||
            (filter === "active" && isActive) ||
            (filter === "completed" && isCompleted)
          ) {
            return (
              <div
                key={i}
                className={classNames("todo", {
                  hide:
                    (filter === "completed" && isActive) ||
                    (filter === "active" && isCompleted),
                })}
              >
                <div
                  onClick={() => handleCheck(i)}
                  className={classNames("circle", { check: item.checked })}
                ></div>
                <p
                  style={
                    item.checked
                      ? {
                          textDecoration: "line-through",
                          color: "#6C6E83",
                        }
                      : null
                  }
                >
                  {item.text}
                </p>
                <button onClick={() => handleDelete(i)}>X</button>
              </div>
            );
          }
          return null;
        })}
        <div className="todo last">
          <p className="items">{itemCounter} items left</p>

          <ul>
            <li onClick={() => handleFilterChange("all")}>All</li>
            <li onClick={() => handleFilterChange("active")}>Active</li>
            <li onClick={() => handleFilterChange("completed")}>Completed</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
