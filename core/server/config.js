module.exports = {
  port: process.env.PORT || 80,
  mongoUri: "mongodb://localhost/connection",
  secret: "sretnuh-monev",
  saveUninitialized: true,
  resave: true
};
