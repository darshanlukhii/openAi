import React, {Component} from 'react';
import ChatScreen from './Screens/ChatScreen';
import configureStore from './Screens/Redux';
import { Provider } from 'react-redux';

const App = () => {
  const store = configureStore()
  return (
    <Provider store={store}>
      <ChatScreen />
    </Provider>
  );
};

export default App;
