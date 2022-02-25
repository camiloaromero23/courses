const express = require( "express" );
const bodyParser = require( "body-parser" );

const leaderRouter = express.Router()

leaderRouter.use( bodyParser.json() );

leaderRouter.all( '/', ( req, res, next ) => {
  res.setHeader( 'Content-Type', 'text/plain' );
  res.status( 200 );
  next();
} );

leaderRouter.all( '/', ( req, res, next ) => {
  res.setHeader( 'Content-Type', 'text/plain' );
  res.status( 200 );
  next();
} );

leaderRouter.get( '/', ( req, res ) => {
  res.send( 'Will send all leaders' );
} );

leaderRouter.post( '/', ( req, res ) => {
  res.send(
    `Will add the leader: ${req.body.name} with details ${req.body.description}`
  );
} );

leaderRouter.put( '/', ( req, res ) => {
  res.status( 403 ).send(
    `PUT operation not supported on /leaders`
  );
} );

leaderRouter.delete( '/', ( req, res ) => {
  res.send( 'Deleting all the leaders' )
} );

leaderRouter.get( '/:leaderId', ( req, res ) => {
  res.send( `Will send details of the leader: ${req.params.leaderId}` );
} );

leaderRouter.post( '/:leaderId', ( req, res ) => {
  res.status( 403 ).send(
    `POST operation not supported on /leaders/${req.params.leaderId}`
  );
} );

leaderRouter.put( '/:leaderId', ( req, res ) => {
  res.write( `Updating the leader ${req.params.leaderId}\n` )
  res.end(
    `Will update the leader: ${req.body.name} with details: ${req.body.description}`
  )
} );

leaderRouter.delete( '/:leaderId', ( req, res ) => {
  res.send( `Deleting leader: ${req.params.leaderId}` );
} );

module.exports = leaderRouter;
