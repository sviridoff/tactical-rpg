import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import logger from 'redux-logger';

import Grid from './components/grid';
import Actors from './components/actors';
import Profile from './components/profile';
import reducer from './reducers';

const store = createStore(reducer, applyMiddleware(logger));

window.store = store;

const App = () => {
  const style = {
    position: 'relative',
  };

  return (
    <Provider store={store}>
      <div>
        <Profile />
        <div style={style}>
          <Actors />
          <Grid />
        </div>
      </div>
    </Provider>
  );
};

export default App;

ReactDOM.render(<App />, document.getElementById('root'));
