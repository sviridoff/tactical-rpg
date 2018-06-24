import { connect } from "react-redux";

import * as mapDispatchToProps from "../actions";
import Home from "../components/home";

const mapStateToProps = (state: TState) => state;

export default connect(mapStateToProps, mapDispatchToProps)(Home);

