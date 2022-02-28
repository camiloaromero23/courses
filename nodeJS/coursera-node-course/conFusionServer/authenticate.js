import passport from "passport";
import { Strategy } from "passport-local";
import { Users } from "./models/users.js";

export const localAuthentication = passport.use( new Strategy( Users.authenticate() ) );
passport.serializeUser( Users.serializeUser() );
passport.deserializeUser( Users.deserializeUser() );
