import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {Reset} from '@substance/reset';
import {Header} from './Header';
import {Footer} from './Footer';
import {Nav} from './Nav';

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  height: 100vh;
`;

export const Layout: React.FC = ({children}) => {
  return (
    <>
      <ThemeProvider theme={{}}>
        <Reset />
        <Wrapper>
          <Header />
          <Nav />
          <div>{children}</div>
          <Footer />
        </Wrapper>
      </ThemeProvider>
    </>
  );
};
