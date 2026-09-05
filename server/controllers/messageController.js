const Message = require('../models/Message');
const DirectMessage = require('../models/DirectMessage');
const { emitToProjectRoom, emitToUser } = require('../services/socketService');

const getMessages = async (req, res) => {
  try {
    const { projectId } = req.params;
    const messages = await Message.find({ project: projectId })
      .populate('sender', 'username fullName avatar')
      .sort({ createdAt: 1 })
      .limit(100);
    res.json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { content, codeSnippet } = req.body;
    if (!content) return res.status(400).json({ success: false, message: 'Message content required.' });

    const message = await Message.create({
      project: projectId,
      sender: req.user.id,
      content,
      codeSnippet
    });

    const populated = await Message.findById(message._id).populate('sender', 'username fullName avatar');
    emitToProjectRoom(projectId, 'new-chat-message', populated);

    res.status(201).json({ success: true, message: populated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getDirectMessages = async (req, res) => {
  try {
    const { recipientId } = req.params;
    const dms = await DirectMessage.find({
      $or: [
        { sender: req.user.id, recipient: recipientId },
        { sender: recipientId, recipient: req.user.id }
      ]
    }).sort({ createdAt: 1 });

    res.json({ success: true, messages: dms });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const sendDirectMessage = async (req, res) => {
  try {
    const { recipientId, content } = req.body;
    const dm = await DirectMessage.create({
      sender: req.user.id,
      recipient: recipientId,
      content
    });

    emitToUser(recipientId, 'new-direct-message', dm);
    res.status(201).json({ success: true, message: dm });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getMessages, sendMessage, getDirectMessages, sendDirectMessage };
