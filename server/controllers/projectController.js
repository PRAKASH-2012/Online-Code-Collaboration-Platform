const Project = require('../models/Project');
const ProjectMember = require('../models/ProjectMember');
const File = require('../models/File');
const Star = require('../models/Star');
const ActivityLog = require('../models/ActivityLog');

const createProject = async (req, res) => {
  try {
    const { name, description, language, framework, template, visibility, color, category, tags, license } = req.body;
    if (!name) return res.status(400).json({ success: false, message: 'Project name is required.' });

    const project = await Project.create({
      name,
      description,
      language: language || 'javascript',
      framework: framework || 'React',
      template: template || 'React Starter',
      visibility: visibility || 'Public',
      color: color || '#D4AF37',
      category: category || 'General',
      tags: tags || ['react', 'collaboration'],
      license: license || 'MIT',
      owner: req.user.id
    });

    await ProjectMember.create({
      project: project._id,
      user: req.user.id,
      role: 'Owner'
    });

    // Create initial starter files
    const starterFiles = getStarterFiles(template, language, project._id, req.user.id);
    await File.insertMany(starterFiles);

    await ActivityLog.create({
      user: req.user.id,
      project: project._id,
      action: 'PROJECT_CREATED',
      details: `Created project ${project.name}`
    });

    res.status(201).json({ success: true, project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getProjects = async (req, res) => {
  try {
    const userId = req.user.id;
    const memberProjects = await ProjectMember.find({ user: userId }).populate('project');
    const projects = memberProjects.map(m => m.project).filter(Boolean);

    res.json({ success: true, projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getPublicProjects = async (req, res) => {
  try {
    const projects = await Project.find({ visibility: 'Public' }).populate('owner', 'username fullName avatar').limit(20);
    res.json({ success: true, projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id).populate('owner', 'username fullName avatar email');
    if (!project) return res.status(404).json({ success: false, message: 'Project not found.' });

    const members = await ProjectMember.find({ project: id }).populate('user', 'username fullName avatar email role availability');

    res.json({ success: true, project, members });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ success: true, project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    await Project.findByIdAndDelete(id);
    await ProjectMember.deleteMany({ project: id });
    await File.deleteMany({ project: id });
    res.json({ success: true, message: 'Project deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const starProject = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await Star.findOne({ user: req.user.id, project: id });
    if (existing) {
      await Star.deleteOne({ _id: existing._id });
      await Project.findByIdAndUpdate(id, { $inc: { starsCount: -1 } });
      return res.json({ success: true, starred: false });
    }
    await Star.create({ user: req.user.id, project: id });
    await Project.findByIdAndUpdate(id, { $inc: { starsCount: 1 } });
    res.json({ success: true, starred: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const forkProject = async (req, res) => {
  try {
    const { id } = req.params;
    const original = await Project.findById(id);
    if (!original) return res.status(404).json({ success: false, message: 'Original project not found.' });

    const forked = await Project.create({
      name: `${original.name} (Forked)`,
      description: original.description,
      language: original.language,
      framework: original.framework,
      template: original.template,
      owner: req.user.id,
      forkedFrom: original._id
    });

    await ProjectMember.create({ project: forked._id, user: req.user.id, role: 'Owner' });
    await Project.findByIdAndUpdate(id, { $inc: { forksCount: 1 } });

    const originalFiles = await File.find({ project: id });
    const copiedFiles = originalFiles.map(f => ({
      project: forked._id,
      name: f.name,
      path: f.path,
      type: f.type,
      content: f.content,
      language: f.language,
      parentPath: f.parentPath
    }));
    await File.insertMany(copiedFiles);

    res.status(201).json({ success: true, project: forked });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const addMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, role } = req.body;

    const member = await ProjectMember.create({
      project: id,
      user: userId,
      role: role || 'Editor'
    });

    res.status(201).json({ success: true, member });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateMemberRole = async (req, res) => {
  try {
    const { id, memberId } = req.params;
    const { role } = req.body;
    const updated = await ProjectMember.findByIdAndUpdate(memberId, { role }, { new: true });
    res.json({ success: true, member: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const removeMember = async (req, res) => {
  try {
    const { memberId } = req.params;
    await ProjectMember.findByIdAndDelete(memberId);
    res.json({ success: true, message: 'Member removed.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getStarterFiles = (template, language, projectId, userId) => {
  if (language === 'python' || template.toLowerCase().includes('python')) {
    return [
      { project: projectId, name: 'main.py', path: '/main.py', type: 'file', content: `# CodeSync AI - Python Workspace\n\ndef main():\n    print("Welcome to CodeSync AI!")\n    numbers = [1, 2, 3, 4, 5]\n    squared = [x**2 for x in numbers]\n    print(f"Squared values: {squared}")\n\nif __name__ == "__main__":\n    main()\n`, language: 'python', lastModifiedBy: userId },
      { project: projectId, name: 'README.md', path: '/README.md', type: 'file', content: '# Python Project\nCreated with CodeSync AI', language: 'markdown', lastModifiedBy: userId }
    ];
  }

  return [
    { project: projectId, name: 'App.jsx', path: '/src/App.jsx', type: 'file', content: `import React, { useState } from 'react';\n\nexport default function App() {\n  const [count, setCount] = useState(0);\n  return (\n    <div style={{ padding: '2rem', fontFamily: 'sans-serif', background: '#050505', color: '#FFF' }}>\n      <h1 style={{ color: '#D4AF37' }}>CodeSync AI Collaborative App</h1>\n      <p>Real-time collaboration active.</p>\n      <button onClick={() => setCount(c => c + 1)} style={{ padding: '8px 16px', background: '#D4AF37', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>\n        Count: {count}\n      </button>\n    </div>\n  );\n}\n`, language: 'javascript', lastModifiedBy: userId },
      { project: projectId, name: 'main.jsx', path: '/src/main.jsx', type: 'file', content: `import React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport App from './App.jsx';\n\nReactDOM.createRoot(document.getElementById('root')).render(<App />);\n`, language: 'javascript', lastModifiedBy: userId },
      { project: projectId, name: 'index.html', path: '/index.html', type: 'file', content: `<!DOCTYPE html>\n<html>\n<head>\n<title>CodeSync AI Preview</title>\n</head>\n<body>\n<div id="root"></div>\n</body>\n</html>`, language: 'html', lastModifiedBy: userId },
      { project: projectId, name: 'README.md', path: '/README.md', type: 'file', content: '# React Collaborative Project\nCreated with CodeSync AI', language: 'markdown', lastModifiedBy: userId }
  ];
};

module.exports = {
  createProject,
  getProjects,
  getPublicProjects,
  getProjectById,
  updateProject,
  deleteProject,
  starProject,
  forkProject,
  addMember,
  updateMemberRole,
  removeMember
};
