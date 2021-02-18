const jwtAuthz = require('express-jwt-authz');

module.exports = cheackPermission = jwtAuthz(["management: members"], {
    customScopeKey: "permissions",
});