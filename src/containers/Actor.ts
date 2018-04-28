import { connect } from "react-redux";

import { Actor } from "../components/actor/index";
import * as mapDispatchToProps from "../effects/actor";

interface IOwnProps {
  actor: TActor;
}

const mapStateToProps = (state: TState, ownProps: IOwnProps) => ({ ownProps });

export default connect(mapStateToProps, mapDispatchToProps)(Actor);
