const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');

passport.use(new GoogleStrategy (
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK
    },
    async function(accessToken, refreshToken, profile, cb) {
        try {
            // A user has logged in with OAuth
            let user = await User.findOne({ googleId: profile.id });
            // Existing user found
            if (user) return cb(null, user);
            // New user via OAuth
            user = await User.create({
                name: profile.displayName,
                googleId: profile.id,
                email: profile.emails[0].value,
                avatar: profile.photos[0].value,
                mylist: [],
            });
            return cb(null, user); 
        } catch (err) {
            return cb(err);
        }
    }
));

// Return the nugget of data that passport is going to add to the session used to track user
passport.serializeUser(function(user, cb) {
    cb(null, user._id);
});

passport.deserializeUser(async function(userId, cb) {
    cb(null, await User.findById(userId));
});