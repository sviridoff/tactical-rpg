import { connect } from "react-redux";

import { TurnBanner } from "../components/turn-banner/index";

const mapStateToProps = (state: TState) => state;

export default connect(mapStateToProps)(TurnBanner);
