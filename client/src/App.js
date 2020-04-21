import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { Container } from 'reactstrap';
import AppNavbar from './components/appNavbar';

import Shoppinglist from './components/Shoppinglist';
import { loadUser } from './actions/authActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ItemModal from './components/itemModal';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <div className='App'>
          <AppNavbar />
          <Container>
            <ItemModal />
            <Shoppinglist />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
