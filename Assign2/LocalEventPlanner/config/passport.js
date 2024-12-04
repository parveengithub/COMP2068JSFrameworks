const LocalStrategy = require('passport-local').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports = (passport) => {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
            const user = await User.findOne({ email });
            if (!user) return done(null, false, { message: 'No user found' });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return done(null, false, { message: 'Password incorrect' });

            return done(null, user);
        })
    );

    passport.use(
        new GitHubStrategy(
            {
                clientID: process.env.GITHUB_CLIENT_ID,
                clientSecret: process.env.GITHUB_CLIENT_SECRET,
                callbackURL: '/auth/github/callback',
            },
            async (accessToken, refreshToken, profile, done) => {
                const user = await User.findOne({ githubId: profile.id });
                if (user) return done(null, user);

                const newUser = new User({
                    githubId: profile.id,
                    email: profile._json.email || profile.username,
                    name: profile.displayName || profile.username,
                });

                await newUser.save();
                done(null, newUser);
            }
        )
    );

    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => User.findById(id, done));
};
