/* this is for server-side configuration-related 
variables that will be used in our application */

const secret = '3#=vla6j$52gwrq1r$$bk1e0*s$*24kkq_=8n54+dt5119+i8z'


const config = {
    env: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || secret, //secret code to be used to sign JWT
    MONGODB_URI: process.env.MONGODB_URI ||
     process.env.MONGO_HOST || 
     'mongodb://' + (process.env.IP || 'localhost') + ':' +
     (process.env.MONGO_PORT || '27017') +
     '/mern-projects'
}

export default config