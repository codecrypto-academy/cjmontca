const {Pool} = require ('pg')

const pool = new Pool({
    user: "postgres",
    password: "my-secret-pw",
    database: "postgres",
    host: "localhost",
    port: 5432
});

function q(sql, parametros) {
    return new Promise((resolve, reject) => {
        pool.connect((err, client, done) => {
            if (err) reject(err)
            client.query(sql, parametros, (err,result) => {
                done()
                if(err) {
                    reject(err)
                } else {
                    resolve(result.rows)
                }
            })
        })
    })
}

q("select * from customers limit 2", []).then(rows => {
    console.log(rows)
}).catch(err => {
    console.log(e)
}).finally(() =>{
    console.log("esto saldrá siempre")
})



