const Snapshot = require('../models/Snapshot');
const Version = require('../models/Version');
const File = require('../models/File');

const createSnapshot = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { name, description } = req.body;

    const currentFiles = await File.find({ project: projectId });
    const snapshotFiles = currentFiles.map(f => ({
      path: f.path,
      content: f.content,
      language: f.language
    }));

    const snapshot = await Snapshot.create({
      project: projectId,
      name,
      description,
      createdBy: req.user.id,
      filesSnapshot: snapshotFiles
    });

    res.status(201).json({ success: true, snapshot });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getSnapshots = async (req, res) => {
  try {
    const { projectId } = req.params;
    const snapshots = await Snapshot.find({ project: projectId }).populate('createdBy', 'username fullName avatar').sort({ createdAt: -1 });
    res.json({ success: true, snapshots });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const restoreSnapshot = async (req, res) => {
  try {
    const { snapshotId } = req.params;
    const snapshot = await Snapshot.findById(snapshotId);
    if (!snapshot) return res.status(404).json({ success: false, message: 'Snapshot not found.' });

    // Restore files
    await File.deleteMany({ project: snapshot.project });
    const restoredFiles = snapshot.filesSnapshot.map(f => ({
      project: snapshot.project,
      name: f.path.split('/').pop(),
      path: f.path,
      content: f.content,
      language: f.language,
      lastModifiedBy: req.user.id
    }));
    await File.insertMany(restoredFiles);

    res.json({ success: true, message: 'Project snapshot restored successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getVersionHistory = async (req, res) => {
  try {
    const { fileId } = req.params;
    const versions = await Version.find({ file: fileId }).populate('editedBy', 'username fullName avatar').sort({ createdAt: -1 });
    res.json({ success: true, versions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createSnapshot, getSnapshots, restoreSnapshot, getVersionHistory };
