import express from 'express';
import bodyParser from 'body-parser';

import { cors, corsWithOptions } from './cors.js';
import { Favorites } from '../models/favorites.js';
import { includeUserHeader, verifyUser } from '../authenticate.js';
import mongoose from 'mongoose';

const favoritesRouter = express.Router();

favoritesRouter.use( bodyParser.json() );

favoritesRouter.options( corsWithOptions, ( req, res ) => {
  res.sendStatus( 200 );
} );

favoritesRouter.get(
  '/',
  corsWithOptions,
  verifyUser,
  includeUserHeader,
  async ( req, res, next ) => {
    try {
      const favorites = await Favorites.findOne( { user: req.user._id } )
        .populate( 'user' )
        .populate( 'dishes' );
      res.status( 200 ).json( favorites );
    } catch ( err ) { next( err ); };
  }
);

favoritesRouter.post(
  '/',
  corsWithOptions,
  verifyUser,
  includeUserHeader,
  async ( req, res, next ) => {
    try {
      const favorites = await Favorites.findOne( { user: req.user._id } );
      const dishes = req.body;
      if ( favorites ) {
        let repeatedDishes = false;
        dishes.forEach( ( newDish ) => {
          if ( repeatedDishes ) {
            return;
          }
          repeatedDishes = favorites.dishes.some( ( dish ) => {
            return ( dish.toString() === newDish._id );
          } );
        } );
        if ( repeatedDishes ) {
          const err = new Error( 'Dish(es) already in favorites' );
          err.status = 400;
          return next( err );
        }
        const dishesIds = dishes.map( dish => mongoose.Types.ObjectId( dish._id ) );
        favorites.dishes.push( dishesIds );
        const savedFavorites = await favorites.save();
        return res.status( 200 ).json( savedFavorites );
      }
      const newFavorites = await Favorites.create( {
        user: req.user._id,
        dishes,
      } );
      return res.status( 200 ).json( newFavorites );
    } catch ( err ) { next( err ); };
  }
);

favoritesRouter.delete(
  '/',
  corsWithOptions,
  verifyUser,
  includeUserHeader,
  async ( req, res, next ) => {
    try {
      const favorites = await Favorites.findOneAndDelete( { user: req.user._id } );
      if ( !favorites ) {
        const err = new Error( 'No favorites found' );
        err.status = 404;
        return next( err );
      }
      return res.status( 200 ).json( favorites );
    } catch ( err ) { next( err ); };
  }
);

favoritesRouter.post(
  '/:dishId',
  corsWithOptions,
  verifyUser,
  includeUserHeader,
  async ( req, res, next ) => {
    try {
      const favorites = await Favorites.findOne( { user: req.user._id } );
      if ( !favorites ) {
        const newFavorite = await Favorites.create( {
          user: req.user._id,
          dishes: [{ _id: req.params.dishId }],
        } );
        return res.status( 200 ).json( newFavorite );
      }
      const dishExists = favorites.dishes.includes( req.params.dishId );
      if ( dishExists ) {
        const err = new Error( 'Dish already exists in favorites' );
        err.status = 400;
        return next( err );
      }
      favorites.dishes.push( req.params.dishId );
      const savedFavorites = await favorites.save();
      return res.status( 200 ).json( savedFavorites );
    } catch ( err ) { next( err ); };
  }
);

favoritesRouter.delete( '/:dishId',
  corsWithOptions,
  verifyUser,
  includeUserHeader,
  async ( req, res, next ) => {
    try {
      const favorites = await Favorites.findOne( { user: req.user._id } );
      if ( !favorites ) {
        const err = new Error( 'No favorites found' );
        err.status = 404;
        return next( err );
      }
      const dishExists = favorites.dishes.includes( req.params.dishId );
      if ( !dishExists ) {
        const err = new Error( 'Dish does not exist in favorites' );
        err.status = 400;
        return next( err );
      }
      const index = favorites.dishes.indexOf( req.params.dishId );
      favorites.dishes.splice( index, 1 );
      if ( favorites.dishes.length === 0 ) {
        const deletedFavorites = await Favorites.findOneAndDelete( { user: req.user._id } );
        return res.status( 200 ).json( deletedFavorites );
      }
      const savedFavorites = await favorites.save();
      return res.status( 200 ).json( savedFavorites );

    } catch ( err ) { next( err ); }
  }
);

export default favoritesRouter;
