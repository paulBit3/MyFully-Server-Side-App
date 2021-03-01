/* implementing user model. we will use mongoose  to define the Schema */
// import { model, Schema, VirtualType } from "mongoose"
import mongoose from 'mongoose';
import crypto from 'crypto';


//function schema object
const Schema = mongoose.Schema;

/* generate a new mongoose schema
our user schema definition object */
const userSchema = new Schema({
    name: { 
        type: String, 
        trim: true, 
        required: 'Name required'
    },
    email: {
        type: String,
        trim: true,
        unique: 'This email already exists',
        match: [/.+\@.+\..+/, 'Email address not valid'],
        required: 'Email required'
    },
    hashed_password: {
        type: String,
        required: "Password required"
    },
    salt: String,
    updated: {
        type: Date,
        default: Date.now()
    },
    created: {
        type: Date,
        default: Date.now()
    }

})

// handling password string as a virtual field
/* when a password is received on user creation or update,
it is encrypted into a new hash value. */
userSchema
  .virtual('password')
  .set(function(password) {
      this._password = password
      this.salt = this.makeSalt()
      this.hashed_password = this.encryptPassword(password)
  })
  .get(function() {
      return this._password
  })


//password field validation
userSchema.path('hashed_password').validate(function(v) {
    if (this._password && this._password.length < 8) {
        this.invalidate('password', 'Password must be at least 8 characters.')
    }
    if (this.isNew && !this._password) {
        this.invalidate('password', 'The password required')
    }
}, null)




/* encryption logic and salt generation logic. 
we will use this userSchema 
method to encrypt the user-provided pw string */
userSchema.methods = {
    //verify sign-in attempts by matching the user-provided pw
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password
    },
    //this method is used to generate an encrypted hash
    encryptPassword: function(password) {
        if (!password) return ''
        try {
            return crypto
              .createHmac('sha1', this.salt)
              .update(password)
              .digest('hex')
        } catch (err) {
            return ''
        }
    },
    //this method generates a unique random salt value
    makeSalt: function() {
        return Math.round((new Date().valueOf() * Math.random())) + ''
    }
}


export default mongoose.model('User', userSchema);