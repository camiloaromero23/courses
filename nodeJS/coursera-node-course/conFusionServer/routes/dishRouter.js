import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import { Dishes } from '../models/dishes.js';

const dishRouter = express.Router();

dishRouter.use( bodyParser.json() );

dishRouter.get( '/', async ( req, res, next ) => {
  try {
    const dishes = await Dishes.find( {} );
    res.status( 200 ).json( dishes );
  } catch ( err ) { next( err ) }
} );

dishRouter.post( '/', async ( req, res, next ) => {
  try {
    const dish = await Dishes.create( req.body )
    res.status( 201 ).json( dish );
  } catch ( err ) { next( err ) }
} );

dishRouter.put( '/', ( req, res, next ) => {
  res.status( 403 ).send(
    `PUT operation not supported on /dishes`
  );
} );

dishRouter.delete( '/', async ( req, res, next ) => {
  try {
    const response = await Dishes.remove( {} )
    res.status( 200 ).json( response );
  } catch ( err ) { next( err ) }
} );

dishRouter.get( '/:dishId', async ( req, res, next ) => {
  try {
    const dish = await Dishes.findById( req.params.dishId );
    res.status( 200 ).json( dish )
  } catch ( err ) { next( err ) }
} );

dishRouter.post( '/:dishId', ( req, res ) => {
  res.status( 403 ).send(
    `POST operation not supported on /dishes/${req.params.dishId}`
  );
} );

dishRouter.put( '/:dishId', async ( req, res, next ) => {
  try {
    const dish = await Dishes.findByIdAndUpdate( req.params.dishId, {
      $set: req.body
    }, { new: true } );

    res.status( 200 ).json( dish )
  } catch ( err ) { next( err ) }
} );

dishRouter.delete( '/:dishId', async ( req, res, next ) => {
  try {
    const response = await Dishes.findByIdAndRemove( req.params.dishId );
    res.status( 200 ).json( response );
  } catch ( err ) { next( err ) }
} );

export default dishRouter;
