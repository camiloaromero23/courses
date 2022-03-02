import bodyParser from "body-parser";
import express from "express";
import { includeUserHeader, verifyAdmin, verifyUser } from "../authenticate.js";
import { Leaders } from '../models/leaders.js';
import { cors, corsWithOptions } from './cors.js';

const leaderRouter = express.Router();

leaderRouter.options( corsWithOptions, ( req, res ) => {
  res.sendStatus( 200 );
} );

leaderRouter.use( bodyParser.json() );

leaderRouter.get( '/', cors, async ( req, res, next ) => {
  try {
    const leaders = await Leaders.find( {} );
    res.status( 200 ).json( leaders );
  } catch ( err ) { next( err ); }
} );

leaderRouter.post( '/', corsWithOptions, verifyUser, includeUserHeader, verifyAdmin, async ( req, res, next ) => {
  try {
    const leader = await Leaders.create( req.body );
    res.status( 200 ).json( leader );
  } catch ( err ) { next( err ); }
} );

leaderRouter.put( '/', corsWithOptions, verifyUser, includeUserHeader, verifyAdmin, async ( req, res, next ) => {
  res.status( 403 ).send(
    `PUT operation not supported on /leaders`
  );
} );

leaderRouter.delete( '/', corsWithOptions, verifyUser, includeUserHeader, verifyAdmin, async ( req, res, next ) => {
  try {
    const leaders = await Leaders.remove( {} );
    res.status( 200 ).json( leaders );
  } catch ( err ) { next( err ); }
} );

leaderRouter.get( '/:leaderId', cors, async ( req, res, next ) => {
  try {
    const leader = await Leaders.findById( req.params.leaderId );
    res.status( 200 ).json( leader );
  } catch ( err ) { next( err ); }
} );

leaderRouter.post( '/:leaderId', corsWithOptions, verifyUser, includeUserHeader, verifyAdmin, async ( req, res, next ) => {
  res.status( 403 ).send(
    `POST operation not supported on /leaders/${req.params.leaderId}`
  );
} );

leaderRouter.put( '/:leaderId', corsWithOptions, verifyUser, includeUserHeader, verifyAdmin, async ( req, res, next ) => {
  try {
    const leader = await Leaders.findByIdAndUpdate( req.params.leaderId, { $set: req.body }, { new: true } );
    res.status( 200 ).json( leader );
  } catch ( err ) { next( err ); }
} );

leaderRouter.delete( '/:leaderId', corsWithOptions, verifyUser, includeUserHeader, verifyAdmin, async ( req, res, next ) => {
  try {
    const response = await Leaders.findByIdAndRemove( req.params.leaderId );
    res.status( 200 ).json( response );
  } catch ( err ) { next( err ); }
} );

export default leaderRouter;
