import express from 'express';
import session from 'express-session';
import createError from 'http-errors';
import mongoose from 'mongoose';
import logger from 'morgan';
import passport from 'passport';
import path, { dirname } from 'path';
import sessionFileStore from 'session-file-store';
import { fileURLToPath } from 'url';
import { mongoUrl } from './config.js';
import dishRouter from './routes/dishRouter.js';
import favoritesRouter from './routes/favoritesRouter.js';
import indexRouter from './routes/index.js';
import leaderRouter from './routes/leaderRouter.js';
import promoRouter from './routes/promoRouter.js';
import uploadRouter from './routes/uploadRouter.js';
import usersRouter from './routes/users.js';



const __filename = fileURLToPath( import.meta.url );
const __dirname = dirname( __filename );

const MONGO_URI = mongoUrl;
try {
  await mongoose.connect( MONGO_URI, {
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

app.all( '*', ( req, res, next ) => {
  if ( req.secure ) {
    return next();
  }
  const { hostname, url } = req;
  const secPort = app.get( 'secPort' );
  res.redirect( 307, `https://${hostname}:${secPort}${url}` );
} );

// view engine setup
app.set( 'views', path.join( __dirname, 'views' ) );
app.set( 'view engine', 'jade' );

app.use( logger( 'dev' ) );
app.use( express.json() );
app.use( express.urlencoded( { extended: false } ) );

app.use( passport.initialize() );

app.use( '/', indexRouter );
app.post( '/test', ( req, res ) => {
  console.log( req.body );
  res.status( 200 ).send( 'Hello World' );
} );
app.use( '/users', usersRouter );

app.use( express.static( path.join( __dirname, 'public' ) ) );

app.use( '/dishes', dishRouter );
app.use( '/promotions', promoRouter );
app.use( '/leaders', leaderRouter );
app.use( '/favorites', favoritesRouter );
app.use( '/imageUpload', uploadRouter );


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
