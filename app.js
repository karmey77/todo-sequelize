if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const bcrypt = require('bcryptjs')
const app = express()
const PORT = 3000
const session = require('express-session')
const usePassport = require('./config/passport') // 載入設定檔，要寫在 express-session 以後
const flash = require('connect-flash')
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(session({
    secret: 'ThisIsMySecret',
    resave: false,
    saveUninitialized: true
}))

usePassport(app) // 呼叫 Passport 函式並傳入 app，這條要寫在路由之前
app.use(flash())
app.use((req, res, next) => {
    // 你可以在這裡 console.log(req.user) 等資訊來觀察
    res.locals.isAuthenticated = req.isAuthenticated()
    res.locals.user = req.user
    res.locals.success_msg = req.flash('success_msg')  // 設定 success_msg 訊息
    res.locals.warning_msg = req.flash('warning_msg')  // 設定 warning_msg 訊息
    next()
})

const routes = require('./routes')
app.use(routes)

app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`)
})