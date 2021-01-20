const handleSignIn = (req, res, db, bcrypt) =>{
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json('incorrect form submission')
    }
    db.select('email', 'hash').from('login')
        .where('email', '=', email )
        .then(data => {
            console.log(password)
            // const isValid = bcrypt.compare(password, data[0].hash);
            bcrypt.compare(password, data[0].hash, function(err, result) {
            if (result){
                return db.select('*').from('users')
                    .where('email', '=', email)
                    .then(user =>{
                        res.json(user[0])
                    })
                .catch(err => res.status(400).json('unable to get user'))
            }else{
                res.status(400).json('wrong credentials')
            }
        })
        })
        .catch(err => res.status(400).json('wrong credentials'))
    
}


module.exports={
    handleSignIn: handleSignIn
}