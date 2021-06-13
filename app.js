const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const movieList = require('./movieList.json')
const port = 3000

// express template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//setting static files(告訴靜態檔案在哪裡)(不管哪個路由進來，都先走這個試看看)
app.use(express.static('public'))
// routes setting
app.get('/', (req, res) => {

  res.render('index', { movies: movieList.results })
})

//search route setting
//querystring
app.get('/search', (req, res) => {
  // console.log('req', req.query.keyword)
  const movieSearched = movieList.results.filter(item => {
    return item.title.toLowerCase().includes(req.query.keyword.toLowerCase())
  })
  res.render('index', { movies: movieSearched, keyword: req.query.keyword })
})

//params => /:
app.get('/movies/:movie_id', (req, res) => {
  console.log('movie_id', req.params.movie_id)

  // const movieChosed = movieList.results.filter(function (item) {
  //   return item.id === Number(req.params.movie_id)
  // })
  const movieChosed = movieList.results.filter(item => item.id === Number(req.params.movie_id))
  // console.log('movieChosed', movieChosed)
  res.render('show', { movie: movieChosed[0] })
})

app.listen(port, () => {
  console.log(`express is listening on localhost:${port}`)
})

//static files
