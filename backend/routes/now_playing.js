const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', function(req, res) {
    let url = 'https://api.themoviedb.org/3/movie/now_playing?api_key=66f34c7cc38ca73cb928c4610df72021&language=en-US&page=1';
    axios.get(url).then(posts => {
        var d = {};
        d['result'] = [];
        if(posts.data.results.length >= 5) {
            for(let i = 0; i < 5; i++){
                d['result'].push({'id': posts.data.results[i]['id'], 
                                'backdrop_path': posts.data.results[i]['backdrop_path'],
                                'title': posts.data.results[i]['title']})
            }
        }
        else{
            for(let i = 0; i<posts.data.results.length;i++){
                d['result'].push({'id': posts.data.results[i]['id'], 
                                'backdrop_path': posts.data.results[i]['backdrop_path'],
                                'title': posts.data.results[i]['title']})
            }
        }
        res.json(d);
    }).catch(err => {
        res.send(err);
    })
});

module.exports = router;