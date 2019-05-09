const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    nom: String,
    prenom: String,
    matiere: {
        matiere1: String,
        matiere2: String,
        matiere3: String
    },
    classe:{
        classe1: Number,
        classe2: Number, 
        classe3: Number
    },
    _id: Number
},{
    timestamps: true
});

module.exports = mongoose.model('Prof', NoteSchema);