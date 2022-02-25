import { MongoClient } from 'mongodb';
import assert from 'assert';
import { exit } from 'process';

const url = 'mongodb://root:root@localhost:27017/';
const dbName = 'conFusion';

try {
  const client = await MongoClient.connect( url );
  const db = client.db( dbName );

  const collection = db.collection( "dishes" )

  const val = await collection.insertOne( { "name": "Second Dish", "description": "Second dish description" } )

  if ( !val.acknowledged ) {
    console.log( "Error inserting" );
    exit( 1 );
  }
  const find = await collection.find( {} ).toArray()
  console.log( "Found" );
  console.log( find );
  const res = await db.dropCollection( 'dishes' );
  if ( !res ) {
    console.log( "Invalid result" );
  }
  await client.close();

} catch ( err ) {
  console.log( "Error connecting 😢", err.message );
}
