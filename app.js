const express = require('express');
const app = express();
const port = 8080;
const registry = require('./server/register_routes.js');
const session = require('express-session');
const cors = require('cors');
require('./server/models/db');
app.use(cors({
  origin: 'http://localhost:4567',
  methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
  credentials: true
}));
app.use(express.json());
app.use(session({
  secret: 'project-start', saveUninitialized: true, cookie: { 
    httpOnly: false
  }, resave: false,
}));
registry.register_routes(app);
app.listen(port, () => {
  console.log(`Main app listening on port ${port}`)
})