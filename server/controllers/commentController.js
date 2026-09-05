const Comment = require('../models/Comment');
const Task = require('../models/Task');

const getComments = async (req, res) => {
  try {
    const { projectId } = req.params;
    const comments = await Comment.find({ project: projectId })
      .populate('author', 'username fullName avatar')
      .sort({ createdAt: -1 });
    res.json({ success: true, comments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createComment = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { fileId, filePath, lineNumber, content, suggestedReplacement, convertToTask } = req.body;

    const comment = await Comment.create({
      project: projectId,
      file: fileId,
      filePath,
      lineNumber,
      author: req.user.id,
      content,
      suggestedReplacement: suggestedReplacement || ''
    });

    if (convertToTask) {
      await Task.create({
        project: projectId,
        title: `Fix comment at ${filePath}:${lineNumber}`,
        description: content,
        assignee: req.user.id,
        relatedFilePath: filePath
      });
    }

    const populated = await Comment.findById(comment._id).populate('author', 'username fullName avatar');
    res.status(201).json({ success: true, comment: populated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const resolveComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findByIdAndUpdate(commentId, { status: 'Resolved' }, { new: true });
    res.json({ success: true, comment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getComments, createComment, resolveComment };
