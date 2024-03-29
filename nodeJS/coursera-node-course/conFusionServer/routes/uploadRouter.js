import bodyParser from 'body-parser';
import express from "express";
import multer, { diskStorage } from "multer";
import { includeUserHeader, verifyAdmin, verifyUser } from "../authenticate.js";
import { cors, corsWithOptions } from './cors.js';


const storage = diskStorage( {
  destination: ( req, file, cb ) => {
    cb( null, 'public/images' );
  },
  filename: ( req, file, cb ) => {
    cb( null, file.originalname );
  },
} );

const imageFileFilter = ( req, file, cb ) => {
  if ( !file.originalname.match( /\.(jpg|jpeg|png|gif)$/ ) ) {
    const err = new Error( 'You can upload only image files' );
    return cb( err, false );
  }
  cb( null, true );
};

const upload = multer( { storage, fileFilter: imageFileFilter } );

const uploadRouter = express.Router();

uploadRouter.use( bodyParser.json() );

uploadRouter.options( corsWithOptions, ( req, res ) => {
  res.sendStatus( 200 );
} );

uploadRouter.get( '/', cors, verifyUser, includeUserHeader, verifyAdmin, ( req, res, next ) => {
  res.status( 403 ).send(
    `GET operation not supported on /imageUpload`
  );
} );

uploadRouter.put( '/', corsWithOptions, verifyUser, includeUserHeader, verifyAdmin, ( req, res, next ) => {
  res.status( 403 ).send(
    `PUT operation not supported on /imageUpload`
  );
} );

uploadRouter.delete( '/', corsWithOptions, verifyUser, includeUserHeader, verifyAdmin, ( req, res, next ) => {
  res.status( 403 ).send(
    `DELETE operation not supported on /imageUpload`
  );
} );

uploadRouter.post(
  '/',
  corsWithOptions,
  verifyUser,
  includeUserHeader,
  verifyAdmin,
  upload.single( 'imageFile' ),
  ( req, res ) => {
    res.status( 200 ).json( req.file );
  } );

export default uploadRouter;
