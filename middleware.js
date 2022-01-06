function auth(req, res, next){
    console.log('authorizing...');
        if(req.query.admin === 'true'){
         console.log('user authorized');
         console.log('request body: ', req.body );
         next();
    }
    else{
        res.send('user not authorized');
    }
}

module.exports = auth;
