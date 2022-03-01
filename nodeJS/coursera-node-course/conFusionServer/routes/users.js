import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import { getToken } from '../authenticate.js';
import { Users } from '../models/users.js';

const userRouter = express.Router();
userRouter.use( bodyParser.json() );

/* GET users listing. */
userRouter.get( '/', function ( req, res, next ) {
  res.send( 'respond with a resource' );
} );

userRouter.post( '/signup', ( req, res, next ) => {
  const { username, firstname, lastname, password } = req.body;

  try {
    Users.register( new Users( { username } ), password, ( err, user ) => {
      if ( err ) {
        res.status( 500 ).json( { err } );
      } else {
        if ( firstname ) {
          user.firstname = firstname;
        }
        if ( lastname ) {
          user.lastname = lastname;
        }
        user.save( ( err, user ) => {
          if ( err ) {
            res.status( 500 ).json( { err } );
            return;
          }
          passport.authenticate( 'local' )( req, res, () => {
            res.status( 201 ).json( {
              status: 'Registration Successful',
              success: true
            } );
          } );
        } );
      }
    } );
  } catch ( err ) { next( err ); }
} );

userRouter.post( '/login', passport.authenticate( 'local' ), ( req, res, next ) => {
  const token = getToken( { _id: req.user._id } );
  res.status( 200 ).json(
    {
      status: 'You are successfully logged in',
      success: true,
      token,
    }
  );
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
