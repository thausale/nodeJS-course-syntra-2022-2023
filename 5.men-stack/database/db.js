import { MongoClient } from "mongodb";

//We doen npm i mongodb en hieronder zetten we de connectie info uit mongodb compass

const url = "mongodb://0.0.0.0:27017";

const client = new MongoClient(url);

const connect = async () => {
  try {
    await client.connect();
    console.log("connected to the database server");
  } catch (error) {
    console.error(error);
    await client.close();
  }
};

export { client, connect };
