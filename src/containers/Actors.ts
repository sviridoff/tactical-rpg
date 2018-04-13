import { connect } from 'react-redux';

import * as mapDispatchToProps from '../actions';

import { Actors } from '../components/actors';

interface State {
  player: TPlayer;
  actors: TActors;
  grid: TTilemap;
}

const mapStateToProps = (state: State) => state;

export default connect(mapStateToProps, mapDispatchToProps)(Actors);
