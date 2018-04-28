import { connect } from "react-redux";

import { Tile } from "../components/tile/index";
import * as mapDispatchToProps from "../effects/tile";

interface IOwnProps {
  tile: TTile;
  isFirst: boolean;
}

const mapStateToProps = (state: TState, ownProps: IOwnProps) => ({ ownProps });

export default connect(mapStateToProps, mapDispatchToProps)(Tile);
