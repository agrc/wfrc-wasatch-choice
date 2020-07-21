import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import URLParams from './URLParams';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<URLParams><App /></URLParams>, div);
  ReactDOM.unmountComponentAtNode(div);
});
