import datos from '../datos.json'
export function  CardPrecio({data}){
    return <div className='card w-100 m-1'>
        <div className="card-header">
            <h4 className='text-center'>{data.titulo}</h4>
        </div>
        <div className="card-body">
            <ul className='list-unstyled '>
                {
                    data.features.map((i, index) =>
                        <li key={index} className='mt-1'>{i}</li>
                    )
                }
            </ul>
            <button className='btn btn-outline-primary btn-lg w-100'>{data.textBoton}</button>
        </div>
    </div>
}
export function Precios() {
    return <div className="my-8 d-flex justify-content-between">
        
        {
            datos.precios.map((i,index) =>
                <CardPrecio key={index} data={i}></CardPrecio>
            )
        }        
    </div>
}