require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Project = require('../models/Project');
const ProjectMember = require('../models/ProjectMember');
const File = require('../models/File');
const Message = require('../models/Message');
const Task = require('../models/Task');
const Notification = require('../models/Notification');
const { generateSeedData } = require('./seedData');

const seedDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb://localhost:27017/codesync-ai';
    await mongoose.connect(connStr);
    console.log('[Seed] Connected to MongoDB.');

    await User.deleteMany({});
    await Project.deleteMany({});
    await ProjectMember.deleteMany({});
    await File.deleteMany({});
    await Message.deleteMany({});
    await Task.deleteMany({});
    await Notification.deleteMany({});

    const { users, projects } = await generateSeedData();

    await User.insertMany(users);
    console.log(`[Seed] Seeded ${users.length} demo users.`);

    await Project.insertMany(projects);
    console.log(`[Seed] Seeded ${projects.length} demo projects.`);

    // Seed Project Memberships
    const members = [];
    projects.forEach(p => {
      users.forEach(u => {
        const isOwner = u._id === p.owner;
        members.push({
          project: p._id,
          user: u._id,
          role: isOwner ? 'Owner' : (u.username.includes('arun') ? 'Maintainer' : 'Editor')
        });
      });
    });
    await ProjectMember.insertMany(members);

    // Seed Initial Files
    const files = [
      {
        project: '665100000000000000000001',
        name: 'App.jsx',
        path: '/src/App.jsx',
        type: 'file',
        content: `import React, { useState } from 'react';\nimport './App.css';\n\nexport default function App() {\n  const [activeTab, setActiveTab] = useState('overview');\n  const [collaborators, setCollaborators] = useState(['Prakash Demo', 'Arun Demo', 'Meena Demo']);\n\n  return (\n    <div className="min-h-screen bg-[#050505] text-white font-sans border border-amber-500/20 p-6 rounded-lg">\n      <header className="flex justify-between items-center pb-4 border-b border-[#262626]">\n        <h1 className="text-2xl font-bold text-[#D4AF37]">CodeSync AI - Student Portal</h1>\n        <div className="flex gap-2">\n          {collaborators.map((c, i) => (\n            <span key={i} className="px-3 py-1 bg-[#151515] border border-amber-500/30 text-amber-400 rounded-full text-xs font-mono">\n              ● {c}\n            </span>\n          ))}\n        </div>\n      </header>\n\n      <main className="mt-6 grid grid-cols-3 gap-6">\n        <div className="col-span-2 bg-[#0D0D0D] p-6 rounded-xl border border-[#262626] hover:border-[#D4AF37]/50 transition-all">\n          <h2 className="text-lg font-semibold text-amber-400 mb-2">Live IDE Canvas</h2>\n          <p className="text-gray-400 text-sm mb-4">Real-time Yjs CRDT synchronized editor buffer ready.</p>\n          <div className="bg-[#151515] p-4 rounded-lg font-mono text-sm text-green-400">\n            const syncStatus = "ONLINE_COLLABORATION";\n            console.log("Connected to CodeSync AI Engine");\n          </div>\n        </div>\n\n        <div className="bg-[#0D0D0D] p-6 rounded-xl border border-[#262626]">\n          <h2 className="text-lg font-semibold text-amber-400 mb-2">AI Copilot Score</h2>\n          <div className="text-3xl font-extrabold text-amber-400 mb-1">94/100</div>\n          <p className="text-xs text-gray-500">Security: 98% | Maintainability: 92%</p>\n        </div>\n      </main>\n    </div>\n  );\n}\n`,
        language: 'javascript',
        lastModifiedBy: '665000000000000000000001'
      },
      {
        project: '665100000000000000000001',
        name: 'README.md',
        path: '/README.md',
        type: 'file',
        content: '# AI Student Portal\n\nWelcome to **CodeSync AI**! Live real-time collaboration with Monaco Editor & Gemini AI.',
        language: 'markdown',
        lastModifiedBy: '665000000000000000000001'
      },
      {
        project: '665100000000000000000003',
        name: 'main.py',
        path: '/main.py',
        type: 'file',
        content: `import time\nimport math\n\ndef prime_sieve(n):\n    """Calculates prime numbers using Sieve of Eratosthenes."""\n    primes = [True] * (n + 1)\n    primes[0] = primes[1] = False\n    for i in range(2, int(math.sqrt(n)) + 1):\n        if primes[i]:\n            for j in range(i*i, n + 1, i):\n                primes[j] = False\n    return [i for i in range(n + 1) if primes[i]]\n\nif __name__ == "__main__":\n    start = time.time()\n    res = prime_sieve(100)\n    print(f"Calculated {len(res)} primes in {time.time() - start:.4f}s")\n    print(f"Primes up to 100: {res[:10]}...")\n`,
        language: 'python',
        lastModifiedBy: '665000000000000000000004'
      }
    ];
    await File.insertMany(files);

    // Seed Messages
    await Message.insertMany([
      {
        project: '665100000000000000000001',
        sender: '665000000000000000000001',
        content: 'Welcome everyone! I updated the App.jsx file with the Black & Gold theme styling.',
        codeSnippet: { code: 'const syncStatus = "ONLINE_COLLABORATION";', language: 'javascript' }
      },
      {
        project: '665100000000000000000001',
        sender: '665000000000000000000002',
        content: 'Looks awesome Prakash! I am testing the live cursor positioning right now.'
      }
    ]);

    // Seed Tasks
    await Task.insertMany([
      {
        project: '665100000000000000000001',
        title: 'Optimize Monaco Editor initial render',
        description: 'Reduce initial bundle lazy load lag for low bandwidth connections.',
        priority: 'High',
        status: 'In Progress',
        assignee: '665000000000000000000002'
      },
      {
        project: '665100000000000000000001',
        title: 'Integrate AI Security Scanner endpoint',
        description: 'Verify OWASP Top 10 vulnerabilities scanning pipeline.',
        priority: 'Urgent',
        status: 'Done',
        assignee: '665000000000000000000001'
      }
    ]);

    // Seed Notifications
    await Notification.insertMany([
      {
        user: '665000000000000000000001',
        title: 'Welcome to CodeSync AI',
        message: 'Your platform admin environment is fully seeded and ready.',
        type: 'System'
      }
    ]);

    console.log('[Seed] Seed script completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]', error);
    process.exit(1);
  }
};

if (require.main === module) {
  seedDB();
}

module.exports = { seedDB };
