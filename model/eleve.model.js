const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    nom: String,
    prenom: String,
    age: Number,
    classe: Number,
    _id: Number
},{
    timestamps: true
});

module.exports = mongoose.model('Eleve', NoteSchema);