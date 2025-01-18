const mysql = require("mysql8")

 var pool = mysql.createPool({    
    host: "localhost",
    user: "root",
    password:"my-secret-pw",
    database: "northwind"    
 })

 function q(sql, parameters){
    return new Promise((resolve,reject) => {
        pool.query(sql, parameters, function(error, results, fields){
            if (error){
                reject(error);
                return
            }

            return resolve([results, fields])
        })
    })
 }

 module.exports = {
    q
 }