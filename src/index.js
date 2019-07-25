import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css'; // Put any other imports below so that CSS from your components takes precedence over default styles.
import './index.css';

import App from './App.jsx';
import registerServiceWorker from './registerServiceWorker';
import { enableLazyLoadPictures } from './lazy-load-pictures';

ReactDOM.render(<App />, document.getElementById('root'));

//since we onlu run in browser (not server rendered) we can use browser specific code
registerServiceWorker();
enableLazyLoadPictures();
