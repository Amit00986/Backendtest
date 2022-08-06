const jwt = require('jsonwebtoken');

module.exports = {
    validateUsers: (req, res, next)  => {
        if(!req.body.username || req.body.username.length < 3){
            return res.status(400).send({
                message : "Please enter a username with min. 3 char",
            });
        }

        // password min. 6 cahracters 
        if(!req.body.password || req.body.length < 6) {
            return res.status(400).send({
                message: "Please enter a password min. 6 char",

            });
        }

        // password(repeat) must match

        if(
            !req.body.password_repeat || req.body.password != req.body.password_repeat
        )
        {
            return res.status(400).send ({
                message: "Both passwords must match",

            });
        }
        next();
    },
    isLoggedIn: () => {},

};