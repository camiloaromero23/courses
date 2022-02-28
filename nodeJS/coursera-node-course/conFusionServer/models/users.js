import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema( {
  admin: {
    type: Boolean,
    default: false
  }
} );

userSchema.plugin( passportLocalMongoose );

export const Users = mongoose.model( 'User', userSchema );
