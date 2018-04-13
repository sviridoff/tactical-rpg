import { connect } from 'react-redux';

import { Tilemap } from '../components/Tilemap';
import * as mapDispatchToProps from '../actions';

interface State {
  player: TPlayer;
  actors: TActors;
  grid: TTilemap;
}

const mapStateToProps = (state: State) => state;

export default connect(mapStateToProps, mapDispatchToProps)(Tilemap);
