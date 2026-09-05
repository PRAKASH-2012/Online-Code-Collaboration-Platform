import React, { createContext, useState, useEffect, useContext } from 'react';
import { initSocket, getSocket, disconnectSocket } from '../services/socketService';
import { AuthContext } from './AuthContext';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [socket, setSocketInstance] = useState(null);
  const [presenceList, setPresenceList] = useState([]);

  useEffect(() => {
    if (user) {
      const s = initSocket();
      setSocketInstance(s);

      s.on('presence-update', (list) => {
        setPresenceList(list);
      });

      return () => {
        s.off('presence-update');
      };
    } else {
      disconnectSocket();
      setSocketInstance(null);
    }
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket, presenceList, setPresenceList }}>
      {children}
    </SocketContext.Provider>
  );
};
