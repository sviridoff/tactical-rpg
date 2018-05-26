import { connect } from "react-redux";

import TurnBanner from "../components/turn-banner/index";

const mapStateToProps = (state: TState) => ({
  player: state.player,
});

const options = {
  areStatesEqual(next: TState, prev: TState) {
    return prev.player.showTurnBanner === next.player.showTurnBanner;
  },
};

export default connect(mapStateToProps, null, null, options)(TurnBanner);
