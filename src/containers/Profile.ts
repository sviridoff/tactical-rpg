import { connect } from "react-redux";

import { Profile } from "../components/Profile";

const mapStateToProps = (state: TState) => state;

export default connect(mapStateToProps)(Profile);
