import React from 'react';
import styled, {ThemeProvider, createGlobalStyle} from 'styled-components';
import {Reset} from '@substance/reset';
import {Header} from './Header';
import {Footer} from './Footer';
import {Nav} from './Nav';

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 1fr auto;
  height: 100vh;

  & > header,
  & > footer {
    grid-column: 1 / span 2;
  }

  & > nav {
    grid-column: 2 / span 1;
  }

  & > main {
    grid-column: 1 / span 1;
  }
`;

const palette = {
  1: '#3d5a80ff',
  2: '#98c1d9ff',
  3: '#e0fbfcff',
  4: '#ee6c4dff',
  5: '#293241ff',
};

const theme = {
  color: {
    surface: '#fff',
    onSurface: palette[5],
    primary: palette[1],
    secondary: palette[2],
    tertiary: palette[3],
  },
  container: {
    space: {mobile: 2, desktop: 0},
  },
};

const GlobalStyle = createGlobalStyle`
  html {
    font-family: system-ui;
  }
`;

export interface LayoutProps {
  isSecondaryNavigationVisible?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
  isSecondaryNavigationVisible,
  children,
}) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Reset />
        <GlobalStyle />
        <Wrapper>
          <Header />
          <main>{children}</main>
          {isSecondaryNavigationVisible && <Nav />}
          <Footer />
        </Wrapper>
      </ThemeProvider>
    </>
  );
};
