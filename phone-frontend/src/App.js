import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import PhoneList from './components/table/PhoneList';
import AddNewPhone from './components/AddPhone';
import EditPhone from './components/EditPhone';
import 'react-toastify/dist/ReactToastify.min.css';

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div className="container">
					<Route exact path="/" component={PhoneList} />
					<Route exact path="/new" component={AddNewPhone} />
					<Route path="/edit/:phoneBookRecordId" component={EditPhone} />
					<ToastContainer />
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
