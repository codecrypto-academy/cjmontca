import express from 'express'
import { Request, Response } from 'express'
import {ethers, JsonRpcApiProvider, JsonRpcProvider} from 'ethers';
import fs from 'fs';
import cors from 'cors';

//CARGA LAS VARIABLES DE ENTORNO
require('dotenv').config();//Carga las variables de entorno (fichero ".env")

const app = express();
app.use(express.json());//Le digo que sea capaz de interpretar json
app.use(cors());
const port = 3333;

app.get("/api/balanceEthers/:address", async (req:Request, res: Response) => {
  const { address } = req.params;
  const provider = new ethers.JsonRpcProvider(process.env.URL_NODO);
  const balance = await provider.getBalance(address);

  res.json(
    {address, balance: Number(balance) / 10 ** 18, fecha: new Date().toISOString()}
  )
})

app.get("/api/balance/:address", async (req:Request, res: Response) => {
    const {address} = req.params;
    const retorno = await fetch(process.env.URL_NODO as string, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'eth_getBalance',
          params:[
            address,
            'latest'
          ],
          id:1
        })
      })
      const data = await retorno.json();
      res.json({address,
         balance:Number(data.result / 10 ** 18),
         fecha: new Date().toISOString()
      });
});

app.get("/api/faucet/:address/:amount", async (req: Request, res: Response) => {
    const {address, amount }= req.params;
    const provider = new ethers.JsonRpcProvider(process.env.URL_NODO);//Creo un provider (tiene que estar levantado el nodo)
    const ruta = process.env.KEYSTORE_FILE as string;//"../nodo/datos/keystore/UTC--2024-12-13T15-25-00.461118472Z--832e22b5e5930ca372ef89c737ec8485eb11c007"; //Leo la key
    //const rutaJson = require(ruta);
    const rutaData = fs.readFileSync(ruta, "utf8");
    //console.log(rutaData);

    const wallet = await ethers.Wallet.fromEncryptedJson(rutaData,process.env.KEYSTORE_PWD as string);//Creo la wallet
    const walletConnected = wallet.connect(provider);//--> Conecto la Wallet

    const tx = await walletConnected.sendTransaction({//--> Transacción
      to: address,
      value: ethers.parseEther(amount)
    })
    const tx1 = await tx.wait();

    const balance = await provider.getBalance(address);
    console.log(balance.toString());
    res.json({tx1, address, amount, balance: Number(balance) /10 ** 18, fecha: new Date().toISOString() })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
