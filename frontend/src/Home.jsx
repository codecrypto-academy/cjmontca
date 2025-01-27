import { Outlet, useNavigate } from "react-router-dom";
import {useForm} from "react-hook-form"
export function Home(){
    const navigate = useNavigate();
    const {register, handleSubmit} = useForm()
    const submitForm = (data) => {
        //If LONGITUD == 66 --> TX
        //If LONGITUD == 42 --> ADDRESS
        //IF ES UN NUMERO  --> BLOQUE

        if(data.data.length == 66){
            navigate(`tx/${data.data}`)
        }

        if(data.data.length == 42){
            navigate(`balance/${data.data}`)
        }


        if(/^\d+\.?\d*$/.test(data.data)){//Compruebo si el dato es un número
            navigate(`bloque/${data.data}`)
        }
    }

    return <div className="container">
        <h3 className="text-cnter">Explorador de la cadena de Ethereum</h3>
        <form className="-d-flex justify-content-center gap-1" onSubmit={handleSubmit(submitForm)}>
            <input {...register("data")} size={70}></input>
            <button className="btn btn-primary">GO</button>
        </form>
        <div className="border my-3 p-2">
        <Outlet />
        </div>
    </div>
}