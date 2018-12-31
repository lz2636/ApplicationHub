const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/key');
const db = require('./dbhelper');

function findUser(id) {
    return new Promise(function (callback) {
        db.query({
            TableName: db.userTable,
            KeyConditionExpression: "#id = :iii",
            ExpressionAttributeNames: {
                "#id": "id"
            },
            ExpressionAttributeValues: {
                ":iii": id
            }
        }, function (err, data) {
            if (err || data.Items.length > 1) {
                throw err;
            }
            //pass current user if exist
            if (data.Items.length === 1) {
                callback(data.Items[0]);
            } else {
                callback(null);
            }

        });
    });
}

function addUser(profile) {
    let user = {
        "id": profile.id,
        "firstName": profile.name.givenName,
        "lastName": profile.name.familyName
    };
    return new Promise(function (callback) {
        db.put({
            TableName: db.userTable,
            Item: {
                "id": user.id,
                "firstName": user.firstName,
                "lastName": user.lastName
            }
        }, function (err) {
            if (err) {
                throw err;
            }
            callback(user);
        });
    });
}

passport.serializeUser((user, done) => {
    console.log("serialize user", user);
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    console.log("deserialize user id", id);
    findUser(id).then(user => {
       done(null, user);
    });
});

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback'
        },
        (accessToken, refreshToken, profile, done) => {
            console.log('profile', profile);
            findUser(profile.id).then(existingUser => {
                console.log('existing user is', existingUser);
                if (existingUser) {
                    done(null, existingUser);
                } else {
                    addUser(profile).then(function (user) {
                        console.log("add new user", user);
                        done(null, user);
                    });
                }
            });
        }
    )
);
