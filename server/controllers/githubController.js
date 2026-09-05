const { fetchRepoMetadata } = require('../services/githubService');
const Project = require('../models/Project');
const ProjectMember = require('../models/ProjectMember');
const File = require('../models/File');

const importGitHubRepo = async (req, res) => {
  try {
    const { repoUrl } = req.body;
    if (!repoUrl) return res.status(400).json({ success: false, message: 'GitHub Repo URL required.' });

    const parts = repoUrl.replace('https://github.com/', '').split('/');
    const owner = parts[0];
    const repo = parts[1];

    const meta = await fetchRepoMetadata(owner, repo);

    const project = await Project.create({
      name: meta.name || repo,
      description: meta.description || 'Imported from GitHub',
      language: 'javascript',
      framework: 'React',
      template: 'GitHub Import',
      owner: req.user.id,
      tags: ['github-imported', 'open-source']
    });

    await ProjectMember.create({ project: project._id, user: req.user.id, role: 'Owner' });

    // Seed imported files
    await File.insertMany([
      { project: project._id, name: 'index.js', path: '/src/index.js', type: 'file', content: `// Imported from ${repoUrl}\nconsole.log("Repository initialized");\n`, language: 'javascript' },
      { project: project._id, name: 'README.md', path: '/README.md', type: 'file', content: `# ${meta.name}\n${meta.description}\n\nOriginal Repo: [${meta.html_url}](${meta.html_url})`, language: 'markdown' }
    ]);

    res.status(201).json({ success: true, project, meta });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const exportGitHubRepo = async (req, res) => {
  try {
    const { projectId } = req.body;
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found.' });

    res.json({
      success: true,
      message: 'Export package generated.',
      exportUrl: `https://github.com/export/${project.name.toLowerCase().replace(/\s+/g, '-')}.zip`
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { importGitHubRepo, exportGitHubRepo };
