const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/:id', function(req, res) {
    let id = req.params.id;

    let url = 'https://api.themoviedb.org/3/tv/'+id+'/reviews?api_key=66f34c7cc38ca73cb928c4610df72021&language=en-US&page=1';
    axios.get(url).then(posts => {
        d = [];
       
        for(let i = 0; i<posts.data.results.length;i++){
            if(posts.data.results[i].author_details.avatar_path === null){
                d.push({'author': posts.data.results[i]['author'], 
                                'content': posts.data.results[i]['content'],
                                'created_at': posts.data.results[i]['created_at'],
                                'url': posts.data.results[i]['url'],
                                'rating': posts.data.results[i].author_details['rating'],
                                'avatar_path': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHnPmUvFLjjmoYWAbLTEmLLIRCPpV_OgxCVA&usqp=CAU'}
                        );
            }
            else if(posts.data.results[i].author_details.avatar_path.includes('/https')){
                d.push({'author': posts.data.results[i]['author'], 
                                'content': posts.data.results[i]['content'],
                                'created_at': posts.data.results[i]['created_at'],
                                'url': posts.data.results[i]['url'],
                                'rating': posts.data.results[i].author_details['rating'],
                                'avatar_path': posts.data.results[i].author_details['avatar_path'].slice(1, -1)}
                        );
            }
            else {
                let p = 'https://image.tmdb.org/t/p/original' + posts.data.results[i].author_details['avatar_path'];
                d.push({'author': posts.data.results[i]['author'], 
                                'content': posts.data.results[i]['content'],
                                'created_at': posts.data.results[i]['created_at'],
                                'url': posts.data.results[i]['url'],
                                'rating': posts.data.results[i].author_details['rating'],
                                'avatar_path': p}
                        );
            }
            if(d.length === 10){
                break;
            }
        }
        res.json(d)
    }).catch(err => {
        res.send(err);
    })
});
module.exports = router;