const File = require('../models/File');
const Version = require('../models/Version');
const ActivityLog = require('../models/ActivityLog');

const getFiles = async (req, res) => {
  try {
    const { projectId } = req.params;
    const files = await File.find({ project: projectId }).sort({ type: -1, name: 1 });
    res.json({ success: true, files });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createFile = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { name, path, type, content, language } = req.body;
    if (!name || !path) return res.status(400).json({ success: false, message: 'Name and path required.' });

    const newFile = await File.create({
      project: projectId,
      name,
      path,
      type: type || 'file',
      content: content || '',
      language: language || 'javascript',
      lastModifiedBy: req.user.id
    });

    await ActivityLog.create({
      user: req.user.id,
      project: projectId,
      action: 'FILE_CREATED',
      details: `Created file ${path}`
    });

    res.status(201).json({ success: true, file: newFile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateFile = async (req, res) => {
  try {
    const { fileId } = req.params;
    const { content, commitMessage } = req.body;

    const file = await File.findByIdAndUpdate(
      fileId,
      { content, isUnsaved: false, lastModifiedBy: req.user.id },
      { new: true }
    );

    if (!file) return res.status(404).json({ success: false, message: 'File not found.' });

    // Store version entry
    await Version.create({
      project: file.project,
      file: file._id,
      filePath: file.path,
      content: file.content,
      editedBy: req.user.id,
      commitMessage: commitMessage || 'Updated file'
    });

    res.json({ success: true, file });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const renameFile = async (req, res) => {
  try {
    const { fileId } = req.params;
    const { newName, newPath } = req.body;

    const file = await File.findByIdAndUpdate(
      fileId,
      { name: newName, path: newPath },
      { new: true }
    );
    res.json({ success: true, file });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteFile = async (req, res) => {
  try {
    const { fileId } = req.params;
    await File.findByIdAndDelete(fileId);
    res.json({ success: true, message: 'File deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getFiles, createFile, updateFile, renameFile, deleteFile };
