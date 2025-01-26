import { useParams } from "react-router-dom"

export function Tx(){
    const params = useParams()
    return <div>
        Tx {params.tx}
    </div>
}