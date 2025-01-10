const oracledb = require('oracledb');

var pool = null;

try {
oracledb.initOracleClient({
    libDir : "/usr/local/oracle/instantclient_21_16"
})
} catch(error){
    console.log(error)
}

async function getPool(con) {
    return new Promise(async (resolve, reject) => {
        if (pool) resolve(pool)
        try{
            pool = await oracledb.createdPool(con)
        } catch (error) {
            reject(error);
        }
        
    } )
}

async function q(sql, parametros) {
    let connection
    try {
        await getPool({
            user: "c##datos",
            password: "datos",
            connectString: "localhost:1521/XE", poolAlias: "curso"
        })
        connection = await oracledb.getConnection("curso")
        const resultados = connection.execute(sql, parametros,{
            outFormat: oracledb.OUT_FORMAT_ARRAY
        })
    
        return resultados;

    } catch (error){
        return error;
    } finally {
        if (connection) await connection.close()
    }    
}

q("select * from customers", []).then(r =>  {
    console.log(r) 
}).catch(e => {
    console.log(e) 
})

