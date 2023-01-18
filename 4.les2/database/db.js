import { MongoClient } from "mongodb";

//We hebben mongoDB installed, en ook de npm mongodb.

const url = "mongodb://0.0.0.0:27017";

const client = new MongoClient(url);

//De database kan je noemen op de volgende manier als je met meerdere db werkt
// const dbName = 'myProject';

const connect = async () => {
  try {
    await client.connect();
    console.log("connected to the database");
  } catch (error) {
    console.error(error);
    await client.close();
  }
};

export { client, connect };
