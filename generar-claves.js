const { createECDH } = require("crypto")
const args = require("yargs").argv //Argumentos
const fs = require("fs")

console.log(args.name)

if (!args.name) {
    console.log("falta el argumento --name")
    exit(0)
}

const parejaDeClaves = createECDH("secp521r1") //Generar en base a la criptografía elíptica
const clavePublica = parejaDeClaves.generateKeys("hex")
const clavePrivada = parejaDeClaves.getPrivateKey("hex")
fs.writeFileSync("./data/"+args.name+".key", clavePrivada)
fs.writeFileSync("./data/"+args.name+".pb", clavePublica)

