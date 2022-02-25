export const insertDocument = async ( db, document, collectionName ) => {

  const collection = db.collection( collectionName );
  const res = await collection.insertMany( document );

  if ( !res.acknowledged ) {
    console.log( "Error inserting" );
    return;
  }
  console.log( `Inserted ${res.insertedCount} documents into the collection` );
};

export const findDocuments = async ( db, collectionName ) => {
  const collection = db.collection( collectionName );
  const docs = await collection.find( {} ).toArray()
  console.log( "Found" );
  console.log( docs );
};

export const removeDocument = async ( db, document, collectionName ) => {

  const collection = db.collection( collectionName );
  const delRes = await collection.deleteOne( document )
  if ( delRes.acknowledged ) {
    console.log( "Deleted document", document );
  }
};

export const updateDocument = async ( db, document, update, collectionName ) => {

  const collection = db.collection( collectionName );
  const updRes = await collection.updateOne( document, { $set: update } );
  if ( updRes.acknowledged ) {
    console.log( "Updated document", document );
  }
};
