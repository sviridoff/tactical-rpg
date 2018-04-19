import { times } from "lodash";
import { v4 as uuidv4 } from "uuid";

export default class Actors {
  private actors: TActors;

  constructor(teams: any) {
    const actors: TActors = {};

    teams.forEach((team: any) => {
      const { positions, teamName } = team;

      positions.forEach((position: any) => {
        const id = uuidv4();
        const [x, y] = position;

        actors[id] = {
          currentPosition: { x, y },
          damage: 5,
          healthPoints: 10,
          id,
          isAttackTarget: false,
          isDead: false,
          isDisable: false,
          originalPosition: { x, y },
          teamName,
          totalHealthPoints: 10,
        };
      });
    });

    this.actors = actors;
  }

  public get(): TActors {
    return this.actors;
  }
}
