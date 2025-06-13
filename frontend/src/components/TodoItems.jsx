import React from "react";
import imgDelete from "./assets/delete.png";

const TodoItems = ({ text, id, iscomplete, deleteTodo, toggle }) => {
  return (
    <div className="flex items-center my-4 gap-3">
      <input
        type="checkbox"
        checked={iscomplete}
        onChange={() => toggle(id)}
        className="checkbox w-5 h-5 border-[#A50034] bg-white checked:border-[#A50034] checked:bg-[#A50034]"
      />
      <p
        className={`text-base font-medium text-slate-800 ${
          iscomplete ? "line-through opacity-60" : ""
        }`}
      >
        {text}
      </p>
      <img
        onClick={() => deleteTodo(id)}
        src={imgDelete}
        alt="delete"
        className="w-4 ml-auto cursor-pointer"
      />
    </div>
  );
};

export default TodoItems;
