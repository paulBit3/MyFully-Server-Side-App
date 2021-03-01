/* our user routes definition. when the server receives at each of these,
the corresponding controller functions are invoked  */

import express from 'express'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'


const router = express.Router()


//the api endpoint to create a new user and list all the users
router.route('/api/users')
  .get(userCtrl.list)
  .post(userCtrl.create)



/* The api endpoint to read a single user data.The route to read a user's information 
only need authentication verification. update and delete routes check for both
authentication and authorization */

router.route('/api/users/:userId')
  .get(authCtrl.requireSignin, userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requireSignin,  authCtrl.hasAuthorization, userCtrl.remove)
  // .get(userCtrl.read)
  // .put(userCtrl.update)
  // .delete(userCtrl.remove)

//path containing the :userId parameter
router.param('userId', userCtrl.userByID)


export default router