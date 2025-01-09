//cjmontca
const mysql = require("mysql8");
const { rootCertificates } = require("tls");

const pool = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "my-secret-pw",
    database: "Northwind"
})

function q (sql) {
    return new Promise((resolve, reject) => {
        pool.query(sql, function(error, results, fields){
            if(error) reject(error);
            return resolve(results);
        });
    })
}

q("select City from Customer limit 10").then(d=> {
    console.log(d);
}).catch(err => {
    console.log(err);
})