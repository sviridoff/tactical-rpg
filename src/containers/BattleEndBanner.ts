import { connect } from "react-redux";

import BattleEndBanner from "../components/battle-end-banner/index";

const mapStateToProps = (state: TState) => ({
  player: state.player,
});

export default connect(mapStateToProps)(BattleEndBanner);
