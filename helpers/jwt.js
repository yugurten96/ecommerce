const expressJwt = require("express-jwt");

function authJwt() {
    const secret = process.env.secret;
    return expressJwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked,

    }).unless({
        path: [
            {url: /\/products(.*)/, methods: ['GET', 'OPTIONS']},
            {url: /\/categories(.*)/, methods: ['GET', 'OPTIONS']},
            "/users/login",
            "/users/register"
        ]
    })
}

//payload contains the data which are inside the token
async function isRevoked(reeq, payload, done) {
    if(!payload.isAdmin) {
        done(null, true)
    }
    done()
}
module.exports = authJwt();