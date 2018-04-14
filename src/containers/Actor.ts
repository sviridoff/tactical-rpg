import { connect } from "react-redux";

import * as mapDispatchToProps from "../actions";
import { Actor } from "../components/actor";

interface IOwnProps {
  actor: TActor;
  isSelectedArea: boolean;
}

const mapStateToProps = (state: void, ownProps: IOwnProps) => ({ ownProps });

export default connect(mapStateToProps, mapDispatchToProps)(Actor);
