import * as taskService from '../services/taskService.js';

export async function getTasks(req, res, next) {
  const tasks = await taskService.getAllTasks();
  res.json(tasks);
}

export async function getTaskUsingId(req, res, next) {
  try {
    const { id } = req.params;

    if (!/^\d+$/.test(id)) {
      return res.status(400).json({
        error: "Validation failed",
        details: ["ID must be a number"],
      });
    }

    const numericId = Number(id);
    const task = await taskService.getTaskById(numericId);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    return res.status(200).json(task);
  } catch (err) {
    next(err); 
  }
}


export async function createTask(req, res, next) {
  const { title, completed } = req.body;
  const task = await taskService.createTask({ title, completed });
  res.status(201).json(task);
}
