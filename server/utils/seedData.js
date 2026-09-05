const bcrypt = require('bcryptjs');

const generateSeedData = async () => {
  const hashedPassword = await bcrypt.hash('Password123!', 10);

  const users = [
    {
      _id: '665000000000000000000001',
      username: 'prakash_demo',
      email: 'prakash@codesync.ai',
      password: hashedPassword,
      fullName: 'Prakash Demo',
      role: 'Platform Admin',
      avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=prakash',
      bio: 'Full-stack AI developer & Lead Architect.',
      collegeOrCompany: 'CodeSync AI Labs',
      skills: ['React', 'Node.js', 'Python', 'Monaco', 'Socket.IO'],
      languages: ['JavaScript', 'TypeScript', 'Python', 'C++']
    },
    {
      _id: '665000000000000000000002',
      username: 'arun_demo',
      email: 'arun@codesync.ai',
      password: hashedPassword,
      fullName: 'Arun Demo',
      role: 'Developer',
      avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=arun',
      bio: 'Frontend Specialist & UI/UX Designer.',
      collegeOrCompany: 'Tech Institute',
      skills: ['React', 'Tailwind CSS', 'Framer Motion'],
      languages: ['JavaScript', 'HTML', 'CSS']
    },
    {
      _id: '665000000000000000000003',
      username: 'kumar_demo',
      email: 'kumar@codesync.ai',
      password: hashedPassword,
      fullName: 'Kumar Demo',
      role: 'Developer',
      avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=kumar',
      bio: 'Backend & Systems Engineer.',
      collegeOrCompany: 'CodeSync AI Org',
      skills: ['Node.js', 'Express', 'MongoDB', 'C++'],
      languages: ['C++', 'Python', 'JavaScript']
    },
    {
      _id: '665000000000000000000004',
      username: 'meena_demo',
      email: 'meena@codesync.ai',
      password: hashedPassword,
      fullName: 'Meena Demo',
      role: 'Developer',
      avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=meena',
      bio: 'AI & Data Science Student Researcher.',
      collegeOrCompany: 'AI Research Lab',
      skills: ['Python', 'PyTorch', 'Data Analysis'],
      languages: ['Python', 'SQL', 'R']
    }
  ];

  const projects = [
    {
      _id: '665100000000000000000001',
      name: 'AI Student Portal',
      description: 'Collaborative student portal powered by React & Node.js with real-time IDE features.',
      language: 'javascript',
      framework: 'React',
      template: 'React Starter',
      visibility: 'Public',
      color: '#D4AF37',
      category: 'Education',
      tags: ['react', 'collaboration', 'ai', 'black-and-gold'],
      starsCount: 28,
      forksCount: 6,
      owner: '665000000000000000000001'
    },
    {
      _id: '665100000000000000000002',
      name: 'Collaborative Portfolio',
      description: 'Futuristic black-and-gold interactive portfolio for hackathon team showcases.',
      language: 'javascript',
      framework: 'HTML/CSS/JS',
      template: 'Portfolio',
      visibility: 'Public',
      color: '#F5C542',
      category: 'Web',
      tags: ['portfolio', 'tailwind', 'framer'],
      starsCount: 42,
      forksCount: 12,
      owner: '665000000000000000000002'
    },
    {
      _id: '665100000000000000000003',
      name: 'Python Algorithm Lab',
      description: 'High-performance Python algorithm benchmark suite with live AI optimization.',
      language: 'python',
      framework: 'Flask',
      template: 'Python Script',
      visibility: 'Public',
      color: '#A88A2D',
      category: 'Algorithms',
      tags: ['python', 'algorithms', 'ai-scoring'],
      starsCount: 19,
      forksCount: 3,
      owner: '665000000000000000000004'
    },
    {
      _id: '665100000000000000000004',
      name: 'Java Management System',
      description: 'Enterprise resource management backend system built in Java.',
      language: 'java',
      framework: 'Spring Boot',
      template: 'Java Starter',
      visibility: 'Private',
      color: '#B8860B',
      category: 'Enterprise',
      tags: ['java', 'spring', 'enterprise'],
      starsCount: 8,
      forksCount: 1,
      owner: '665000000000000000000003'
    }
  ];

  return { users, projects };
};

module.exports = { generateSeedData };
