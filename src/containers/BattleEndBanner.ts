import { connect } from "react-redux";

import BattleEndBanner from "../components/battle-end-banner/index";

const mapStateToProps = (state: TState) => state;

export default connect(mapStateToProps)(BattleEndBanner);
