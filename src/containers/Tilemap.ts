import { connect } from "react-redux";

import { Tilemap } from "../components/Tilemap";

const mapStateToProps = (state: TState) => ({ tilemap: state.tilemap });

export default connect(mapStateToProps)(Tilemap);
