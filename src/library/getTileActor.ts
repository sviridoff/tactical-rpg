export default function getTileActor(tile: TTile, actors: TActors) {
  return Object.values(actors).find((actor) => {
    const {
      currentPosition: { x, y },
    } = actor;

    return tile.x === x && tile.y === y;
  });
}
