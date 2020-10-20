import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import session from 'express-session';
const MySQLStore = require('express-mysql-session')(session)
require('dotenv').config();

const env = process.env;
const userRouter = require('./controller/UserController');
const postRouter = require('./controller/PostController');

const app = express();
const PORT = env.PORT;

const options = {
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME
}
//Connect Database
const sessionStore = new MySQLStore(options);

app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: true,
    saveUninitialized: false
}));

app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(expressValidator())

app.use('', userRouter);
app.use('/post', postRouter);

app.listen(PORT, () => {
    console.log(`Server start ${PORT}`)
})

module.exports = app;
