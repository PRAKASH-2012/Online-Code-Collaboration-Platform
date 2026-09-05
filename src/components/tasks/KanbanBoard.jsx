import React, { useEffect, useState } from 'react';
import { Plus, User, Search, Trash2 } from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { taskService } from '../../services/taskService';

export const KanbanBoard = ({ projectId, tasks: initialTasks = [], onAddTask }) => {
  const columns = ['To Do', 'In Progress', 'Review', 'Done'];
  const demoTasks = [
    { _id: '1', title: 'Optimize Monaco Editor render lag', priority: 'High', status: 'In Progress', assigneeName: 'Arun Demo' },
    { _id: '2', title: 'Integrate AI Security Scanner', priority: 'Urgent', status: 'Done', assigneeName: 'Prakash Demo' },
    { _id: '3', title: 'Implement Voice Huddle UI', priority: 'Medium', status: 'To Do', assigneeName: 'Meena Demo' }
  ];
  const [tasks, setTasks] = useState(initialTasks.length ? initialTasks : demoTasks);
  const [query, setQuery] = useState('');
  const [priority, setPriority] = useState('All');
  const [newTitle, setNewTitle] = useState('');
  const [newPriority, setNewPriority] = useState('Medium');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (!projectId) return undefined;
    let cancelled = false;
    taskService.getTasks(projectId)
      .then((loadedTasks) => { if (!cancelled) setTasks(loadedTasks); })
      .catch((error) => console.warn('Unable to load tasks:', error.message));
    return () => { cancelled = true; };
  }, [projectId]);

  const displayName = (task) => task.assigneeName || task.assignee?.fullName || task.assignee?.username || 'Unassigned';
  const filteredTasks = tasks.filter((task) => {
    const matchesQuery = task.title.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (priority === 'All' || task.priority === priority);
  });

  const addTask = async (event) => {
    event.preventDefault();
    if (!newTitle.trim()) return;
    const draft = { title: newTitle.trim(), priority: newPriority, status: 'To Do' };
    try {
      const created = projectId ? await taskService.createTask(projectId, draft) : { ...draft, _id: `local-${Date.now()}` };
      setTasks((current) => [created, ...current]);
      setNewTitle('');
      onAddTask?.(created);
    } catch (error) {
      console.warn('Unable to create task:', error.message);
    }
  };

  const moveTask = async (task, status) => {
    try {
      const updated = projectId ? await taskService.updateTask(task._id, { status }) : { ...task, status };
      setTasks((current) => current.map((item) => item._id === task._id ? updated : item));
    } catch (error) {
      console.warn('Unable to update task:', error.message);
    }
  };

  const removeTask = async (task) => {
    try {
      if (projectId) await taskService.deleteTask(task._id);
      setTasks((current) => current.filter((item) => item._id !== task._id));
    } catch (error) {
      console.warn('Unable to delete task:', error.message);
    }
  };

  return (
    <div className="flex-1 bg-[#050505] p-6 overflow-x-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-extrabold text-[#D4AF37]">Kanban Task Board</h2>
          <p className="text-xs text-gray-400">Track development sprints and team assignments.</p>
        </div>
      </div>

      <form onSubmit={addTask} className="flex flex-col md:flex-row gap-2 mb-4">
        <input value={newTitle} onChange={(event) => setNewTitle(event.target.value)} placeholder="Add a task..." className="flex-1 bg-[#0D0D0D] border border-[#262626] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-amber-500" />
        <select value={newPriority} onChange={(event) => setNewPriority(event.target.value)} className="bg-[#0D0D0D] border border-[#262626] rounded-lg px-3 py-2 text-sm text-white outline-none">
          <option>Low</option><option>Medium</option><option>High</option><option>Urgent</option>
        </select>
        <Button type="submit" variant="primary" size="sm" icon={Plus}>Add task</Button>
      </form>

      <div className="flex flex-col md:flex-row gap-2 mb-5">
        <div className="relative flex-1"><Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Filter tasks" className="w-full bg-[#0D0D0D] border border-[#262626] rounded-lg py-2 pl-9 pr-3 text-sm text-white outline-none" /></div>
        <select value={priority} onChange={(event) => setPriority(event.target.value)} className="bg-[#0D0D0D] border border-[#262626] rounded-lg px-3 py-2 text-sm text-white outline-none"><option>All</option><option>Low</option><option>Medium</option><option>High</option><option>Urgent</option></select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {columns.map((col) => {
          const colTasks = filteredTasks.filter(t => t.status === col);
          return (
            <div key={col} className="bg-[#0D0D0D] border border-[#262626] rounded-xl p-4 flex flex-col h-[70vh]">
              <div className="flex justify-between items-center pb-3 border-b border-[#262626] mb-3">
                <span className="text-xs font-bold text-white uppercase tracking-wider">{col}</span>
                <Badge variant="gold">{colTasks.length}</Badge>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                {colTasks.map((task) => (
                  <div key={task._id} className="p-3 bg-[#151515] border border-[#262626] hover:border-amber-500/40 rounded-xl space-y-2 transition-all">
                    <h4 className="text-xs font-bold text-gray-200">{task.title}</h4>
                    <div className="flex justify-between items-center text-[10px]">
                      <Badge variant={task.priority === 'Urgent' ? 'red' : 'gold'}>{task.priority}</Badge>
                      <span className="text-gray-400 flex items-center gap-1 font-mono">
                        <User className="w-3 h-3 text-amber-400" /> {displayName(task)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2 pt-1">
                      <select value={task.status} onChange={(event) => moveTask(task, event.target.value)} className="min-w-0 flex-1 bg-[#0D0D0D] border border-[#262626] rounded px-2 py-1 text-[10px] text-gray-300">
                        {columns.map((status) => <option key={status}>{status}</option>)}
                      </select>
                      <button type="button" title="Delete task" onClick={() => removeTask(task)} className="text-gray-500 hover:text-red-400"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
