const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/:id', function(req, res) {
    let id = req.params.id;

    let url = 'https://api.themoviedb.org/3/tv/'+id+'/videos?api_key=66f34c7cc38ca73cb928c4610df72021&language=en-US&page=1';
    axios.get(url).then(posts => {
        d = [];
       
        if(posts.data.results.length === 0){
            d.push({'key': 'tzkWB85ULJY'});
        }
        for(let i = 0; i<posts.data.results.length;i++){
            if(posts.data.results[i].key !== null){
            d.push({'site': posts.data.results[i]['site'], 
                            'type': posts.data.results[i]['type'],
                            'name': posts.data.results[i]['name'],
                            'key': posts.data.results[i]['key']}
                    );
            break;
            }
        }
        res.json(d);
    }).catch(err => {
        res.send(err);
    })
});
module.exports = router;