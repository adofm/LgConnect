import React from "react";
import { Trash2 } from "lucide-react";

const TodoItems = ({ text, id, iscomplete, deleteTodo, toggle }) => {
  return (
    <div className="group flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <input
        type="checkbox"
        checked={iscomplete}
        onChange={() => toggle(id)}
        className="checkbox checkbox-sm border-[#A50034] bg-white checked:border-[#A50034] checked:bg-[#A50034]"
      />
      <p
        className={`flex-1 text-sm font-medium text-gray-700 ${
          iscomplete ? "line-through text-gray-400" : ""
        }`}
      >
        {text}
      </p>
      <button
        onClick={() => deleteTodo(id)}
        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-[#A50034] transition-all"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};

export default TodoItems;
