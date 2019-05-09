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
    const tab = [];
    
    Eleve.findById(req.params._id)
    .then(eleve => {
               
        // if(!eleve) {
        //     return res.status(404).send({
        //         message: "Note not found with id " + req.body._id
        //     });            
        // }
        
        
        //{classe: eleve.classe1} || {classe: eleve.classe2} || {classe: eleve.classe3}
        Prof.find()
        .then(prof => { 
            tab.push(eleve)       
            //console.log(prof);
            
         for (var i = 0;i < prof.length; i++){
            if (prof[i].classe.classe1 == eleve.classe || prof[i].classe.classe2== eleve.classe || prof[i].classe.classe3== eleve.classe ){
                tab.push(prof[i])
                console.log(prof[i]);
                
            }
               
         };       
         res.send(tab);
        console.log(eleve);

    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params._id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving eleve with id " + req.params._id
        });
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
        matiere: {matiere1: req.body.matiere1,matiere2: req.body.matiere2,matiere3: req.body.matiere3},
        classe: {classe1: req.body.classe1, classe2: req.body.classe2, classe3: req.body.classe3},
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