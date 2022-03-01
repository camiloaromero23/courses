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
import { mongoUrl, secretKey } from './config.js';

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

// view engine setup
app.set( 'views', path.join( __dirname, 'views' ) );
app.set( 'view engine', 'jade' );

app.use( logger( 'dev' ) );
app.use( express.json() );
app.use( express.urlencoded( { extended: false } ) );

app.use( passport.initialize() );

app.use( '/', indexRouter );
app.use( '/users', usersRouter );

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
