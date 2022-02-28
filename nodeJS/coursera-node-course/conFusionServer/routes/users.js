import express from 'express';
import bodyParser from 'body-parser';

import { Users } from '../models/users.js';

const userRouter = express.Router();
userRouter.use( bodyParser.json() );

/* GET users listing. */
userRouter.get( '/', function ( req, res, next ) {
  res.send( 'respond with a resource' );
} );

userRouter.post( '/signup', async ( req, res, next ) => {
  try {
    const { username, password } = req.body;

    const user = await Users.findOne( { username } );
    if ( user ) {
      const err = new Error( `User ${username} already exists` );
      err.status = 403;
      return next( err );
    }
    const createdUser = await Users.create( { username, password } );
    res.status( 201 ).json( {
      status: 'Registration Successful',
      user: createdUser,
    } );
  } catch ( err ) { next( err ); }
} );

userRouter.post( '/login', async ( req, res, next ) => {
  const { user } = req.session;
  if ( user ) {
    res.status( 200 ).send( 'You are already authenticated!' );
  }

  const { authorization: authHeader } = req.headers;

  if ( !authHeader ) {
    const err = new Error( 'You are not authenticated' );

    res.setHeader( "WWW-Authenticate", 'Basic' );

    err.status = 401;
    return next( err );
  }

  const auth = Buffer.from( authHeader.split( ' ' )[1], 'base64' )
    .toString()
    .split( ':' );

  const [username, password] = auth;

  try {
    const foundUser = await Users.findOne( { username } );

    if ( !foundUser || foundUser.password !== password ) {

      const err = new Error( `User ${username} does not exists or invalid password` );

      err.status = 403;
      return next( err );
    }

    req.session.user = 'authenticated';
    res.status( 200 ).send( 'Authenticated' );
  } catch ( err ) {
    return next( err );
  }
} );

userRouter.get( '/logout', ( req, res ) => {
  if ( !req.session ) {
    const err = new Error( 'You are not logged in!' );
    err.status = 403;
    return next( err );
  }
  req.session.destroy();
  res.clearCookie( 'session-id' );
  res.redirect( '/' );
  return;
} );

export default userRouter;
