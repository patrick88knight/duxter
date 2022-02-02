import express from 'express'
import path from 'path'
import * as UserRoute from "./routes/User"
import bodyParser from 'body-parser'
const passport = require('passport')
require('dotenv').config()
require('./passport.ts')

const app = express()
const PORT = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(path.resolve(__dirname, '../client/build')))
app.post('/signup', UserRoute.signup)
app.get('/getUsers', passport.authenticate('jwt',{session: false}),UserRoute.getUsers)
app.post('/login', UserRoute.login)
app.get('/me', passport.authenticate('jwt',{session: false}), UserRoute.me)
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
