const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/:id', function(req, res) {
    let id = req.params.id;

    let url = 'https://api.themoviedb.org/3/movie/'+id+'?api_key=66f34c7cc38ca73cb928c4610df72021&language=en-US&page=1';
    axios.get(url).then(posts => {
        d = [];
        runtime_h = Math.floor(posts.data['runtime']/60);
        runtime_m = posts.data['runtime']%60;
        if (runtime_h < 1){
            runtime = runtime_m.toString() + 'mins';
        }
        else{
            runtime = runtime_h.toString() + 'hrs ' + runtime_m.toString() + 'mins';
        }
        release = posts.data['release_date'].slice(0, 4);
        genre = '';
        for(let i = 0; i < posts.data['genres'].length; i++){
            genre += posts.data['genres'][i].name + ', ';
        };
        genre = genre.slice(0, -2);
        spoken = '';
        for(let i = 0; i < posts.data['spoken_languages'].length; i++){
            spoken += posts.data['spoken_languages'][i].english_name + ', ';
        };
        spoken = spoken.slice(0, -2);
        if (release == ""){
            release = 'N/A'
        }
        if(posts.data['vote_average']==0){
            vote = posts.data['vote_average'] + ' '
        }
        else{
            vote = posts.data['vote_average']
        }
        
        if(genre == null){
            genre = 'N/A'
        }
        if (spoken == null){
            spoken = 'N/A'
        }
        d.push({'title': posts.data['title'], 
                        'genres': genre,
                        'spoken_languages': spoken,
                        'release_date': release,
                        'runtime': runtime,
                        'overview': posts.data['overview'],
                        'vote_average': vote,
                        'tagline': posts.data['tagline'],
                        'img': 'https://image.tmdb.org/t/p/original' + posts.data['poster_path'],
                    'page':'/watch/movie/' + id}
                );
        res.json(d);
    }).catch(err => {
        res.send(err);
    })
});
module.exports = router;