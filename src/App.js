import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import VisitorRoutes from './commponents/headers/VisitorRoutes';
import { Provider } from 'react-redux'
import store from './store';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <VisitorRoutes />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
