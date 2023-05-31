const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
        fname : {
            type : String,
            required: 'First name is required',
        },
        lname : {
            type : String,
            required: 'First name is required',
            trim: true,
        },
        title : {
            type : String,
            required: 'Title is required',
            enum : ["Mr", "Mrs", "Miss"]
        },
        email : {
            type : String,
            required: 'Email address is required',
            unique : true,
            // match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            validate: {
                validator: function (email) {
                    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                }, message: 'Please fill a valid email address', isAsync: false
            }
        },
        password : {
            type : String,
            trim: true,
            required: 'Password is required'
        },

},{timestamps : true})

const Author = mongoose.model("Author",authorSchema);

module.exports = Author;