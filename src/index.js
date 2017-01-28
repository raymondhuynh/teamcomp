import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router'; 
import { routes } from './Routes';

import 'grommet/scss/vanilla/index.scss';

ReactDOM.render((
  <Router routes={routes} history={browserHistory} />
  ),
  document.getElementById('root')
);
