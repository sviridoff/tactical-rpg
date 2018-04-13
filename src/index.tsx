import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import Profile from './containers/Profile';
import Tilemap from './containers/Tilemap';
import Actors from './containers/Actors';

const App = () => {
  const style: any = {
    position: 'relative',
  };

  return (
    <Provider store={store}>
      <div>
        <Profile />
        <div style={style}>
          <Actors />
          <Tilemap />
        </div>
      </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
