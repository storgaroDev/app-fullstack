const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    text: String,
    lastname: String,
    number: String,
    email: String,
    work: String,
    price: String,
    carModel: String,
    date: String,
    idworker: String, 
    checked: Boolean,
});

todoSchema.set('toJSON', {
    transform: (document, returnedObject) =>{
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;