const Task = require('../models/Task');
const Issue = require('../models/Issue');
const Milestone = require('../models/Milestone');

const getTasks = async (req, res) => {
  try {
    const { projectId } = req.params;
    const tasks = await Task.find({ project: projectId })
      .populate('assignee', 'username fullName avatar')
      .populate('reviewer', 'username fullName avatar')
      .sort({ createdAt: -1 });
    res.json({ success: true, tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createTask = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { title, description, assignee, priority, status, dueDate, labels, checklist, relatedFilePath } = req.body;

    const task = await Task.create({
      project: projectId,
      title,
      description,
      assignee,
      priority: priority || 'Medium',
      status: status || 'To Do',
      dueDate,
      labels,
      checklist,
      relatedFilePath
    });

    const populated = await Task.findById(task._id).populate('assignee', 'username fullName avatar');
    res.status(201).json({ success: true, task: populated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findByIdAndUpdate(taskId, req.body, { new: true }).populate('assignee', 'username fullName avatar');
    res.json({ success: true, task });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    await Task.findByIdAndDelete(taskId);
    res.json({ success: true, message: 'Task deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getIssues = async (req, res) => {
  try {
    const { projectId } = req.params;
    const issues = await Issue.find({ project: projectId }).populate('reporter assignee', 'username fullName avatar');
    res.json({ success: true, issues });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createIssue = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { title, description, type, priority, assignee } = req.body;

    const issue = await Issue.create({
      project: projectId,
      title,
      description,
      type: type || 'Bug',
      priority: priority || 'Medium',
      assignee,
      reporter: req.user.id
    });

    res.status(201).json({ success: true, issue });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getMilestones = async (req, res) => {
  try {
    const { projectId } = req.params;
    const milestones = await Milestone.find({ project: projectId }).populate('tasks');
    res.json({ success: true, milestones });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createMilestone = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { title, description, dueDate } = req.body;

    const milestone = await Milestone.create({
      project: projectId,
      title,
      description,
      dueDate
    });

    res.status(201).json({ success: true, milestone });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getIssues,
  createIssue,
  getMilestones,
  createMilestone
};
