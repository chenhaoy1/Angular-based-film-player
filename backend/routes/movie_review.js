const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/:id', function(req, res) {
    let id = req.params.id;
    month_d={'01':'January', '02':'February','03':'March','04':'April','05':'May','06':'June','07':'July','08':'August','09':'September','10':'October','11':'November','12':'December'};
    let url = 'https://api.themoviedb.org/3/movie/'+id+'/reviews?api_key=66f34c7cc38ca73cb928c4610df72021&language=en-US&page=1';
    axios.get(url).then(posts => {
        d = [];
        
        for(let i = 0; i<posts.data.results.length;i++){
            rate = posts.data.results[i].author_details['rating'];
            if (rate === null){
                rate = '0';
            }
            create = posts.data.results[i]['created_at'].slice(0, 10);
            month = create.slice(5, 7);
            date = create.slice(8, 10);
            year = create.slice(0, 4);
            if (date < 10){
                date = date.slice(1);
            }
            time = posts.data.results[i]['created_at'].slice(11, 19);
            hour = time.slice(0, 2);
            if (hour < 12){
                hour = hour.slice(1);
                time = hour + time.slice(2) + ' AM'
            }
            else{
                hour -= 12;
                time = hour + time.slice(2) + ' PM'

            }
            create = month_d[month] + ' ' + date + ', ' + year + ', ';
            if(posts.data.results[i].author_details.avatar_path === null){
                d.push({'author': posts.data.results[i]['author'], 
                                'content': posts.data.results[i]['content'],
                                'created_at': create,
                                'url': posts.data.results[i]['url'],
                                'rating': rate,
                                'avatar_path': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHnPmUvFLjjmoYWAbLTEmLLIRCPpV_OgxCVA&usqp=CAU',
                                'time': time,
                            }
                        );
            }
            else if(posts.data.results[i].author_details.avatar_path.includes('/https')){
                d.push({'author': posts.data.results[i]['author'], 
                                'content': posts.data.results[i]['content'],
                                'created_at': create,
                                'url': posts.data.results[i]['url'],
                                'rating': rate,
                                'avatar_path': posts.data.results[i].author_details['avatar_path'].slice(1, -1),
                                'time':time}
                        );
            }
            else {
                let p = 'https://image.tmdb.org/t/p/original' + posts.data.results[i].author_details['avatar_path'];
                d.push({'author': posts.data.results[i]['author'], 
                                'content': posts.data.results[i]['content'],
                                'created_at': create,
                                'url': posts.data.results[i]['url'],
                                'rating': rate,
                                'avatar_path': p,
                                'time':time}
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