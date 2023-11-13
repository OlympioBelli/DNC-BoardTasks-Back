function routes(app) {
    app.use('/usuario', require('../src/routes/usuario.js')),
    app.use('/tarefa', require('../src/routes/tarefa.js'))
    return;
}

module.exports = routes