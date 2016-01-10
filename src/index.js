import React from 'react';
import ReactDOM from 'react-dom';
import { createHistory } from 'history';
import Root from 'Root';

/****************************** Stylesheets ***********************************/
import './stylesheets/main.scss'
/******************************************************************************/

// polyfill
if (!Object.assign) Object.assign = React.__spread;

ReactDOM.render(
    <Root history={createHistory()} />, document.getElementById('app')
);
