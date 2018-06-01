import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Actor from "../components/actor/index";
import { playerTurnHandler } from "../effects/playerTurn";

interface IOwnProps {
  actor: TActor;
}

const mapStateToProps = (state: TState, ownProps: IOwnProps) => ownProps;
const mapDispatchToProps = (dispatch: TDispatch) =>
  bindActionCreators(
    {
      playerTurnHandler,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Actor);
