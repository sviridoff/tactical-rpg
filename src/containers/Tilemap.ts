import { connect } from "react-redux";

import { Tilemap } from "../components/Tilemap";

const mapStateToProps = (state: TState) => state;

export default connect(mapStateToProps)(Tilemap);
