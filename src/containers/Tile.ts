import { connect } from "react-redux";
import Tile from "../components/tile/index";
import * as mapDispatchToProps from "../effects/tile";

interface IOwnProps {
  tile: TTile;
  isFirst: boolean;
}

const mapStateToProps = (state: TState, ownProps: IOwnProps) => ownProps;
const options = {
  areOwnPropsEqual(next: IOwnProps, prev: IOwnProps) {
    return (
      prev.tile.isSelectedArea === next.tile.isSelectedArea &&
      prev.tile.isActorArea === next.tile.isActorArea &&
      prev.tile.isMoveArea === next.tile.isMoveArea &&
      prev.tile.isAttackArea === next.tile.isAttackArea
    );
  },

  areStatesEqual(next: TState, prev: TState) {
    return true;
  },
};

export default connect(mapStateToProps, mapDispatchToProps, null, options)(
  Tile,
);
