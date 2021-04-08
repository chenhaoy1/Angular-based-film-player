const express = require('express');
const router = express.Router();
const axios = require('axios');
const { query } = require('express');

router.get('/:query', function(req, res) {
    let query = req.params.query;

    let url = 'https://api.themoviedb.org/3/search/multi?api_key=66f34c7cc38ca73cb928c4610df72021&language=en-US&query=' + query;
    axios.get(url).then(posts => {
        d = [];
        for(let i = 0; i < posts.data.results.length; i++){
            back = posts.data.results[i].backdrop_path;
            if(posts.data.results[i].media_type == 'movie' && back!= null){
                temp = {
                    'id': posts.data.results[i].id,
                    'name': posts.data.results[i].title,
                    'backdrop_path': back,
                    'media_type': 'movie'
                }   
                d.push(temp);
            }
            else if(posts.data.results[i].media_type == 'tv' && back!=null ){
                temp = {
                    'id': posts.data.results[i].id,
                    'name': posts.data.results[i].name,
                    'backdrop_path': back,
                    'media_type': 'tv'
                }   
                d.push(temp);
            }
            if (d.length === 7){
                break;
            }
        
        }      
        res.json(d);
    }).catch(err => {
        res.send(err);
    })
});
module.exports = router;