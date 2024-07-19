const mongoose = require('mongoose');
const taskSchema = require('../models/Task');

const listTasks = async (req, res) => {
  const { id } = req.params;

  try {
    const collectionName = `tasks_${id}`;
    const TaskModel = mongoose.model(collectionName, taskSchema);
    const tasks = await TaskModel.find();
    res.json(tasks);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

const addTask = async (req, res) => {
  const { description } = req.body;
  const { id } = req.params;

  try {
    const collectionName = `tasks_${id}`;
    const TaskModel = mongoose.model(collectionName, taskSchema);
    const existingTask = await TaskModel.findOne({ description });
    if (existingTask) {
      return res.status(400).json({ message: 'Task already exists' });
    }
    const newTask = new TaskModel({ description });
    await newTask.save();
    res.status(201).json({ message: 'Task added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const deleteTask = async (req, res) => {
  const { updatedValues } = req.params;
  const [id, taskId] = updatedValues.split(',');

  try {
    const collectionName = `tasks_${id}`;
    const TaskModel = mongoose.model(collectionName, taskSchema);
    await TaskModel.findByIdAndDelete(taskId);
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const updateTaskState = async (req, res) => {
  const { newValue } = req.params;
  const [id, taskId] = newValue.split(',');
  const collectionName = `tasks_${id}`;
  const TaskModel = mongoose.model(collectionName, taskSchema);

  try {
    const updatedTask = await TaskModel.findByIdAndUpdate(taskId, { $set: { completed: true } }, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ error: `Task with ID ${taskId} not found` });
    }
    res.status(200).json({ message: 'Task status updated successfully', task: updatedTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
module.exports = {
    listTasks,
    addTask,
    deleteTask,
    updateTaskState,

  };