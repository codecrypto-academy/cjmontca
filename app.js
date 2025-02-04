// Importar Web3
const Web3 = require("Web3");

// Crear un proveedor HTTP
const provider = new Web3.providers.HttpProvider("http://localhost:8552");

// Crear una instancia de Web3 con el proveedor
const web3 = new Web3(provider);

async function getUltimoBloque() {
    try {
        const bloque = await web3.eth.getBlockNumber();        
        console.log("El último bloque es:", bloque);
        return bloque
    } catch (error) {
        console.error("Error al obtener el último bloque:", error);
    }
}

var tx = {
    from: "0xf4179173f90c52ccdbc971a894b7f432eaebb017", 
    to: "0x25E93088a2ab13E6C4732122C996e56Ef85fcF79", 
    value: web3.utils.toWei("100", "ether")}

async function sendTransaction(){
        const txR = web3.personal.sendTransaction(tx,"123456")
        console.log(txR)
}

async function getTransaction(hash){
    const txR = web3.personal.getTransaction(hash)
    console.log(txR)
}

async function getBloque(num){
    const bloque = await web3.eth.getBlock(num)
    console.log(bloque)
}

async function getBalance(address) {
    const balance = await web3.eth.getBalance(address)
    console.log(balance / 1e18)
}

getTransaction("0xf5d411816b8fa332c4c4b75ba37a76255c7c69a0a7edf091fd40d92835bb2d69");

sendTransaction();

getBloque();
// Llamar a la función getUltimoBloque
getUltimoBloque();


