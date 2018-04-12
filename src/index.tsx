import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import logger from 'redux-logger';

import Grid from './components/grid';
import Actors from './components/actors';
import Profile from './components/profile';
import reducer from './reducers';

const store = createStore(reducer, applyMiddleware(logger));

(window as any).store = store;

const App = () => {
  const style : any = {
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

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
