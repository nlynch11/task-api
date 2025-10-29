import * as taskService from '../services/taskService.js';

export async function getTasks(req, res, next) {
  const tasks = await taskService.getAllTasks();
  res.json(tasks);
}

export async function getTaskUsingId(req, res, next) {
  const { id } = req.params;
  const task = await taskService.getTaskById(Number(id));
  return res.status(200).json(task);
}


export async function createTask(req, res, next) {
  const { title, completed } = req.body;
  const task = await taskService.createTask({ title, completed });
  res.status(201).json(task);
}
