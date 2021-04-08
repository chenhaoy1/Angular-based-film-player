const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/:id', function(req, res) {
    let id = req.params.id;

    let url = 'https://api.themoviedb.org/3/tv/'+id+'/recommendations?api_key=66f34c7cc38ca73cb928c4610df72021&language=en-US&page=1';
    axios.get(url).then(posts => {
        d = [[], []];
        group = [];
        for(let i = 0; i<posts.data.results.length;i++){
            if(posts.data.results[i].poster_path !== null){
                group.push({'id': posts.data.results[i]['id'], 
                                'poster_path': posts.data.results[i]['poster_path'],
                                'title': posts.data.results[i]['name']});
                d[1].push({'id': posts.data.results[i]['id'], 
                'poster_path': posts.data.results[i]['poster_path'],
                'title': posts.data.results[i]['name']});
                
                if (group.length === 6){
                    d[0].push(group);
                    group = [];
                }
            }
        }
        if (posts.data.results.length % 6 !== 0){
            d[0].push(group);
        }
        res.json(d);
    }).catch(err => {
        res.send(err);
    })
});
module.exports = router;