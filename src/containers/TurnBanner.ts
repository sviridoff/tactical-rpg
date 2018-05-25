import { connect } from "react-redux";

import TurnBanner from "../components/turn-banner/index";

const mapStateToProps = (state: TState) => ({
  player: state.player,
});

export default connect(mapStateToProps)(TurnBanner);
