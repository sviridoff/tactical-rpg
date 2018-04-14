import { connect } from "react-redux";

import * as mapDispatchToProps from "../actions";
import { Tile } from "../components/Tile";

interface IOwnProps {
  tile: TTile;
  isFirst: boolean;
}

const mapStateToProps = (state: TState, ownProps: IOwnProps) => ({ ownProps });

export default connect(mapStateToProps, mapDispatchToProps)(Tile);
