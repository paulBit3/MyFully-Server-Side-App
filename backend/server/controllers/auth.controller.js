/* implementing authentication controller this will provide JWT 
and express-jwt functionality to protect user API endpoints */
import User from '../models/user.model'
import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'
import config from '../../../config/config'


/* const jwt = require('jsonwebtoken');
const expressJwt =  require('express-jwt'); */


/*  Our API endpoint user controller 
function  auth controller function. 
We implement user auth using JSON Web Tokens*/

//API endpoint to sign in a user
const signin = async (req, res) => {
    try {
        //POST request receive the email and password
        let user = await User.findOne({ 
            "email": req.body.email 
        })
        if (!user)
          return res.status(401).json({ 
              error: "user not found" 
          })
        
          //verifying the password received in req.body from the client
        if (!user.authenticate(req.body.password)) {
            return res.status(401).send({ 
                error: "email and password don't match." 
            })
        }
        
        // generate a signed jwt using a secret key and the user's _id value
        const token = jwt.sign({ 
            _id: user._id
        }, config.jwtSecret)
        
        // set the token to a cookie in the response object
        res.cookie("t", token, {
            expire: new Date() + 9999
        })

        return res.json({
            token, 
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        })

    } catch (err) {
        
        return res.status(401).json({
            error: "Could not sign in"
        })

    }
}

//API endpoint to signout a user
/* when Express app gets a GET request '/auth/signout',
 it execute the signout controller function */
const signout = (req, res) => {
    res.clearCookie("t")
    return res.status(200).json({
        message: "you are logged out."
    })
}



/* -------- Protecting user routes. we will use express-jwt. 
To protect the read, update, and delete routes,  the server will need to check
that requestion client is an authenticated and authorized user */

// -- requiring sign-in method. This method will check for authentication
const requireSignin = expressJwt({
    secret: config.jwtSecret,
    userProperty: 'auth'
})


/*  authorizing signed in users method. 
This method will check authenticated user the controller function is allowed to proceed. */
const hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id == req.auth._id
    if (!(authorized)) {
        return res.status(403).json({
            error: "User is not authorized"
        })
    }
    next()
}



export default {
    signin,
    signout,
    requireSignin,
    hasAuthorization
}