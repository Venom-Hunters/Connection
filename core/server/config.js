module.exports = {
  port: process.env.PORT || 8081,
  mongoUri: 'mongodb://localhost/connection',
  secret: 'sretnuh-monev',
  saveUninitialized: true,
  resave: true
};