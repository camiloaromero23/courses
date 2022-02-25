import express from 'express';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bodyParser from 'body-parser';
import dishRouter from './routes/dishRouter.js';

const __filename = fileURLToPath( import.meta.url );
const __dirname = dirname( __filename );

const hostname = 'localhost';
const port = 3000;

const app = express();

app.use( morgan( 'dev' ) );
app.use( bodyParser.json() );

app.use( '/dishes', dishRouter );

app.use( express.static( `${__dirname}/public` ) );

app.use( ( req, res, next ) => {
  console.log( req.headers );

  res.setHeader( 'Content-Type', 'text/html' );
  res.status( 200 ).send( '<html><body><h1>This is an Express server</h1></body></html>' );
} );

app.listen( port, hostname, () => {
  console.log( `App listening on http://${hostname}:${port}` );
} );
