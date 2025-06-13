import React, { useRef, useState, useEffect } from "react";
import TodoItems from "./TodoItems";

const Todo = () => {
  const [todoList, setTodoList] = useState([]);
  const inputRef = useRef();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/todos", {
          credentials: "include", // ✅ important
        });
        const data = await res.json();
        setTodoList(data);
      } catch (err) {
        console.error("Error fetching todos:", err);
      }
    };

    fetchTodos();
  }, []);

  const add = async () => {
    const inputText = inputRef.current.value.trim();
    if (inputText === "") return;

    try {
      const res = await fetch("http://localhost:5001/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ✅
        body: JSON.stringify({ text: inputText }),
      });

      if (!res.ok) throw new Error("Failed to add todo");

      const newTodo = await res.json();
      setTodoList((prev) => [...prev, newTodo]);
      inputRef.current.value = "";
    } catch (err) {
      console.error("Error adding todo:", err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const res = await fetch(`http://localhost:5001/api/todos/${id}`, {
        method: "DELETE",
        credentials: "include", // ✅
      });

      if (!res.ok) throw new Error("Failed to delete todo");

      setTodoList((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };

  const toggle = async (id, isComplete) => {
    try {
      const res = await fetch(`http://localhost:5001/api/todos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ✅
        body: JSON.stringify({ isComplete: !isComplete }),
      });

      if (!res.ok) throw new Error("Failed to toggle todo");

      const updatedTodo = await res.json();
      setTodoList((prev) =>
        prev.map((todo) => (todo._id === id ? updatedTodo : todo))
      );
    } catch (err) {
      console.error("Error toggling todo:", err);
    }
  };

  return (
    <div className="bg-white place-self-center w-64 flex flex-col p-4 rounded-lg shadow max-h-[90vh] overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">To-Do List</h2>

      <div className="flex items-center mb-4 bg-gray-200 rounded-full">
        <input
          ref={inputRef}
          className="bg-transparent border-0 outline-none flex-1 h-10 pl-4 placeholder:text-slate-600 text-sm"
          type="text"
          placeholder="Add your Task"
        />
        <button
          onClick={add}
          className="border-none rounded-full bg-red-600 px-3 h-10 text-white text-sm font-medium"
        >
          Add
        </button>
      </div>

      <div>
        {todoList.map((item) => (
          <TodoItems
            key={item._id}
            id={item._id}
            text={item.text}
            iscomplete={item.isComplete}
            deleteTodo={deleteTodo}
            toggle={() => toggle(item._id, item.isComplete)}
          />
        ))}
      </div>
    </div>
  );
};

export default Todo;
