import { connect } from "react-redux";

import * as mapDispatchToProps from "../actions/index";
import GameRestartButton from "../components/game-restart-button/index";

export default connect(null, mapDispatchToProps)(GameRestartButton);
