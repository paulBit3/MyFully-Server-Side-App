/* implementing a helper method. this method will parse and return the 
error message associated with a specific validation error. */

'use strict'


/* method to parse the unique constraint related error object
getting a unique error field name */
const getUniqueErrorMessage = (err) => {
    let output
    try {
        let fieldName = err.message.substring(err.message.lastIndexOf('.$') + 2, err.message.lastIndexOf('_1'))
        //getting the 1st character of the field name
        output = fieldName.chartAt(0).toUpperCase() + fieldName.slice(1) + ' already exists'
    } catch (ex) {
        output = 'Unique field already exists'
    }

    return output
}




//get the error message from error object
const getErrorMessage = (err) => {
    let message = ''
    if (err.code) {
        //pick one case and displaying error message
        switch (err.code) {
            case 11000:
            case 11001:
                message = getUniqueErrorMessage(err)
                break
            default:
                message = 'Something went wrong'
        }
    } else {
        for (let errName in err.errors) {
            if (err.errors[errName].message) message = err.errors[errName].message
        }
    }

    return message
}

export default {getErrorMessage}