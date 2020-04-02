const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.set('views', './view')
app.use(express.static('./public'))

app.get('/call', (req, res) => {
    res.render('home')
})

app.listen(3000, () => console.log('server started'))