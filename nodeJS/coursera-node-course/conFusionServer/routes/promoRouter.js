import bodyParser from "body-parser";
import express from "express";
import { includeUserHeader, verifyAdmin, verifyUser } from "../authenticate.js";
import { Promotions } from '../models/promotions.js';
import { cors, corsWithOptions } from "./cors.js";

const promoRouter = express.Router();

promoRouter.options( corsWithOptions, ( req, res ) => {
  res.sendStatus( 200 );
} );

promoRouter.use( bodyParser.json() );

promoRouter.get( '/', cors, async ( req, res, next ) => {
  try {
    const promotions = await Promotions.find( {} );
    res.status( 200 ).json( promotions );
  } catch ( err ) { next( err ); }
} );

promoRouter.post( '/', corsWithOptions, verifyUser, includeUserHeader, verifyAdmin, async ( req, res, next ) => {
  try {
    const promotions = await Promotions.create( req.body );
    res.status( 201 ).json( promotions );
  } catch ( err ) { next( err ); }
} );

promoRouter.put( '/', corsWithOptions, verifyUser, includeUserHeader, verifyAdmin, async ( req, res, next ) => {
  res.status( 403 ).send(
    `PUT operation not supported on /promotions`
  );
} );

promoRouter.delete( '/', corsWithOptions, verifyUser, includeUserHeader, verifyAdmin, async ( req, res, next ) => {
  try {
    const response = await Promotions.remove( {} );
    res.status( 200 ).json( response );
  } catch ( err ) { next( err ); }
} );

promoRouter.get( '/:promoId', cors, async ( req, res, next ) => {
  try {
    const promotion = await Promotions.findById( req.params.promoId );
    res.status( 200 ).json( promotion );
  } catch ( err ) { next( err ); }
} );

promoRouter.post( '/:promoId', corsWithOptions, verifyUser, includeUserHeader, verifyAdmin, async ( req, res, next ) => {
  res.status( 403 ).send(
    `POST operation not supported on /promotions/${req.params.promoId}`
  );
} );

promoRouter.put( '/:promoId', corsWithOptions, verifyUser, includeUserHeader, verifyAdmin, async ( req, res, next ) => {
  try {
    const promotion = await Promotions.findByIdAndUpdate( req.params.promoId, {
      $set: req.body
    }, { new: true } );

    res.status( 200 ).json( promotion );
  } catch ( err ) { next( err ); }
} );

promoRouter.delete( '/:promoId', corsWithOptions, verifyUser, includeUserHeader, verifyAdmin, async ( req, res, next ) => {
  try {
    const response = await Promotions.findByIdAndRemove( req.params.promoId );
    res.status( 200 ).json( response );
  } catch ( err ) { next( err ); }
} );

export default promoRouter;
