import http from 'http';
import fs from 'fs'
import path from 'path';

const hostname = 'localhost';
const port = 3000;

const server = http.createServer( ( req, res ) => {
  console.log( `Request for ${req.url} by method ${req.method}` );

  if ( req.method == 'GET' ) {
    const fileUrl = req.url === '/' ? '/index.html' : req.url;

    let filePath = path.resolve( `./public${fileUrl}` )
    const fileExt = path.extname( filePath )
    if ( fileExt === '.html' ) {
      fs.access( filePath, fs.constants.R_OK, ( err ) => {
        if ( err ) {
          res.statusCode = 404;
          // res.setHeader()
          res.setHeader( 'Content-Type', 'text/html' );
          res.end( `<html><body><h1>Error 404: ${filePath} not found</h1></body></html>` );

          return;
        }
        res.statusCode = 200;
        res.setHeader( 'Content-Type', 'text/html' );
        fs.createReadStream( filePath ).pipe( res )
      } )
    } else {
      res.statusCode = 404;
      // res.setHeader()
      res.setHeader( 'Content-Type', 'text/html' );
      res.end( `<html><body><h1>Error 404: ${filePath} not an HTML file</h1></body></html>` );

      return;
    }
  } else {

    res.statusCode = 404;
    // res.setHeader()
    res.setHeader( 'Content-Type', 'text/html' );
    res.end( `<html><body><h1>Error 404: ${req.method} not supported</h1></body></html>` );

    return;
  }

} );

server.listen( port, hostname, () => {
  console.log( `Server listening on http://${hostname}:${port}` );
} );
