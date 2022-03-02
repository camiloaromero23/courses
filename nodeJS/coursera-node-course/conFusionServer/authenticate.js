import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Users } from "./models/users.js";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import jwt from "jsonwebtoken";
import { secretKey } from './config.js';

export const localAuthentication = passport.use( new LocalStrategy( Users.authenticate() ) );
passport.serializeUser( Users.serializeUser() );
passport.deserializeUser( Users.deserializeUser() );

export const getToken = ( user ) => {
  return jwt.sign( user, secretKey, { expiresIn: 3600 } );
};

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKey
};

export const jwtPassport = passport.use( new JwtStrategy(
  opts,
  ( jwtPayload, done ) => {
    Users.findOne( { id: jwtPayload._id }, ( err, user ) => {
      if ( err ) {
        return done( err, false );
      }
      if ( !user ) {
        return done( null, false );
      }
      return done( null, user );
    } );
  }
) );

export const verifyUser = passport.authenticate( 'jwt', { session: false } );

export const verifyAdmin = async ( req, res, next ) => {
  const { admin: isAdmin } = req.user;
  if ( isAdmin ) {
    next();
  } else {
    const err = new Error( `You are not authorized to perform this operation!` );
    err.status = 403;
    next( err );
  }
};

export const includeUserHeader = async ( req, res, next ) => {
  const token = req.headers.authorization.split( ' ' )[1];
  const { _id } = jwt.decode( token );
  const user = await Users.findById( _id );
  req.user = user;
  next();
};
