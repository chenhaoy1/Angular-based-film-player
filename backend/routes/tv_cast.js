const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/:id', function(req, res) {
    let id = req.params.id;
    let url = 'https://api.themoviedb.org/3/tv/'+id+'/credits?api_key=66f34c7cc38ca73cb928c4610df72021&language=en-US&page=1';
    axios.get(url).then(posts => {
        d = [];
        for(let i = 0; i<posts.data.cast.length;i++){
            if(posts.data.cast[i].profile_path !== null){
                d.push({'id': posts.data.cast[i]['id'], 
                            'name': posts.data.cast[i]['name'],
                                'character': posts.data.cast[i]['character'],
                                'profile_path': posts.data.cast[i]['profile_path']});
                
            }
        }
        
        res.json(d);
    }).catch(err => {
        res.send(err);
    })
});

module.exports = router;