import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import HeaderComponent from './components/headerComponent/Header.Component';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  // ReactDOM.render(<HeaderComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});
