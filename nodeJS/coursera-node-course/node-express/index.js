import express from 'express';
// import http from 'http';

const hostname = 'localhost';
const port = 3000;

const app = express()

app.use( ( req, res, next ) => {
  console.log( req.headers );

  res.setHeader( 'Content-Type', 'text/html' )
  res.status( 200 ).send( '<html><body><h1>This is an Express server</h1></body></html>' )
} )

app.listen( port, hostname, () => {
  console.log( `App listening on http://${hostname}:${port}` );
} )
