import Todo from "../models/todo.model.js";

// ✅ Get all todos for the logged-in user
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching todos" });
  }
};

// ✅ Create a new todo for the logged-in user
export const createTodo = async (req, res) => {
  const { text } = req.body;
  try {
    const newTodo = await Todo.create({ text, userId: req.user._id });
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: "Error creating todo" });
  }
};

// ✅ Delete a todo
export const deleteTodo = async (req, res) => {
  try {
    const deleted = await Todo.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id, // Only delete if owned
    });

    if (!deleted) return res.status(404).json({ message: "Todo not found" });
    res.status(200).json(deleted);
  } catch (error) {
    res.status(500).json({ message: "Error deleting todo" });
  }
};

// ✅ Toggle complete
export const toggleTodo = async (req, res) => {
  try {
    const updated = await Todo.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { isComplete: req.body.isComplete },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Todo not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating todo" });
  }
};
