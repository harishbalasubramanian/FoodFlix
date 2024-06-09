const bcrypt = require('bcrypt');

var route_helper = function()
{
    return {
        encryptPassword: (password, callback) => {
            return bcrypt.hash(password, 10, callback);
        }
    }
}

var encryptPassword = function(password, callback)
{
    return route_helper().encryptPassword(password, callback)
}

module.exports = {
    encryptPassword
}