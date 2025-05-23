import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Usermodel } from "../db/schema.js";
import dotenv from "dotenv";
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await Usermodel.findOne({ googleId: profile.id });

        if (existingUser) return done(null, existingUser);

        // Register new user
        const newUser = await Usermodel.create({
          googleId: profile.id,
          username: profile.displayName,
          email: profile.emails[0].value,
        });

        return done(null, newUser);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
