import config from '../../config/config';
import app from './express';
import mongoose from 'mongoose';

/* configuring the server */

// DB connection URL
mongoose.Promise = global.Promise;
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, 
                                       useCreateIndex: true, 
                                       useUnifiedTopology: true })
mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${config.MONGODB_URI}`)
})



//server implementation
app.listen(config.PORT, (err) => {
    if (err) {
        console.log(err);
    }
    console.info('Server started on port %$.', config.PORT);
})