const mssql = require("mssql")
const config = {
    user: "sa",
    password: "My-secret-pw#",
    database: "Northwind",
    server: "localhost",
    pool:{
        min: 0,
        max: 10        
        //No soporta el idleTimeoutMillis
    },
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
}

async function q(sql) {
    try {
        await mssql.connect(config)
        const resultados = mssql.query(sql);
        return resultados;
    } catch(error){
        return {error}
    }
}

q("select * from customers").then(res =>{
    console.log(res);    
}).catch(e =>{
    console.log(e);
})