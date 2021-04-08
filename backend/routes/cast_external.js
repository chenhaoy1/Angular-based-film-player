const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/:id', function(req, res) {
    let id = req.params.id;

    let url = 'https://api.themoviedb.org/3/person/'+id+ '/external_ids?api_key=66f34c7cc38ca73cb928c4610df72021&language=en-US&page=1';
    axios.get(url).then(posts => {
        var d= {'IMDB': ['https://imdb.com/name/'+ posts.data['imdb_id'], 'fa fa-imdb', '#e2b62b', posts.data['imdb_id']],
                'Instagram': ['https://instagram.com/'+posts.data['instagram_id'], "fa fa-instagram", '#8d1a8d', posts.data['instagram_id']],

                'Facebook': ['https://facebook.com/'+posts.data['facebook_id'], 'fa fa-facebook-square', '#0000ff', posts.data['facebook_id']],
                'Twitter': ['https://twitter.com/'+posts.data['twitter_id'], 'fa fa-twitter', '#1e90ff', posts.data['twitter_id']]
            }
        
        var filledProps = Object.keys(d).reduce((newObj, key) => {
            const value = d[key];
            if (value[3] !== null && value[3] !== '') {
                newObj[key] = value;
            }
            return newObj;
            },{});
        l = Object.entries(filledProps);
        
        res.json(l);
    }).catch(err => {
        res.send(err);
    })
});
module.exports = router;