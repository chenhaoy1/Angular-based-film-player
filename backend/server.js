const express = require('express');
const cors = require('cors');
const now_playing = require('./routes/now_playing');
const popular_movie = require('./routes/popular_movie');
const top_rated = require('./routes/top_rated');
const trending_movie = require('./routes/trending_movie');
const top_rated_tv = require('./routes/top_rated_tv');
const popular_tv = require('./routes/popular_tv');
const trending_tv = require('./routes/trending_tv');
const recommend_mv = require('./routes/recommend_mv');
const similar_mv = require('./routes/similar_mv');
const recommend_tv = require('./routes/recommend_tv');
const similar_tv = require('./routes/similar_tv');
const movie_video = require('./routes/movie_video');
const movie_detail = require('./routes/movie_detail');
const movie_review = require('./routes/movie_review');
const movie_cast = require('./routes/movie_cast');
const path = require('path');
const tv_cast = require('./routes/tv_cast');
const tv_detail = require('./routes/tv_detail');
const tv_review = require('./routes/tv_review');
const tv_video = require('./routes/tv_video');
const cast_detail = require('./routes/cast_detail');
const cast_external = require('./routes/cast_external');
const multi_search = require('./routes/multi_search');

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist/frontend')));

app.use('/apis/tv_review', tv_review);
app.use('/apis/cast_detail', cast_detail);
app.use('/apis/cast_external', cast_external);
app.use('/apis/multi_search', multi_search);

app.use('/apis/movie_review', movie_review);
app.use('/apis/movie_cast', movie_cast);
app.use('/apis/tv_cast', tv_cast);
app.use('/apis/tv_detail', tv_detail);
app.use('/apis/tv_video', tv_video);
app.use('/apis/movie_detail', movie_detail);
app.use('/apis/movie_video', movie_video);
app.use('/apis/recommend_tv', recommend_tv);
app.use('/apis/similar_mv', similar_mv);
app.use('/apis/similar_tv', similar_tv);
app.use('/apis/now_playing', now_playing);
app.use('/apis/popular_movie', popular_movie);
app.use('/apis/top_rated', top_rated);
app.use('/apis/trending_movie', trending_movie);
app.use('/apis/top_rated_tv', top_rated_tv);
app.use('/apis/popular_tv', popular_tv);
app.use('/apis/trending_tv', trending_tv);
app.use('/apis/recommend_mv', recommend_mv);

app.use('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/frontend/index.html'));
})

app.listen(8080, function() {
    console.log("Backend application listening at http://localhost:8080")
})

module.exports = app;