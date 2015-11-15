'use strict';

import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { render } from 'react-dom';
import Main from './components/Main.jsx';

injectTapEventPlugin();

render(<Main />, document.getElementById("app-main"));
