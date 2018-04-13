import { connect } from 'react-redux';

import { Profile } from '../components/Profile';

interface State {
  player: TPlayer;
  actors: TActors;
  grid: TTilemap;
}

const mapStateToProps = (state: State) => state;

export default connect(mapStateToProps)(Profile);
