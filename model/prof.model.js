const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    nom: String,
    prenom: String,
    matiere: String,
    classe: Number,
    _id: Number
},{
    timestamps: true
});

module.exports = mongoose.model('Prof', NoteSchema);