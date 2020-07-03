import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CurrentTabProvider } from './components/Tabs/TabsContext';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CurrentTabProvider><App /></CurrentTabProvider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
