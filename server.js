const express = require('express');
const bodyParser = require('body-parser');
const mongoSanitize = require('express-mongo-sanitize');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const session = require('express-session');

const dotenv = require('dotenv');
const path = require('path');

const { createUser } = require('./app/controllers/user');

const { authenticateToken } = require('./app/middleware/auth');

const userRoutes = require('./app/routes/user');
const registerRoutes = require('./app/routes/register');
const loginRoutes = require('./app/routes/login');
const logoutRoutes = require('./app/routes/logout');

const app = express();
dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(mongoSanitize());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/user', express.static(path.join(__dirname, 'public')));
app.use('/user/edit', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(passport.initialize());
app.use(passport.session());

async function startServices() {
  await mongoose.connect('mongodb://localhost:27017/userdb');
}

startServices().catch((error) => console.log(error));

app.get('/', authenticateToken, (req, res) => {
  res.redirect('/user');
});

app.use('/user', authenticateToken, userRoutes);

app.use('/register', registerRoutes);

app.use('/login', loginRoutes);

app.use('/logout', logoutRoutes);

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile'] })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  createUser
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback',
    },
    function (accessToken, refreshToken, profile, done) {
      process.nextTick(function () {
        return done(null, profile);
      });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

app.listen(process.env.PORT, () => {
  console.log(`Express server listening on port ${process.env.PORT}`);
});
//ddsfd

// const refreshTokens = [];git commit --amend --no-edit
// app.post('/token', (req, res) => {
//   const refreshToken = req.body.token;
//   if (!refreshToken) return res.sendStatus(401);
//   if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);

//   jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
//     if (err) res.sendStatus(403);
//     const accessToken = generateAccessToken({
//       email: user.email,
//       password: user.password,
//     });
//     res.json({ accessToken });
//   });
// });
