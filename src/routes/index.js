// const passport = require('passport');
// const authRoute = require('./auth.route');
// const transactionRoute = require('./transaction.route');
const userRoute = require('./user.route');
const authRoute = require('./auth.route');

function route(app) {
//    app.use('/auth', authRoute);
//    app.use('/api/transactions', passport.authenticate('jwt', { session: false }), transactionRoute);
//    app.use('/api/accounts', passport.authenticate('jwt', { session: false }), accountRoute);
    app.use('/auth', authRoute)
    app.use('/', userRoute)
    app.use((req, res, next) => {
        res.json({error: {code: 404, message: "Endpoint not found."}})
    })
}

module.exports = route;