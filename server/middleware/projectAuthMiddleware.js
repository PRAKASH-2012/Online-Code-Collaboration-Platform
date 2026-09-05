const ProjectMember = require('../models/ProjectMember');
const Project = require('../models/Project');

const checkProjectRole = (requiredRoles = []) => {
  return async (req, res, next) => {
    try {
      const projectId = req.params.projectId || req.body.projectId || req.query.projectId;
      if (!projectId) {
        return res.status(400).json({ success: false, message: 'Project ID required.' });
      }

      const project = await Project.findById(projectId);
      if (!project) {
        return res.status(404).json({ success: false, message: 'Project not found.' });
      }

      // Check if project owner
      if (project.owner.toString() === req.user.id.toString() || req.user.role === 'Platform Admin') {
        req.projectRole = 'Owner';
        req.project = project;
        return next();
      }

      // Check membership
      const member = await ProjectMember.findOne({ project: projectId, user: req.user.id });
      if (!member) {
        if (project.visibility === 'Public') {
          req.projectRole = 'Viewer';
          req.project = project;
          if (requiredRoles.length === 0 || requiredRoles.includes('Viewer')) {
            return next();
          }
        }
        return res.status(403).json({ success: false, message: 'You do not have access to this project.' });
      }

      req.projectRole = member.role;
      req.project = project;

      if (requiredRoles.length > 0 && !requiredRoles.includes(member.role)) {
        return res.status(403).json({ success: false, message: `Insufficient permissions. Requires: ${requiredRoles.join(', ')}` });
      }

      next();
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
};

module.exports = { checkProjectRole };
