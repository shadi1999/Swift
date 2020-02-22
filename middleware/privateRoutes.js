const Administrator = require('../models/Administrator');


function adminOnly(req, res, next) {

    Administrator.find({'email': req.user.email})
        .then(next)
        .catch(res.status(401).json({msg:'Unauth'})
    );
    //end


}

module.exports=adminOnly;