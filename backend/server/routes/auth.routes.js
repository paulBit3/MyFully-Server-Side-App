/* implementing authentication with JWT 
'/auth/signin' : POST request to authenticate the user with their email and password
'/auth/signout': GET request to clear the cookie containing a JWT that was set on the response object after sign-in

*/

import express from 'express'
import authCtrl from '../controllers/auth.controller.js'
import config from '../../../config/config'


const expressJwt =  require('express-jwt');

const router = express.Router()

router.route('/auth/signin').post(authCtrl.signin)

  router.route('/auth/signout').get(authCtrl.signout)


  expressJwt({
    secret: config.jwtSecret,
    algorithms: ['sha1', 'RS256', 'HS256'],
  })

export default router
