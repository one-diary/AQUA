import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
const App = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<Homepage />
				</Route>
			</Switch>
		</Router>
	);
};

export default App;
