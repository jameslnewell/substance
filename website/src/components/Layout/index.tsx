import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {Reset} from '@substance/reset';
import {Header} from './Header';
import {Footer} from './Footer';
import {Nav} from './Nav';

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: auto 1fr;
  height: 100vh;

  & > header,
  & > footer {
    grid-column: 1 / span 2;
  }

  & > nav {
    grid-column: 1 / span 1;
  }

  & > div {
    grid-column: 2 / span 1;
  }
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
