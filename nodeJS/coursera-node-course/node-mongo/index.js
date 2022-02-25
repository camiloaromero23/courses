import { MongoClient } from 'mongodb';
import { findDocuments, insertDocument, removeDocument, updateDocument } from './operations.js'

const url = 'mongodb://root:root@localhost:27017/';
const dbName = 'conFusion';
let client;

try {
  client = await MongoClient.connect( url );
  const db = client.db( dbName );

  await insertDocument(
    db,
    [{ "name": "Second Dish", "description": "Second dish description" }],
    "dishes"
  );

  await findDocuments( db, 'dishes' );

  await updateDocument(
    db,
    { name: "Second Dish" },
    { "description": "updated desc" },
    'dishes'
  );

  await findDocuments( db, 'dishes' );

  const res = await db.dropCollection( 'dishes' );
  if ( res ) {
    console.log( "Dropped collection" );
  } else {
    console.log( "Could not drop collection" );
  }
} catch ( err ) {
  console.log( "Error 😢", err.message );
} finally {
  await client && client.close();
}
