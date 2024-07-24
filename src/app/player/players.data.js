import { Player } from "./player.model";

export const players = {};

/**
 * Return player in-memory Object
 * @param {string} id - Player object ID
 * @return {Player | undefined}
 */
export const getPlayerById = (id) => players[id];
