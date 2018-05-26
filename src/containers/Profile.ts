import { connect } from "react-redux";

import Profile from "../components/profile/index";
import getActorTile from "../library/getActorTile";

const mapStateToProps = (state: TState) => {
  const { selectedActorId, activeActorId } = state.player;
  const selectedActor = state.actors[selectedActorId];
  const activeActor = state.actors[activeActorId];
  const tile = selectedActor && getActorTile(selectedActor, state.tilemap);
  const isNotSameActor = selectedActorId !== activeActorId;
  const showActiveActor =
    tile && tile.isAttackArea && isNotSameActor && selectedActor.isEnemy;

  return {
    activeActor,
    selectedActor,
    showActiveActor,
  };
};

const options = {
  areStatesEqual(next: TState, prev: TState) {
    return prev.player.selectedActorId === next.player.selectedActorId;
  },
};

export default connect(mapStateToProps, null, null, options)(Profile);
