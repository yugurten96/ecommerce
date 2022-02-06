const expressJwt = require("express-jwt");

function authJwt() {
    const secret = process.env.secret;
    return expressJwt({
        secret,
        algorithms: ['HS256']
    }).unless({
        path: [
            {url: /\/products(.*)/, methods: ['GET', 'OPTIONS']},
            {url: /\/categories(.*)/, methods: ['GET', 'OPTIONS']},
            "/users/login",
            "/users/register"
        ]
    })
}

module.exports = authJwt();