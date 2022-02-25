const express = require( 'express' );
const bodyParser = require( 'body-parser' );

const dishRouter = express.Router();

dishRouter.use( bodyParser.json() );

// dishRouter.route( '/' );

dishRouter.all( '/', ( req, res, next ) => {
  res.setHeader( 'Content-Type', 'text/plain' );
  res.status( 200 );
  next();
} );

dishRouter.get( '/', ( req, res ) => {
  res.send( 'Will send all dishes' );
} );

dishRouter.post( '/', ( req, res ) => {
  res.send(
    `Will add the dish: ${req.body.name} with details ${req.body.description}`
  );
} );

dishRouter.put( '/', ( req, res ) => {
  res.status( 403 ).send(
    `PUT operation not supported on /dishes`
  );
} );

dishRouter.delete( '/', ( req, res ) => {
  res.send( 'Deleting all the dishes' )
} );

dishRouter.get( '/:dishId', ( req, res ) => {
  res.send( `Will send details of the dish: ${req.params.dishId}` );
} );

dishRouter.post( '/:dishId', ( req, res ) => {
  res.status( 403 ).send(
    `POST operation not supported on /dishes/${req.params.dishId}`
  );
} );

dishRouter.put( '/:dishId', ( req, res ) => {
  res.write( `Updating the dish ${req.params.dishId}\n` )
  res.end(
    `Will update the dish: ${req.body.name} with details: ${req.body.description}`
  )
} );

dishRouter.delete( '/:dishId', ( req, res ) => {
  res.send( `Deleting dish: ${req.params.dishId}` );
} );

module.exports = dishRouter;
