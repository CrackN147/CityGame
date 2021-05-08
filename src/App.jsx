import React from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';

import {routes} from './modules'

import { DataProvider } from './contexts/data';

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
	return(
		<Router>
			<DataProvider> 
				<main>
					<Switch>
						{routes.map((config, i) => {
							return <Route {...config} key={i} />
						})}
					</Switch>
				</main>
			</DataProvider> 
		</Router>
	)
};

export default App