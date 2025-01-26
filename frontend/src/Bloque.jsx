import { useParams } from "react-router-dom"
export function Bloque(){
    const params = useParams()
    return <div>
        bloque {params.bloque}
    </div>
}