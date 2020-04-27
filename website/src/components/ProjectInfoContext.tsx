import * as React from 'react';
import * as project from '@tradie/project-info';

const Context = React.createContext(project as any);

export const Consumer = Context.Consumer;

export const Provider = ({children}: {children: React.ReactNode}) => (
  <Context.Provider value={project as any}>{children}</Context.Provider>
);
