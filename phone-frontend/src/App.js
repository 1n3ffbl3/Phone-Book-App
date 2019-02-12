import React, { Component } from 'react';
import './App.css';
import PhoneList from './components/table/PhoneList';
import { BrowserRouter, Route } from 'react-router-dom';
import AddNewPhone from './components/AddPhone';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Route exact path="/" component={PhoneList} />
          <Route exact path="/new" component={AddNewPhone} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
