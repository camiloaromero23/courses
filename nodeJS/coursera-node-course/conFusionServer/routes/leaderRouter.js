import express from "express";
import bodyParser from "body-parser";

import { Leaders } from '../models/leaders.js';

const leaderRouter = express.Router();

leaderRouter.use( bodyParser.json() );

leaderRouter.get( '/', ( req, res ) => {
  try {
    const leaders = await Leaders.find( {} );
    res.status( 200 ).json( leaders );
  } catch ( err ) { next( err ); }
} );

leaderRouter.post( '/', ( req, res ) => {
  try {
    const leader = await Leaders.create( req.body );
    res.status( 200 ).json( leader );
  } catch ( err ) { next( err ); }
} );

leaderRouter.put( '/', ( req, res ) => {
  res.status( 403 ).send(
    `PUT operation not supported on /leaders`
  );
} );

leaderRouter.delete( '/', ( req, res ) => {
  try {
    const leaders = await Leaders.remove( {} );
    res.status( 200 ).json( leaders );
  } catch ( err ) { next( err ); }
} );

leaderRouter.get( '/:leaderId', ( req, res ) => {
  try {
    const leader = await Leaders.findById( req.params.leaderId );
    res.status( 200 ).json( leader );
  } catch ( err ) { next( err ); }
} );

leaderRouter.post( '/:leaderId', ( req, res ) => {
  res.status( 403 ).send(
    `POST operation not supported on /leaders/${req.params.leaderId}`
  );
} );

leaderRouter.put( '/:leaderId', ( req, res ) => {
  try {
    const leader = await Leaders.findByIdAndUpdate( req.params.leaderId, { $set: req.body }, { new: true } );
    res.status( 200 ).json( leader );
  } catch ( err ) { next( err ); }
} );

leaderRouter.delete( '/:leaderId', ( req, res ) => {
  try {
    const response = await Leaders.findByIdAndRemove( req.params.leaderId );
    res.status( 200 ).json( response );
  } catch ( err ) { next( err ); }
} );

export default leaderRouter;
