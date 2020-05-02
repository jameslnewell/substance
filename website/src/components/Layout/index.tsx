import React from 'react';
import {Reset} from '@substance/reset';
import {Header} from './Header';
import {Footer} from './Footer';
import {Nav} from './Nav';

export const Layout: React.FC = ({children}) => {
  return (
    <div>
      <Reset />
      <Header />
      <Nav />
      {children}
      <Footer />
    </div>
  );
};
