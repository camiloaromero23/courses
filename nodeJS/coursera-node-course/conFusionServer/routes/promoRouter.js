import express from "express";
import bodyParser from "body-parser";
import { Promotions } from '../models/promotions.js';

const promoRouter = express.Router();

promoRouter.use( bodyParser.json() );

promoRouter.get( '/', ( req, res ) => {
  try {
    const promotions = await Promotions.find( {} );
    res.status( 200 ).json( promotions );
  } catch ( err ) { next( err ); }
} );

promoRouter.post( '/', ( req, res ) => {
  try {
    const promotions = await Promotions.create( req.body );
    res.status( 201 ).json( promotions );
  } catch ( err ) { next( err ); }
} );

promoRouter.put( '/', ( req, res ) => {
  res.status( 403 ).send(
    `PUT operation not supported on /promotions`
  );
} );

promoRouter.delete( '/', ( req, res ) => {
  try {
    const response = await Promotions.remove( {} );
    res.status( 200 ).json( response );
  } catch ( err ) { next( err ); }
} );

promoRouter.get( '/:promoId', ( req, res ) => {
  try {
    const promotion = await Promotions.findById( req.params.promoId );
    res.status( 200 ).json( promotion );
  } catch ( err ) { next( err ); }
} );

promoRouter.post( '/:promoId', ( req, res ) => {
  res.status( 403 ).send(
    `POST operation not supported on /promotions/${req.params.promoId}`
  );
} );

promoRouter.put( '/:promoId', ( req, res ) => {
  try {
    const promotion = await Promotions.findByIdAndUpdate( req.params.promoId, {
      $set: req.body
    }, { new: true } );

    res.status( 200 ).json( promotion );
  } catch ( err ) { next( err ); }
} );

promoRouter.delete( '/:promoId', ( req, res ) => {
  try {
    const response = await Promotions.findByIdAndRemove( req.params.promoId );
    res.status( 200 ).json( response );
  } catch ( err ) { next( err ); }
} );

export default promoRouter;
