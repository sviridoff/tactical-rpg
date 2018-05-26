import { connect } from "react-redux";

import BattleEndBanner from "../components/battle-end-banner/index";

const mapStateToProps = (state: TState) => ({
  player: state.player,
});

const options = {
  areStatesEqual(next: TState, prev: TState) {
    return prev.player.showBattleEndBanner === next.player.showBattleEndBanner;
  },
};

export default connect(mapStateToProps, null, null, options)(BattleEndBanner);
