module.exports = {
  port: process.env.PORT || 8888,
  mongoUri: "mongodb://localhost/connection",
  secret: "sretnuh-monev",
  saveUninitialized: true,
  resave: true
};
