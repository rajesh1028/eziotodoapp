const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if(token){
            jwt.verify(token,process.env.key,(err,decoded)=>{
                if(err) res.send("Invalid token, Login Again");
                else{
                    console.log(decoded);
                    if(decoded.user._id){
                        req.body.username = decoded.user.name;
                    }
                    next();
                }
            });
        }else{
            res.send("Login to continue");
        }
    } catch (error) {
        console.log(error);
        res.json(error);
    }
}

module.exports = { authenticate };