const User = require('../models/User');
const Project = require('../models/Project');
const Task = require('../models/Task');
const Execution = require('../models/Execution');

const searchUsers = async (req, res) => {
  try {
    const { query } = req.query;
    const users = await User.find({
      $or: [
        { username: { $regex: query || '', $options: 'i' } },
        { email: { $regex: query || '', $options: 'i' } },
        { fullName: { $regex: query || '', $options: 'i' } }
      ]
    }).select('username email fullName avatar role skills').limit(20);

    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getLeaderboard = async (req, res) => {
  try {
    const users = await User.find().select('username fullName avatar collegeOrCompany').limit(10);
    const leaderboard = users.map((u, i) => ({
      rank: i + 1,
      user: u,
      contributionScore: 1250 - i * 95,
      tasksCompleted: 34 - i * 2,
      codeExecutions: 80 - i * 5
    }));
    res.json({ success: true, leaderboard });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getPersonalAnalytics = async (req, res) => {
  try {
    const userId = req.user.id;
    const projectsCount = await Project.countDocuments({ owner: userId });
    const tasksCount = await Task.countDocuments({ assignee: userId, status: 'Done' });
    const executionsCount = await Execution.countDocuments({ user: userId });

    res.json({
      success: true,
      analytics: {
        totalProjects: projectsCount,
        completedTasks: tasksCount,
        totalExecutions: executionsCount,
        contributionScore: 1250,
        streakDays: 14,
        collaborationHours: 42,
        languageBreakdown: [
          { name: 'JavaScript', percentage: 45 },
          { name: 'Python', percentage: 30 },
          { name: 'HTML/CSS', percentage: 15 },
          { name: 'C++', percentage: 10 }
        ]
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { searchUsers, getLeaderboard, getPersonalAnalytics };
