/* definition of the controller methods to be executed 
when a route request is received by the server */

import User from '../models/user.model'
//lodash library when updating an exixting user with change value
import extend from 'lodash/extend'
import errorHandler from './../helper/dbErrorHandler'



/* Our API endpoint user controller function. */

// ----------- Creating a new user
/* our function to create a new user. when the Express app gets a 
POST request at '/api/users', it calls the create function */
const create = async (req, res) => {
    const user = new User(req.body)
    try {
        /* save the user. using await to return a Promise*/
        await user.save()
        return res.status(200).json({
            message: "User successfully created!"
        })
        
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
        
    }
}

// ----------- Listing all users
//the list controller function to find all the users from our database
const list = async (req, res) => {
    try {
        let users = await User.find().select('name email updated created')
        //return users as JSON objects
        res.json(users)
    } catch (err) {
        return res.status(400).json({
            error: "Could not retrieve user"
        })
    }
}


// ----------- Loading a user by id to read, updte or delete
/* our userbyID controller function to fetch and load the user into the Express request
This function uses the value in userId to query the database by _id */
const userByID = async (req, res, next, id) => {
    try {
        let user = await User.findById(id)
        if (!user)
          return res.status(400).json({
              error: "User not found"
          })
          //if user found
        req.profile = user
        next()
    } catch (err) {
        return res.status(400).json({
            error: "Could not retrieve user"
        })
    }
}

// ----------- Reading a single data
/* On a GET request at /api/users/:userId, Express app will execute the userByID function 
to load user by the userId value followed by the read controller function */
const read = (req, res) => {
    // removing sensitive information
    req.profile.hashed_password = undefined 
    req.profile.salt = undefined
    return res.json(req.profile)
}


 // ----------- Updating a single user data
/*  On a PUT request at /api/users/:userId loads user with 
the :userId before executing update controller function */
const update = async (req, res) => {
    try {
        //retrieves user details
        let user = req.profile 
        user = extend(user, req.body) 
        // current date to reflect the last updated timestamp
        user.updated = Date.now()
        await user.save()
        user.hashed_password = undefined
        user.salt = undefined
        res.json(user)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}


// ----------- Deleting a single user data
/* this remove function retrieves the user from req.profile and use 
the remove() query to delete the user from the database. */
const remove = async (req, res) => {
    try {
        let user = req.profile
        let deletedUser = await user.remove()
        deletedUser.hashed_password = undefined
        deletedUser.salt = undefined
        res.json(deletedUser)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}



export default { 
    create, 
    userByID, 
    read, 
    list, 
    remove, 
    update 
}