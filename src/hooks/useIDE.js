import { useContext } from 'react';
import { IDEContext } from '../context/IDEContext';

export const useIDE = () => useContext(IDEContext);
