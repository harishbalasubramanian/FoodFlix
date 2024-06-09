const routes = require('./routes.js');

module.exports = {
    register_routes
}

function register_routes(app) {
    app.post('/login', routes.login);
    app.post('/register', routes.register); 
    app.post('/logout', routes.logout); 
    
  }