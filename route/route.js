module.exports = (app) => {
    const notes = require('../controller/controller');

    app.post('/eleve', notes.post);

    app.get('/eleve', notes.get);

    app.get('/eleve/:_id', notes.findOne);

    app.post('/prof', notes.postProf);

    app.get('/prof', notes.getProf);

    app.get('/prof/:_id', notes.findOneProf);
}