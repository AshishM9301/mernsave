import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { Container } from 'reactstrap';
import AppNavbar from './components/appNavbar';

import Shoppinglist from './components/Shoppinglist';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ItemModal from './components/itemModal';

function App() {
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

export default App;
