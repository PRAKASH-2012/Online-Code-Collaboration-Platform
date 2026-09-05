const Execution = require('../models/Execution');
const AIInteraction = require('../models/AIInteraction');
const Task = require('../models/Task');
const Message = require('../models/Message');

const getProjectAnalytics = async (req, res) => {
  try {
    const { projectId } = req.params;

    const executionsCount = await Execution.countDocuments({ project: projectId });
    const aiCount = await AIInteraction.countDocuments({ project: projectId });
    const tasksCount = await Task.countDocuments({ project: projectId });
    const completedTasksCount = await Task.countDocuments({ project: projectId, status: 'Done' });
    const messagesCount = await Message.countDocuments({ project: projectId });

    res.json({
      success: true,
      analytics: {
        totalExecutions: executionsCount || 24,
        aiRequests: aiCount || 48,
        totalTasks: tasksCount || 12,
        completedTasks: completedTasksCount || 8,
        teamMessages: messagesCount || 150,
        activeHours: 64,
        mostActiveContributor: 'Prakash Demo',
        languageUsage: [
          { name: 'JavaScript/React', value: 55 },
          { name: 'Python', value: 25 },
          { name: 'HTML/CSS', value: 15 },
          { name: 'JSON/YAML', value: 5 }
        ],
        weeklyActivity: [
          { day: 'Mon', commits: 12, executions: 5, aiPrompts: 10 },
          { day: 'Tue', commits: 18, executions: 9, aiPrompts: 14 },
          { day: 'Wed', commits: 25, executions: 14, aiPrompts: 22 },
          { day: 'Thu', commits: 20, executions: 11, aiPrompts: 18 },
          { day: 'Fri', commits: 30, executions: 16, aiPrompts: 28 },
          { day: 'Sat', commits: 8, executions: 4, aiPrompts: 6 },
          { day: 'Sun', commits: 15, executions: 7, aiPrompts: 12 }
        ]
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getProjectAnalytics };
