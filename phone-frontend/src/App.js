import React, { Component } from 'react';
import './App.css';
import PhoneList from './components/table/PhoneList';
import { BrowserRouter, Route } from 'react-router-dom';
import AddNewPhone from './components/AddPhone';
import EditPhone from './components/EditPhone';
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Route exact path="/" component={PhoneList} />
          <Route exact path="/new" component={AddNewPhone} />
          <Route path="/edit/:phoneBookRecordId" component={EditPhone} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
