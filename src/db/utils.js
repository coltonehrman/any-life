import { MongoClient } from "mongodb";
import { removeCircularReferences } from "../utils";

export async function saveAccount(account) {
  const client = new MongoClient("mongodb://localhost:27017");

  try {
    await client.connect();
    const database = client.db("any-life");
    const accounts = database.collection("accounts");

    const accountData = removeCircularReferences(account);

    const result = await accounts.insertOne(accountData);

    console.log(
      `New account inserted with the following id: ${result.insertedId}`
    );
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

export async function savePlayer(player) {
  const client = new MongoClient("mongodb://localhost:27017");

  try {
    await client.connect();
    const database = client.db("any-life");
    const players = database.collection("players");

    const playerData = removeCircularReferences(player);
    playerData._id = playerData.id;

    const result = await players.insertOne(playerData);

    console.log(
      `New player inserted with the following id: ${result.insertedId}`
    );
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}
