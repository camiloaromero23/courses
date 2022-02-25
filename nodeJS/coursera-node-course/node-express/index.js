import express from 'express';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bodyParser from 'body-parser';

const __filename = fileURLToPath( import.meta.url );
const __dirname = dirname( __filename );

const hostname = 'localhost';
const port = 3000;

const app = express();

app.use( morgan( 'dev' ) );
app.use( bodyParser.json() );


app.all( '/dishes', ( req, res, next ) => {
  res.setHeader( 'Content-Type', 'text/plain' );
  res.status( 200 );
  next();
} );

app.get( '/dishes', ( req, res ) => {
  res.send( 'Will send all dishes' );
} );

app.post( '/dishes', ( req, res ) => {
  res.send(
    `Will add the dish: ${req.body.name} with details ${req.body.description}`
  );
} );

app.put( '/dishes', ( req, res ) => {
  res.status( 403 ).send(
    `PUT operation not supported on /dishes`
  );
} );

app.delete( '/dishes', ( req, res ) => {
  res.send( 'Deleting all the dishes' )
} );

app.get( '/dishes/:dishId', ( req, res ) => {
  res.send( `Will send details of the dish: ${req.params.dishId}` );
} );

app.post( '/dishes/:dishId', ( req, res ) => {
  res.status( 403 ).send(
    `POST operation not supported on /dishes/${req.params.dishId}`
  );
} );

app.put( '/dishes/:dishId', ( req, res ) => {
  res.write( `Updating the dish ${req.params.dishId}\n` )
  res.end(
    `Will update the dish: ${req.body.name} with details: ${req.body.description}`
  )
} );

app.delete( '/dishes/:dishId', ( req, res ) => {
  res.send( `Deleting dish: ${req.params.dishId}` );
} );

app.use( express.static( `${__dirname}/public` ) );

app.use( ( req, res, next ) => {
  console.log( req.headers );

  res.setHeader( 'Content-Type', 'text/html' );
  res.status( 200 ).send( '<html><body><h1>This is an Express server</h1></body></html>' );
} );

app.listen( port, hostname, () => {
  console.log( `App listening on http://${hostname}:${port}` );
} );
