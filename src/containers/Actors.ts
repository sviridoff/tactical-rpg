import { connect } from "react-redux";

import Actors from "../components/Actors";

const mapStateToProps = (state: TState) => state;

export default connect(mapStateToProps)(Actors);
