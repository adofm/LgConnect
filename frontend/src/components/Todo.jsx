import React, { useRef, useState, useEffect } from "react";
import TodoItems from "./TodoItems";
import { Plus, ListTodo } from "lucide-react";

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
    <div className="bg-white rounded-xl shadow-lg w-80 flex flex-col max-h-[90vh] overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#A50034] to-[#720231] p-4">
        <div className="flex items-center gap-3 text-white">
          <ListTodo className="w-6 h-6" />
          <h2 className="text-lg font-bold">To-Do List</h2>
        </div>
      </div>

      {/* Input Section */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-2">
          <input
            ref={inputRef}
            className="bg-transparent border-0 outline-none flex-1 h-10 pl-2 placeholder:text-gray-400 text-sm"
            type="text"
            placeholder="Add your task..."
            onKeyPress={(e) => e.key === 'Enter' && add()}
          />
          <button
            onClick={add}
            className="bg-[#A50034] hover:bg-[#720231] text-white p-2 rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Todo List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {todoList.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <p>No tasks yet</p>
            <p className="text-sm">Add a task to get started</p>
          </div>
        ) : (
          todoList.map((item) => (
            <TodoItems
              key={item._id}
              id={item._id}
              text={item.text}
              iscomplete={item.isComplete}
              deleteTodo={deleteTodo}
              toggle={() => toggle(item._id, item.isComplete)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Todo;
