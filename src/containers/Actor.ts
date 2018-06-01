import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Actor from "../components/actor/index";
import { playerTurnHandler } from "../effects/playerTurn";

interface IOwnProps {
  actor: TActor;
}

const mapStateToProps = (state: TState, ownProps: IOwnProps) => ownProps;
const options = {
  areOwnPropsEqual(next: IOwnProps, prev: IOwnProps) {
    return (
      prev.actor.currentPosition.x === next.actor.currentPosition.x &&
      prev.actor.currentPosition.y === next.actor.currentPosition.y &&
      prev.actor.isDisable === next.actor.isDisable &&
      prev.actor.isGoingToBeAttacked === next.actor.isGoingToBeAttacked
    );
  },
  areStatesEqual(next: TState, prev: TState) {
    return true;
  },
};
const mapDispatchToProps = (dispatch: TDispatch) =>
  bindActionCreators(
    {
      playerTurnHandler,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps, null, options)(
  Actor,
);
