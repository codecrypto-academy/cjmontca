import { useContext} from "react"
import { Context } from "../main"
export function Cesta() {
    const [ estado, setEstado ] = useContext(Context)
    const total = estado.cesta.reduce((acc, item) => acc + item.total, 0) //Como hacer la acumulación de un contenido de un array.
    return <div>
        <table className="table">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {estado.cesta.map( i => (
                    <tr key={i.producto.ProductID}>
                        <td>{i.producto.ProductID}</td>
                        <td>{i.producto.ProductName}</td>
                        <td>{i.producto.UnitPrice}</td>
                        <td>{i.cantidad}</td>                        
                        <td>{i.total}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <h3>Total: {total}</h3>
    </div>
}