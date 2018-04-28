import { connect } from "react-redux";

import { Profile } from "../components/profile/index";

const mapStateToProps = (state: TState) => state;

export default connect(mapStateToProps)(Profile);
