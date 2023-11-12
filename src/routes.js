function routes(app) {
    app.use('/usuario', require('../src/routes/usuario.js'))
    return;
}

module.exports = routes