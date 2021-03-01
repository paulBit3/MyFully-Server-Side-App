// our hellopage component

import React from 'react';
import { hot } from 'react-hot-loader';

//our fucntional HelloPage component
const HelloPage = () => {
    return (
        <div>
            <h1>Hello Everyone!</h1>
        </div>
    )
}

export default hot(module) (HelloPage)