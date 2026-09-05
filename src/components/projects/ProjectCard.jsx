import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, GitFork, Code, Lock, Globe } from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';

export const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/ide?project=${project._id}`)}
      className="group relative flex flex-col justify-between h-48"
    >
      <div>
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#F5C542]">
              <Code className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white group-hover:text-[#F5C542] transition-colors">{project.name}</h3>
              <span className="text-[10px] font-mono text-gray-500">{project.framework || 'React'}</span>
            </div>
          </div>

          <Badge variant={project.visibility === 'Public' ? 'green' : 'gray'}>
            {project.visibility === 'Public' ? <Globe className="w-3 h-3 mr-1" /> : <Lock className="w-3 h-3 mr-1" />}
            {project.visibility}
          </Badge>
        </div>

        <p className="text-xs text-gray-400 line-clamp-2 mb-4">{project.description || 'Collaborative CodeSync AI Project'}</p>
      </div>

      <div className="flex justify-between items-center pt-3 border-t border-[#262626] font-mono text-xs text-gray-500">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> {project.starsCount || 0}</span>
          <span className="flex items-center gap-1"><GitFork className="w-3.5 h-3.5" /> {project.forksCount || 0}</span>
        </div>
        <span className="text-amber-400 text-[10px] font-bold">{project.language ? project.language.toUpperCase() : 'JS'}</span>
      </div>
    </Card>
  );
};
