import * as React from 'react';
import {Header} from '../Layout/Header';
// import {HeroPanel} from './HeroPanel.tsx_';
// import {FeaturePanel} from './FeaturePanel.tsx_';
import {Nav} from '../Layout/Nav';
import {Footer} from '../Layout/Footer';

export class HomePage extends React.Component<{}> {
  render() {
    return (
      <div>
        <Header />
        <div>{/* <HeroPanel />
          <FeaturePanel /> */}</div>
        <Nav />
        <Footer />
      </div>
    );
  }
}
