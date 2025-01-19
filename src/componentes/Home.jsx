import { Carrusel } from "./Carrusel";
import { Header } from "./Header";
import { Precios } from "./Precios";
import { Footer } from "./Footer";

export function Home() { //Hay que exportarla para que se pueda usar dentro de otro fichero.
    return <div className="container">
        <Header></Header>
        <Carrusel></Carrusel>
        <Precios></Precios>
        <Footer></Footer>
    </div>
    
}