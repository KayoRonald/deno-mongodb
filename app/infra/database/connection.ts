import { MongoClient } from '../../deps.ts';
import env from '../../config/env.ts';
import logger  from "../../config/logger.ts";

const client: MongoClient = new MongoClient();

try{
  await client.connect(env.dbUri);
  logger.info('? Connected to MongoDB Successfully');
}catch(erro: any){
  console.log(erro)
}

export const db = client.database(env.dbName)