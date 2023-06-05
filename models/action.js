const mongoose = require('mongoose');

const actions = new mongoose.Schema({
    work: String,
});

actions.set('toJSON', {
    transform: (document, returnedObject) =>{
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const Actions = mongoose.model('Actions', actions);

module.exports = Actions;