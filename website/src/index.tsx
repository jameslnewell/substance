import '@substance/reset';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Theme from '@substance/theme';
import {Provider} from './components/ProjectInfoContext'
import App from './components/App';

ReactDOM.render(
  <Theme>
    <Provider>
      <App/>
    </Provider>
  </Theme>,
  document.getElementById('app')
);
