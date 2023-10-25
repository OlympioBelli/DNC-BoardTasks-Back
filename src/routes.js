function routes(app) {
    app.use('/users', require('../src/routes/users.js'))
    return;
}

module.exports = routes