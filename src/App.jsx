import React from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';

import {routes} from './modules'

const App = () => {
	return(
		<Router>
			<main>
				<Switch>
					{routes.map((config, i) => {
						return <Route {...config} key={i} />
					})}
				</Switch>
			</main>
		</Router>
	)
};

export default App