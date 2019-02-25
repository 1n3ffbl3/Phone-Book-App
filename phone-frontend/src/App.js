import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import PhoneList from './components/table/PhoneList';
import 'react-toastify/dist/ReactToastify.min.css';
import ActionPhone from './components/ActionPhone';

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div className="container">
					<Route exact path="/" component={PhoneList} />
					<Route exact path="/new" component={ActionPhone} />
					<Route path="/edit/:phoneBookRecordId" component={ActionPhone} />
					<ToastContainer />
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
