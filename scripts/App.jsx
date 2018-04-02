import { createStore } from 'redux';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

import Grid from './components/Grid';
import reducer from './reducers';

const store = createStore(reducer);

const App = () => (
  <Provider store={store}>
    <div>
      <p>React herea!</p>
      <Grid />
    </div>
  </Provider>
);

export default App;

ReactDOM.render(<App />, document.getElementById('root'));
