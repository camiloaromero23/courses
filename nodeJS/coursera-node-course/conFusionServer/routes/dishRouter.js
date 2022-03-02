import express from 'express';
import bodyParser from 'body-parser';

import { verifyUser, verifyAdmin, includeUserHeader } from '../authenticate.js';
import { Dishes } from '../models/dishes.js';

const dishRouter = express.Router();

dishRouter.use( bodyParser.json() );

dishRouter.get( '/', async ( req, res, next ) => {
  try {
    const dishes = await Dishes.find( {} )
      .populate( 'comments.author' );
    res.status( 200 ).json( dishes );
  } catch ( err ) { next( err ); }
} );

dishRouter.post( '/', verifyUser, includeUserHeader, verifyAdmin, async ( req, res, next ) => {
  try {
    const dish = await Dishes.create( req.body );
    res.status( 201 ).json( dish );
  } catch ( err ) { next( err ); }
} );

dishRouter.put( '/', verifyUser, includeUserHeader, verifyAdmin, ( req, res, next ) => {
  res.status( 403 ).send(
    `PUT operation not supported on /dishes`
  );
} );

dishRouter.delete( '/', verifyUser, includeUserHeader, verifyAdmin, async ( req, res, next ) => {
  try {
    const response = await Dishes.remove( {} );
    res.status( 200 ).json( response );
  } catch ( err ) { next( err ); }
} );

dishRouter.get( '/:dishId', async ( req, res, next ) => {
  try {
    const dish = await Dishes.findById( req.params.dishId )
      .populate( 'comments.author' );
    res.status( 200 ).json( dish );
  } catch ( err ) { next( err ); }
} );

dishRouter.post( '/:dishId', verifyUser, includeUserHeader, verifyAdmin, ( req, res ) => {
  res.status( 403 ).send(
    `POST operation not supported on /dishes/${req.params.dishId}`
  );
} );

dishRouter.put( '/:dishId', verifyUser, includeUserHeader, verifyAdmin, async ( req, res, next ) => {
  try {
    const dish = await Dishes.findByIdAndUpdate( req.params.dishId, {
      $set: req.body
    }, { new: true } );

    res.status( 200 ).json( dish );
  } catch ( err ) { next( err ); }
} );

dishRouter.delete( '/:dishId', verifyUser, includeUserHeader, verifyAdmin, async ( req, res, next ) => {
  try {
    const response = await Dishes.findByIdAndRemove( req.params.dishId );
    res.status( 200 ).json( response );
  } catch ( err ) { next( err ); }
} );


dishRouter.get( '/:dishId/comments', async ( req, res, next ) => {
  try {
    const dish = await Dishes.findById( req.params.dishId )
      .populate( 'comments.author' );
    if ( !dish ) {
      const err = new Error( `Dish ${req.params.dishId} not found` );
      err.status = 404;
      return next( err );
    }
    res.status( 200 ).json( dish.comments );
  } catch ( err ) { next( err ); }
} );

dishRouter.post( '/:dishId/comments', verifyUser, includeUserHeader, async ( req, res, next ) => {
  try {
    const dish = await Dishes.findById( req.params.dishId );
    if ( !dish ) {
      const err = new Error( `Dish ${req.params.dishId} not found` );
      err.status = 404;
      return next( err );
    }
    req.body.author = req.user._id;
    dish.comments.push( req.body );
    const updatedDish = await dish.save();
    if ( !updatedDish ) {
      const err = new Error( `Error saving Dish ${req.params.dishId}` );
      err.status = 500;
      return next( err );
    }
    const populatedDish = await Dishes
      .findById( updatedDish._id )
      .populate( 'comments.author' );
    res.status( 200 ).json( populatedDish );
  } catch ( err ) { next( err ); }
} );

dishRouter.put( '/:dishId/comments', verifyUser, includeUserHeader, ( req, res, next ) => {
  res.status( 403 ).send(
    `PUT operation not supported on /dishes/${req.params.dishId}/comments`
  );
} );

dishRouter.delete( '/:dishId/comments', verifyUser, includeUserHeader, verifyAdmin, async ( req, res, next ) => {
  try {
    const dish = await Dishes.findById( req.params.dishId );
    if ( !dish ) {
      const err = new Error( `Dish ${req.params.dishId} not found` );
      err.status = 404;
      return next( err );
    }
    for ( let i = dish.comments.length - 1; i >= 0; i-- ) {
      dish.comments.id( dish.comments[i]._id ).remove();
    }
    const newDish = await dish.save();
    if ( !newDish ) {
      const err = new Error( `Error saving Dish ${req.params.dishId}` );
      err.status = 500;
      return next( err );
    }
    res.status( 200 ).json( newDish );
  } catch ( err ) { next( err ); }
} );

dishRouter.get( '/:dishId/comments/:commentId', async ( req, res, next ) => {
  try {
    const dish = await Dishes.findById( req.params.dishId )
      .populate( 'comments.author' );
    if ( !dish && !dish.comments.id( req.params.commentId ) ) {
      const err = new Error( `Dish ${req.params.dishId} or comment ${req.params.commentId} not found` );
      err.status = 404;
      return next( err );
    };
    res.status( 200 ).json( dish.comments.id( req.params.commentId ) );
  } catch ( err ) { next( err ); }
} );

dishRouter.post( '/:dishId/comments/:commentId', verifyUser, includeUserHeader, ( req, res ) => {
  res.status( 403 ).send(
    `POST operation not supported on /dishes/${req.params.dishId}/comments/${req.params.commentId}`
  );
} );

dishRouter.put( '/:dishId/comments/:commentId', verifyUser, includeUserHeader, async ( req, res, next ) => {
  try {
    const dish = await Dishes.findById( req.params.dishId );
    const commentAuthorId = dish.comments.id( req.params.commentId ).author;
    if ( !commentAuthorId.equals( req.user._id ) ) {
      const err = new Error( `You are not authorized to delete this comment!` );
      err.status = 403;
      return next( err );
    }
    if ( !dish && !dish.comments.id( req.params.commentId ) ) {
      const err = new Error( `Dish ${req.params.dishId} or comment ${req.params.commentId} not found` );
      err.status = 404;
      return next( err );
    };
    const { rating: updatedRating, comment: updatedComment } = req.body;
    if ( updatedRating ) {
      dish.comments.id( req.params.commentId ).rating = updatedRating;
    }
    if ( updatedComment ) {
      dish.comments.id( req.params.commentId ).comment = updatedComment;
    }
    const updatedDish = await dish.save();
    if ( !updatedDish ) {
      const err = new Error( `Error updating Dish ${req.params.dishId} with comment ${req.params.commentId}` );
      err.status = 500;
      return next( err );
    }
    const populatedDish = await Dishes
      .findById( updatedDish._id )
      .populate( 'comments.author' );
    res.status( 200 ).json( populatedDish );
  } catch ( err ) { next( err ); }
} );

dishRouter.delete( '/:dishId/comments/:commentId', verifyUser, includeUserHeader, async ( req, res, next ) => {
  try {
    const dish = await Dishes.findById( req.params.dishId );
    if ( !dish && !req.params.commentId ) {
      const err = new Error( `Dish ${req.params.dishId} or comment ${req.params.commentId} not found` );
      err.status = 404;
      return next( err );
    }
    const commentAuthorId = dish.comments.id( req.params.commentId ).author;
    if ( !commentAuthorId.equals( req.user._id ) ) {
      const err = new Error( `You are not authorized to delete this comment!` );
      err.status = 403;
      return next( err );
    }
    dish.comments.id( req.params.commentId ).remove();
    const newDish = await dish.save();
    if ( !newDish ) {
      const err = new Error( `Error saving Dish ${req.params.dishId}` );
      err.status = 500;
      return next( err );
    }
    const populatedDish = await Dishes
      .findById( newDish._id )
      .populate( 'comments.author' );
    res.status( 200 ).json( populatedDish );
  } catch ( err ) { next( err ); }
} );

export default dishRouter;
