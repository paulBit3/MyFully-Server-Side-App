/* importing express */
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
// import config from '../../config/config'

//importing our template
import Template from '../../template';
//import { Template } from 'webpack';

//importing routes
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'
// import { UnauthorizedError } from 'express-jwt/lib';



const expressJwt =  require('express-jwt');



const app = express();

/* configuring express */



/* app.use(
    expressJwt({
    secret: config.jwtSecret,
    algorithms: ['sha1', 'RS256', 'HS256'],
  })) */

//parse body params
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());

//secure apps
app.use(helmet());

//enable Crossing Origin Resource Sharing CORS
app.use(cors())


//mounting our routes to be accessed from the client-side
app.use('/', userRoutes)
app.use('/', authRoutes)


//sending the template in the reponse to a GET requests for the'/' route
app.get('/', (req, res) => {
    res.status(200).send(Template())
})


// Catch unauthorized errors
/* express-jwt throws an error named UnauthorizedError when a token cannot be validated for some reason */
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({"error" : err.name + ":" + err.message})
    } else if (err) {
        res.status(400).json({"error" : err.name + ":" + err.message})
        console.log(err)
    }
})


export default app