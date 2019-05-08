const Eleve = require('../model/eleve.model.js');
const Prof = require('../model/prof.model.js');

exports.post = (req, res) => {
    Eleve.find()
    .then(eleve => {
        var increm;
    if(eleve.length == 0){
        increm = 0
    }else {
        increm = parseInt(eleve[eleve.length - 1]._id) + 1
    }

    const el = new Eleve({
        nom: req.body.nom || "Untitled Note", 
        prenom: req.body.prenom,
        age: req.body.age,
        classe: req.body.classe,
        _id: increm
    });
    el.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
 })

   

};


exports.get = (req, res) => {
    Eleve.find()
    //Prof.find()
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

exports.findOne = (req, res) => {
    const tab= [];

    Eleve.findById(req.body._id)
    .then(eleve => {
        if(!eleve) {
            return res.status(404).send({
                message: "Note not found with id " + req.body._id
            });            
        }
        console.log(eleve);
        
        Prof.find({classe:eleve.classe})
        .then(prof => {
            tab.push(eleve)
            tab.push(prof)
            res.send(tab);
        })

    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.body._id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving eleve with id " + req.body._id
        });
    });
};

//prof

exports.postProf = (req, res) => {

    Prof.find()
    .then(profs => {
        var increm;
    if(profs.length == 0){
        increm = 0
    }else {
        increm = parseInt(profs[profs.length - 1]._id) + 1
    }

    const prof = new Prof({
        nom: req.body.nom || "Untitled Note", 
        prenom: req.body.prenom,
        matiere: req.body.matiere,
        classe: req.body.classe,
        _id: increm
    });

    prof.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
  })
};


exports.getProf = (req, res) => {
    Prof.find()
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

exports.findOneProf = (req, res) => {
    const tab = [];
    Prof.findById(req.body._id)
    .then(prof => {
        if(!prof) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });            
        }
        Prof.find({classe:prof.classe})
        .then(eleve => {
            tab.push(eleve)
            tab.push(prof)
            res.send(tab);
        })
        res.send(prof);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving prof with id " + req.params.noteId
        });
    });
};