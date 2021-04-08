const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/:id', function(req, res) {
    let id = req.params.id;

    let url = 'https://api.themoviedb.org/3/person/'+id+ '?api_key=66f34c7cc38ca73cb928c4610df72021&language=en-US&page=1';
    axios.get(url).then(posts => {
        d = {};
        gender_d = {1: 'Female', 2:'Male', 0: 'Undefined'}
        aks = ''.concat(posts.data['also_known_as'])
        

        d= {'birthday': posts.data['birthday'], 
                'gender': gender_d[posts.data['gender']],
                'name': posts.data['name'],
                'homepage': posts.data['homepage'],
                'also_known_as': aks,
                'known_for_department': posts.data['known_for_department'],
                'biography': posts.data['biography'],
                'place_of_birth': posts.data['place_of_birth']
                }
               
        res.json(d);
    }).catch(err => {
        res.send(err);
    })
});
module.exports = router;