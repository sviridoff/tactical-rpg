import { connect } from "react-redux";

import * as mapDispatchToProps from "../actions";
import { Tilemap } from "../components/Tilemap";

const mapStateToProps = (state: TState) => state;

export default connect(mapStateToProps, mapDispatchToProps)(Tilemap);
