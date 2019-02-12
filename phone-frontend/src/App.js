import React, { Component } from 'react';
import './App.css';
import PhoneList from './components/table/PhoneList';
import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Route exact path="/" component={PhoneList} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
