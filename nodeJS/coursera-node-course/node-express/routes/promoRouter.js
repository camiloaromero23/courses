import express from "express";
import bodyParser from "body-parser";

const promoRouter = express.Router()

promoRouter.use( bodyParser.json() );

promoRouter.all( '/', ( req, res, next ) => {
  res.setHeader( 'Content-Type', 'text/plain' );
  res.status( 200 );
  next();
} );

promoRouter.all( '/', ( req, res, next ) => {
  res.setHeader( 'Content-Type', 'text/plain' );
  res.status( 200 );
  next();
} );

promoRouter.get( '/', ( req, res ) => {
  res.send( 'Will send all promotions' );
} );

promoRouter.post( '/', ( req, res ) => {
  res.send(
    `Will add the promotion: ${req.body.name} with details ${req.body.description}`
  );
} );

promoRouter.put( '/', ( req, res ) => {
  res.status( 403 ).send(
    `PUT operation not supported on /promotions`
  );
} );

promoRouter.delete( '/', ( req, res ) => {
  res.send( 'Deleting all the promotions' )
} );

promoRouter.get( '/:promoId', ( req, res ) => {
  res.send( `Will send details of the promotion: ${req.params.promoId}` );
} );

promoRouter.post( '/:promoId', ( req, res ) => {
  res.status( 403 ).send(
    `POST operation not supported on /promotions/${req.params.promoId}`
  );
} );

promoRouter.put( '/:promoId', ( req, res ) => {
  res.write( `Updating the promotion ${req.params.promoId}\n` )
  res.end(
    `Will update the promotion: ${req.body.name} with details: ${req.body.description}`
  )
} );

promoRouter.delete( '/:promoId', ( req, res ) => {
  res.send( `Deleting promotion: ${req.params.promoId}` );
} );

export default promoRouter;
