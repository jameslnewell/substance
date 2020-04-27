import * as React from 'react';
import {Header} from './Header';
import {HeroPanel} from './HeroPanel';
import {FeaturePanel} from './FeaturePanel';
import {Nav} from './Nav';
import {Footer} from './Footer';

export class HomePage extends React.Component<{}> {
  render() {
    return (
      <div>
        <Header />
        <div>
          <HeroPanel />
          <FeaturePanel />
        </div>
        <Nav />
        <Footer />
      </div>
    );
  }
}
