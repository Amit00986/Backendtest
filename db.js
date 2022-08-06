const mysql = require('mysql');

const connection = mysql.createConnection({
    host : "localhost",
    user: "root",
    database :"backendtest",
    password : ""
});
connection.connect();

module.exports = connection;
