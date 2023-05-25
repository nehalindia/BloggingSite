const mongoose = require('mongoose');
const validator = require('validator')
const authorSchema = new mongoose.Schema({
    
        fname : {
            type : String,
            required : true
        },
        lname : {
            type : String,
            required : true
        },
        title : {
            type : String,
            required : true,
            enum : ["Mr", "Mrs", "Miss"]
        },
        email : {
            type : String,
            required : true,
            unique : true,
            // validate: [ email, 'invalid email' ],

            validate: {
                validator: (value) => validator.isEmail(value),
                message: (props) => `${props.value} is not a valid email address.`
              }
        },
        password : {
            type : String,
            required : true,
           
        },

},{timestamps : true})

const Author = mongoose.model("Author",authorSchema);

module.exports = Author;