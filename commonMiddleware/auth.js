const jwt = require('jsonwebtoken');
const User = require('../model/userSchema')
const multer=require('multer')
const shortid=require('shortid')
const path=require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname),'Uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + "." + file.originalname)
    }
  })
   
exports.upload = multer({ storage: storage })

exports.requireSignin = (req, res, next) => {
    if (req.headers.authorization) {
        
        let token = req.headers.authorization.split(" ")[1];
        // const user = jwt.decode(token, process.env.JWTSECRET);
        jwt.verify(token, process.env.JWTSECRET, function(err, decoded) {
            if (err) {
                return res.status(501).json({ message: "jwt expired" })
            }
            req.user = decoded;
          });

        

    } else {
        return res.status(401).json({ message: "invali authorization" })
    }

    next();
}

exports.isAdminLogin = async (req, res, next) => {
    try {
        const { role } = req.user;

        if (role === "admin") {
            next();
        }
        else {
            return res.status(401).json({ error: "unauthorized admin" })
        }



    } catch (error) {
        console.log(error)
        
    }

}
exports.isUserLogin = async (req, res, next) => {
    try {
        const { role } = req.user;
        if (role === "user") {
            next();
        }
        else {
            return res.status(401).json({ error: "unauthorized User" })
        }



    } catch (error) {
        console.log(error)
        
    }

}