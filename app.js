const dotenv          = require('dotenv').config()
const express         = require('express')
const path            = require('path')
const bodyParser      = require('body-parser')
const fileUpload      = require('express-fileupload')
const expressSession  = require('express-session')
const connectMongo    = require('connect-mongo')
const connectFlash    = require('connect-flash')
// const cookieParser    = require('cookie-parser')
// const sassMiddleware  = require('node-sass-middleware')
const mongoose        = require('mongoose')
const router          = require('./router')
const port            = 3000
// const numberCategoryInList = require('./utils/functions')
// const Recipe = require('./database/models/Recipe')
const sidebarCategory = require('./middleware/sideBar')


const app = express()

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

// DATA BASE CONNECT
mongoose.connect(process.env.DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use(connectFlash())

const mongoStore = connectMongo(expressSession)

//Session
app.use(expressSession({
  secret: process.env.SESSION_SECRET,
  store: new mongoStore({ mongooseConnection: mongoose.connection }),
  resave: false,
  saveUninitialized: false,
  // 3600000 ms = 1 hour
  cookie: {maxAge: 3600000, httpOnly: true}
}))

// FIle Upload 
app.use(fileUpload())

// VIEW ENGINE SETUP
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Set Global Variable for all the Routes
app.use('*', sidebarCategory, (req, res, next) => {

  res.locals.auth = req.session.userId
  res.locals.username = req.session.username
  
  next()

}) 

// app.use(express.json())
// app.use(express.urlencoded({ extended: false }))

// app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

// // sassMiddleware
// app.use(sassMiddleware({
//   src: path.join(__dirname, 'public'),
//   dest: path.join(__dirname, 'public'),
//   indentedSyntax: true, // true = .sass and false = .scss
//   sourceMap: true
// }))



// ----------------  ROUTES  -----------------------------
app.use('/', router)
app.use((req, res) => res.render('404', { title: 'Страницата не е намерена' }))
// ----------------  ROUTES  -----------------------------


app.listen(process.env.PORT || port, () => console.log(`Server started on port: ${port}`))
