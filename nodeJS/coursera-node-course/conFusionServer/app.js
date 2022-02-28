import createError from 'http-errors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import session from 'express-session';
import sessionFileStore from 'session-file-store';
import passport from 'passport';
import { localAuthentication } from './authenticate.js';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import dishRouter from './routes/dishRouter.js';
import promoRouter from './routes/promoRouter.js';
import leaderRouter from './routes/leaderRouter.js';

const __filename = fileURLToPath( import.meta.url );
const __dirname = dirname( __filename );

const url = 'mongodb://localhost:27017/conFusion';
const SECRET_KEY = '12345-67890-09876-54321';
try {
  await mongoose.connect( url, {
    authSource: "admin",
    user: "root",
    pass: "root",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } );
  console.log( "Connected to db" );

} catch ( error ) {
  console.log( "Error connecting to db 😢" );
}
const FileStore = sessionFileStore( session );
const app = express();

// view engine setup
app.set( 'views', path.join( __dirname, 'views' ) );
app.set( 'view engine', 'jade' );

app.use( logger( 'dev' ) );
app.use( express.json() );
app.use( express.urlencoded( { extended: false } ) );
// app.use( cookieParser( SECRET_KEY ) );
app.use( session( {
  name: 'session-id',
  secret: SECRET_KEY,
  saveUninitialized: false,
  resave: false,
  store: new FileStore(),
} ) );

app.use( passport.initialize() );
app.use( passport.session() );

app.use( '/', indexRouter );
app.use( '/users', usersRouter );

const auth = ( req, res, next ) => {
  const { user } = req;
  if ( !user ) {
    const err = new Error( 'You are not authenticated' );
    err.status = 403;
    return next( err );
  }
  return next();
};

app.use( auth );

app.use( express.static( path.join( __dirname, 'public' ) ) );

app.use( '/dishes', dishRouter );
app.use( '/promotions', promoRouter );
app.use( '/leaders', leaderRouter );

// catch 404 and forward to error handler
app.use( function ( req, res, next ) {
  next( createError( 404 ) );
} );

// error handler
app.use( function ( err, req, res, next ) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get( 'env' ) === 'development' ? err : {};

  // render the error page
  res.status( err.status || 500 );
  res.render( 'error' );
} );

export default app;
