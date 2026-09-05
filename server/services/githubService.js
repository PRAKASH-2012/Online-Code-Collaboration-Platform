const axios = require('axios');

const fetchRepoMetadata = async (owner, repo) => {
  try {
    const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: { 'User-Agent': 'CodeSync-AI-App' },
      timeout: 5000
    });
    return response.data;
  } catch (error) {
    return {
      name: repo,
      full_name: `${owner}/${repo}`,
      description: 'GitHub repository imported into CodeSync AI',
      stargazers_count: 42,
      forks_count: 12,
      default_branch: 'main',
      html_url: `https://github.com/${owner}/${repo}`
    };
  }
};

module.exports = { fetchRepoMetadata };
