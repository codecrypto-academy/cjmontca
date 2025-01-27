const express = require("express")
const Web3 = require("web3")
const cors = require("cors")
const app = express()

app.use(cors())

const URL_INFURA = "https://mainnet.infura.io/v3/44966c49fd604c7a83ad0c99ccf992c2"

const web3 = new Web3(URL_INFURA)

app.get("/", async(req, res) => {  
    try{  
    const bloque = await web3.eth.getBlockNumber() //Este comando tal cual nos trae el último bloque
    res.send({bloque})
    } catch(error){
        res.status(500).send({mensaje: error.message })
    }
})

app.get("/bloque/:bloque", async(req, res) => {
    try{
    const bloque = await web3.eth.getBlock(req.params.bloque) //Este comando tal cual nos trae el último bloque    
    res.send(bloque)
    } catch(error){
        res.status(500).send({mensaje: error.message })
    }
})

app.get("/tx/:tx", async(req, res) => {
    try {
    const tx = await web3.eth.getTransaction(req.params.tx) //Este comando tal cual nos trae el último bloque
    res.send(tx)
    } catch(error){
        res.status(500).send({mensaje: error.message })
    }
})

app.get("/balance/:address", async(req, res) => {
    try {
    const balance = await web3.eth.getBalance(req.params.address) //Este comando tal cual nos trae el último bloque
    res.send({balance, ethers: web3.utils.fromWei(balance,'ether')})
    } catch(error){
        res.status(500).send({mensaje: error.message })
    }
})

app.listen(3333)