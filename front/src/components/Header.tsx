import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useContext, useEffect } from "react";
import { UserContext } from "@/App";//La @ hace referencia a la ruta src

export function Header() {
  const { state, setState } = useContext(UserContext)
  useEffect(() => {
    const ethereum = (window as any).ethereum;
    if (ethereum == null){
      alert("Instalar Metamask");
      return;
    }

    ethereum.request({method: "eth_requestAccounts" }).then((acc: string[]) => { //Este evento para poder mostrar la cuenta seleccionada en el Metamask.
      setState({ acc: acc[0] });
    });    
    ethereum.on("accountsChanged", function(acc: string[]){//Este evento es para saber cuando se cambia de cuenta y que actualize la cuenta en el front
      setState({ acc: acc[0] });
    })
  }, [setState])
    return <div className="flex gap-2 justify-center pt-4">
      <Link to='home'>
        <Button>Home</Button>
      </Link>
      <Link to='faucet'>
        <Button>Faucet</Button>
      </Link>
      <Link to='balance'>
        <Button>Balance</Button>
      </Link>
      <Link to='transfer'>
        <Button>Transfer</Button>
      </Link>      
      <div className="flex gap2 justify-center pt-4">
          {state.acc ? <p className="text-lg font-bold text-center border-2">Cuenta seleccionada: {state.acc}</p> : <div>Cuenta no seleccionada</div> }          
      </div>      
    </div>
  }