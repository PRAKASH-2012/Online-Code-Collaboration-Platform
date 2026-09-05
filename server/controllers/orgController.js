const Organization = require('../models/Organization');
const Team = require('../models/Team');

const createOrg = async (req, res) => {
  try {
    const { name, description, website } = req.body;
    const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '-');

    const org = await Organization.create({
      name,
      slug,
      description,
      website,
      owner: req.user.id
    });

    res.status(201).json({ success: true, organization: org });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getOrgs = async (req, res) => {
  try {
    const orgs = await Organization.find({ owner: req.user.id });
    res.json({ success: true, organizations: orgs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createTeam = async (req, res) => {
  try {
    const { orgId, name, description, members } = req.body;
    const team = await Team.create({
      organization: orgId,
      name,
      description,
      members: members || [req.user.id]
    });
    res.status(201).json({ success: true, team });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createOrg, getOrgs, createTeam };
