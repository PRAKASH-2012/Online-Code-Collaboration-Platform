import React, { createContext, useState } from 'react';

export const IDEContext = createContext();

export const IDEProvider = ({ children }) => {
  const [activeProject, setActiveProject] = useState(null);
  const [files, setFiles] = useState([]);
  const [openTabs, setOpenTabs] = useState([]);
  const [activeTabPath, setActiveTabPath] = useState(null);
  const [activeActivityTab, setActiveActivityTab] = useState('explorer');
  const [terminalPanelOpen, setTerminalPanelOpen] = useState(true);
  const [activeTerminalTab, setActiveTerminalTab] = useState('terminal');
  const [terminalOutput, setTerminalOutput] = useState([
    { type: 'info', text: 'CodeSync AI Terminal v1.0 [Black & Gold Theme Active]' },
    { type: 'success', text: 'Socket.IO Real-Time Engine Connected' }
  ]);
  const [followedUser, setFollowedUser] = useState(null);
  const [heatmapEnabled, setHeatmapEnabled] = useState(false);
  const [heatmapData, setHeatmapData] = useState({}); // { lineNum: editCount }
  const [aiPersona, setAiPersona] = useState('Architect');
  const [audioHuddleActive, setAudioHuddleActive] = useState(false);

  const openFile = (file) => {
    if (!openTabs.some(t => t.path === file.path)) {
      setOpenTabs(prev => [...prev, file]);
    }
    setActiveTabPath(file.path);
  };

  const closeTab = (path) => {
    const filtered = openTabs.filter(t => t.path !== path);
    setOpenTabs(filtered);
    if (activeTabPath === path) {
      setActiveTabPath(filtered.length > 0 ? filtered[filtered.length - 1].path : null);
    }
  };

  const updateFileContent = (path, newContent) => {
    setFiles(prev => prev.map(f => f.path === path ? { ...f, content: newContent, isUnsaved: true } : f));
    setOpenTabs(prev => prev.map(t => t.path === path ? { ...t, content: newContent, isUnsaved: true } : t));
  };

  const markFileSaved = (path, savedFile) => {
    setFiles(prev => prev.map(file => file.path === path ? { ...file, ...savedFile, isUnsaved: false } : file));
    setOpenTabs(prev => prev.map(tab => tab.path === path ? { ...tab, ...savedFile, isUnsaved: false } : tab));
  };

  const addTerminalLog = (log) => {
    setTerminalOutput(prev => [...prev, log]);
  };

  return (
    <IDEContext.Provider value={{
      activeProject, setActiveProject,
      files, setFiles,
      openTabs, setOpenTabs,
      activeTabPath, setActiveTabPath,
      activeActivityTab, setActiveActivityTab,
      terminalPanelOpen, setTerminalPanelOpen,
      activeTerminalTab, setActiveTerminalTab,
      terminalOutput, setTerminalOutput, addTerminalLog,
      followedUser, setFollowedUser,
      heatmapEnabled, setHeatmapEnabled,
      heatmapData, setHeatmapData,
      aiPersona, setAiPersona,
      audioHuddleActive, setAudioHuddleActive,
      openFile, closeTab, updateFileContent, markFileSaved
    }}>
      {children}
    </IDEContext.Provider>
  );
};
