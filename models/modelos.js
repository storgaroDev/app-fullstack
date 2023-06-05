const mongoose = require('mongoose');

const modelos = new mongoose.Schema({
    modelos: String,
});

modelos.set('toJSON', {
    transform: (document, returnedObject) =>{
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const Modelos = mongoose.model('Modelos', modelos);

module.exports = Modelos;